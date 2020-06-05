"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../maybe/Maybe");
var AsyncScheduler_1 = require("../scheduler/AsyncScheduler");
var IntervalScheduler_1 = require("../scheduler/IntervalScheduler");
var SignalingClientEventType_1 = require("../signalingclient/SignalingClientEventType");
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
/**
 * [[DefaultPingPong]] implements the PingPong and SignalingClientObserver interface.
 */
var DefaultPingPong = /** @class */ (function () {
    function DefaultPingPong(signalingClient, intervalMs, logger) {
        this.signalingClient = signalingClient;
        this.intervalMs = intervalMs;
        this.logger = logger;
        this.observerQueue = new Set();
        this.consecutivePongsUnaccountedFor = 0;
        this.intervalScheduler = new IntervalScheduler_1.default(this.intervalMs);
        this.pingId = 0;
    }
    DefaultPingPong.prototype.addObserver = function (observer) {
        this.logger.info('adding a ping-pong observer');
        this.observerQueue.add(observer);
    };
    DefaultPingPong.prototype.removeObserver = function (observer) {
        this.logger.info('removing a ping-pong observer');
        this.observerQueue.delete(observer);
    };
    DefaultPingPong.prototype.forEachObserver = function (observerFunc) {
        var e_1, _a;
        var _this = this;
        var _loop_1 = function (observer) {
            new AsyncScheduler_1.default().start(function () {
                if (_this.observerQueue.has(observer)) {
                    observerFunc(observer);
                }
            });
        };
        try {
            for (var _b = __values(this.observerQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                _loop_1(observer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    DefaultPingPong.prototype.start = function () {
        this.stop();
        this.signalingClient.registerObserver(this);
        if (this.signalingClient.ready()) {
            this.startPingInterval();
        }
    };
    DefaultPingPong.prototype.stop = function () {
        this.stopPingInterval();
        this.signalingClient.removeObserver(this);
    };
    DefaultPingPong.prototype.startPingInterval = function () {
        var _this = this;
        this.intervalScheduler.start(function () {
            _this.ping();
        });
        this.ping();
    };
    DefaultPingPong.prototype.stopPingInterval = function () {
        this.intervalScheduler.stop();
        this.pingId = 0;
        this.consecutivePongsUnaccountedFor = 0;
    };
    DefaultPingPong.prototype.ping = function () {
        var _this = this;
        if (this.consecutivePongsUnaccountedFor > 0) {
            this.logger.warn("missed pong " + this.consecutivePongsUnaccountedFor + " time(s)");
            this.forEachObserver(function (observer) {
                Maybe_1.default.of(observer.didMissPongs).map(function (f) {
                    return f.bind(observer)(_this.consecutivePongsUnaccountedFor);
                });
            });
        }
        this.consecutivePongsUnaccountedFor += 1;
        this.pingId = (this.pingId + 1) & 0xffffffff;
        var ping = SignalingProtocol_js_1.SdkPingPongFrame.create();
        ping.pingId = this.pingId;
        ping.type = SignalingProtocol_js_1.SdkPingPongType.PING;
        this.pingTimestampLocalMs = this.signalingClient.pingPong(ping);
        this.logger.debug(function () {
            return "sent ping " + _this.pingId;
        });
    };
    DefaultPingPong.prototype.pong = function (pingId) {
        var pong = SignalingProtocol_js_1.SdkPingPongFrame.create();
        pong.pingId = pingId;
        pong.type = SignalingProtocol_js_1.SdkPingPongType.PONG;
        this.signalingClient.pingPong(pong);
    };
    DefaultPingPong.prototype.handleSignalingClientEvent = function (event) {
        switch (event.type) {
            case SignalingClientEventType_1.default.WebSocketOpen:
                this.startPingInterval();
                break;
            case SignalingClientEventType_1.default.WebSocketFailed:
            case SignalingClientEventType_1.default.WebSocketError:
            case SignalingClientEventType_1.default.WebSocketClosing:
            case SignalingClientEventType_1.default.WebSocketClosed:
                this.logger.warn("stopped pinging (" + SignalingClientEventType_1.default[event.type] + ")");
                this.stopPingInterval();
                break;
            case SignalingClientEventType_1.default.ReceivedSignalFrame:
                if (event.message.type !== SignalingProtocol_js_1.SdkSignalFrame.Type.PING_PONG) {
                    break;
                }
                if (event.message.pingPong.type === SignalingProtocol_js_1.SdkPingPongType.PONG) {
                    var pingId_1 = event.message.pingPong.pingId;
                    if (pingId_1 !== this.pingId) {
                        this.logger.warn("unexpected ping id " + pingId_1 + " (expected " + this.pingId + ")");
                        break;
                    }
                    this.consecutivePongsUnaccountedFor = 0;
                    var pongTimestampRemoteMs_1;
                    if (typeof event.message.timestampMs === 'number') {
                        pongTimestampRemoteMs_1 = event.message.timestampMs;
                    }
                    else {
                        break;
                    }
                    this.logger.debug(function () {
                        return "received pong " + pingId_1 + " with timestamp " + pongTimestampRemoteMs_1;
                    });
                    var pongTimestampLocalMs = event.timestampMs;
                    var pingPongLocalIntervalMs_1 = pongTimestampLocalMs - this.pingTimestampLocalMs;
                    var estimatedPingTimestampRemoteMs = Math.round(pongTimestampRemoteMs_1 - pingPongLocalIntervalMs_1 / 2);
                    var estimatedClockSkewMs_1 = this.pingTimestampLocalMs - estimatedPingTimestampRemoteMs;
                    this.logger.info("local clock skew estimate=" + estimatedClockSkewMs_1 + "ms from ping-pong time=" + pingPongLocalIntervalMs_1 + "ms");
                    this.forEachObserver(function (observer) {
                        Maybe_1.default.of(observer.didReceivePong).map(function (f) {
                            return f.bind(observer)(pingId_1, estimatedClockSkewMs_1, pingPongLocalIntervalMs_1);
                        });
                    });
                }
                else {
                    this.pong(event.message.pingPong.pingId);
                }
                break;
        }
    };
    return DefaultPingPong;
}());
exports.default = DefaultPingPong;
//# sourceMappingURL=DefaultPingPong.js.map