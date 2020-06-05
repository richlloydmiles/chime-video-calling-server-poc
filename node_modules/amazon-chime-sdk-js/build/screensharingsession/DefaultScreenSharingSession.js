"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultBrowserBehavior_1 = require("../browserbehavior/DefaultBrowserBehavior");
var Maybe_1 = require("../maybe/Maybe");
var TimeoutScheduler_1 = require("../scheduler/TimeoutScheduler");
var ScreenShareStreamingEvent_1 = require("../screensharestreaming/ScreenShareStreamingEvent");
var ScreenSharingMessageFlag_1 = require("../screensharingmessage/ScreenSharingMessageFlag");
var ScreenSharingMessageType_1 = require("../screensharingmessage/ScreenSharingMessageType");
var DefaultScreenSharingSession = /** @class */ (function () {
    function DefaultScreenSharingSession(webSocket, constraintsProvider, timeSliceMs, messageSerialization, mediaStreamBroker, screenShareStreamFactory, mediaRecordingFactory, logger, browserBehavior) {
        var _this = this;
        if (browserBehavior === void 0) { browserBehavior = new DefaultBrowserBehavior_1.default(); }
        this.webSocket = webSocket;
        this.constraintsProvider = constraintsProvider;
        this.timeSliceMs = timeSliceMs;
        this.messageSerialization = messageSerialization;
        this.mediaStreamBroker = mediaStreamBroker;
        this.screenShareStreamFactory = screenShareStreamFactory;
        this.mediaRecordingFactory = mediaRecordingFactory;
        this.logger = logger;
        this.browserBehavior = browserBehavior;
        this.observerQueue = new Set();
        this.stream = null;
        this.webSocket.addEventListener('message', function (event) {
            _this.didReceiveMessageEvent(event);
            _this.logger.debug(function () { return 'dispatched message event'; });
        });
        this.webSocket.addEventListener('close', function (event) {
            _this.logger.info('screen sharing connection closed');
            _this.stop().catch(function () { });
            _this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didClose).map(function (f) { return f.bind(observer)(event); });
            });
        });
        this.webSocket.addEventListener('reconnect', function (event) {
            _this.logger.info('screen sharing connection reconnecting');
            _this.stop().catch(function () { });
            _this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.willReconnect).map(function (f) { return f.bind(observer)(event); });
            });
        });
        this.webSocket.addEventListener('reconnect_error', function (event) {
            _this.logger.info('reconnect attempt failed');
            _this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didFailReconnectAttempt).map(function (f) { return f.bind(observer)(event); });
            });
        });
        this.webSocket.addEventListener('open', function (event) {
            _this.logger.info('screen sharing connection opened');
            _this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didOpen).map(function (f) { return f.bind(observer)(event); });
            });
        });
    }
    DefaultScreenSharingSession.prototype.open = function (timeoutMs) {
        this.logger.info("opening screen sharing connection to " + this.webSocket.url);
        return this.webSocket.open(timeoutMs);
    };
    DefaultScreenSharingSession.prototype.close = function (timeoutMs) {
        var _this = this;
        return this.webSocket.close(timeoutMs).then(function (event) {
            _this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didClose).map(function (f) { return f.bind(observer)(event); });
            });
            return event;
        });
    };
    DefaultScreenSharingSession.prototype.start = function (sourceId, timeoutMs) {
        return __awaiter(this, void 0, void 0, function () {
            var input, stream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* istanbul ignore next */
                        if (timeoutMs === null || timeoutMs === undefined) {
                            timeoutMs = 3000;
                        }
                        if (this.stream !== null) {
                            throw new Error('started');
                        }
                        if (this.browserBehavior.screenShareUnsupported()) {
                            throw new Error('Safari browser does not support screen sharing');
                        }
                        return [4 /*yield*/, this.mediaStreamBroker.acquireDisplayInputStream(this.constraintsProvider(sourceId))];
                    case 1:
                        input = _a.sent();
                        if (!(timeoutMs > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ping(timeoutMs)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        stream = this.screenShareStreamFactory.create(this.mediaRecordingFactory.create(input));
                        stream.addEventListener(ScreenShareStreamingEvent_1.default.MessageEvent, function (event) {
                            try {
                                _this.send(event.detail);
                                _this.logger.debug(function () { return 'dispatched screen sharing stream message event'; });
                            }
                            catch (error) {
                                _this.logger.error(error);
                            }
                        });
                        stream.addEventListener(ScreenShareStreamingEvent_1.default.EndedEvent, function () {
                            _this.logger.info('stream ended');
                            _this.stop().then(function () { });
                        });
                        stream.start(this.timeSliceMs);
                        this.stream = stream;
                        this.observerQueue.forEach(function (observer) {
                            Maybe_1.default.of(observer.didStartScreenSharing).map(function (f) { return f.bind(observer)(); });
                        });
                        this.logger.info('screen sharing stream started');
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultScreenSharingSession.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.stream === null) {
                return reject(new Error('not started'));
            }
            _this.stream
                .stop()
                .then(function () {
                _this.observerQueue.forEach(function (observer) {
                    Maybe_1.default.of(observer.didStopScreenSharing).map(function (f) { return f.bind(observer)(); });
                });
            })
                .then(function () {
                _this.logger.info('screen sharing stream stopped');
            })
                .finally(function () {
                _this.stream = null;
            })
                .then(resolve);
        });
    };
    DefaultScreenSharingSession.prototype.pause = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.stream === null) {
                return reject(new Error('not started'));
            }
            _this.stream.pause().then(function () {
                _this.observerQueue.forEach(function (observer) {
                    Maybe_1.default.of(observer.didPauseScreenSharing).map(function (f) { return f.bind(observer)(); });
                });
            });
            _this.logger.info('screen sharing stream paused');
            resolve();
        });
    };
    DefaultScreenSharingSession.prototype.unpause = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.stream === null) {
                return reject(new Error('not started'));
            }
            _this.stream.unpause().then(function () {
                _this.observerQueue.forEach(function (observer) {
                    Maybe_1.default.of(observer.didUnpauseScreenSharing).map(function (f) { return f.bind(observer)(); });
                });
            });
            _this.logger.info('screen sharing stream unpaused');
            resolve();
        });
    };
    /* istanbul ignore next */
    DefaultScreenSharingSession.prototype.ping = function (timeoutMs) {
        return __awaiter(this, void 0, void 0, function () {
            var self, promise, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                self = this;
                promise = new Promise(function (resolve) {
                    var observer = {
                        didReceiveHeartbeatResponse: function () {
                            self.deregisterObserver(this);
                            resolve();
                        },
                    };
                    var request = {
                        type: ScreenSharingMessageType_1.default.HeartbeatRequestType,
                        flags: [ScreenSharingMessageFlag_1.default.Local],
                        data: new Uint8Array([]),
                    };
                    _this.registerObserver(observer);
                    _this.send(request);
                });
                timeout = new Promise(function (resolve, reject) {
                    new TimeoutScheduler_1.default(timeoutMs).start(function () {
                        reject(new Error('ping timed out after ' + timeoutMs + 'ms'));
                    });
                });
                return [2 /*return*/, Promise.race([promise, timeout])];
            });
        });
    };
    DefaultScreenSharingSession.prototype.registerObserver = function (observer) {
        this.observerQueue.add(observer);
        return this;
    };
    DefaultScreenSharingSession.prototype.deregisterObserver = function (observer) {
        this.observerQueue.delete(observer);
        return this;
    };
    DefaultScreenSharingSession.prototype.didReceiveMessageEvent = function (event) {
        this.logger.debug(function () { return "didReceiveMessageEvent: " + new Uint8Array(event.data); });
        var message = this.messageSerialization.deserialize(new Uint8Array(event.data));
        switch (message.type) {
            case ScreenSharingMessageType_1.default.HeartbeatResponseType:
                return this.didReceiveHeartbeatResponseMessage();
            case ScreenSharingMessageType_1.default.HeartbeatRequestType:
                return this.didReceiveHeartbeatRequestMessage();
            case ScreenSharingMessageType_1.default.StreamStop:
                return this.didReceiveStreamStopMessage();
            case ScreenSharingMessageType_1.default.KeyRequest:
                return this.didReceiveKeyRequest();
            default:
                return this.didReceiveUnknownMessage();
        }
    };
    DefaultScreenSharingSession.prototype.didReceiveHeartbeatResponseMessage = function () {
        this.logger.info('received heartbeat response message');
        this.observerQueue.forEach(function (observer) {
            Maybe_1.default.of(observer.didReceiveHeartbeatResponse).map(function (f) { return f.bind(observer)(); });
        });
    };
    DefaultScreenSharingSession.prototype.didReceiveKeyRequest = function () {
        this.logger.info('received key request message');
        this.stream.key();
    };
    DefaultScreenSharingSession.prototype.didReceiveStreamStopMessage = function () {
        this.logger.debug(function () { return 'received stream stop message'; });
        this.observerQueue.forEach(function (observer) {
            Maybe_1.default.of(observer.didReceiveStreamStopMessage).map(function (f) { return f.bind(observer)(); });
        });
        this.stop().then(function () { });
    };
    DefaultScreenSharingSession.prototype.didReceiveUnknownMessage = function () {
        this.logger.debug(function () { return 'received unknown message'; });
        this.observerQueue.forEach(function (observer) {
            Maybe_1.default.of(observer.didReceiveUnknownMessage).map(function (f) { return f.bind(observer)(); });
        });
    };
    DefaultScreenSharingSession.prototype.didReceiveHeartbeatRequestMessage = function () {
        this.logger.debug(function () { return 'received heartbeat request'; });
        this.observerQueue.forEach(function (observer) {
            Maybe_1.default.of(observer.didReceiveHeartbeatRequest).map(function (f) { return f.bind(observer)(); });
        });
        var response = {
            type: ScreenSharingMessageType_1.default.HeartbeatResponseType,
            flags: [ScreenSharingMessageFlag_1.default.Local],
            data: new Uint8Array([]),
        };
        try {
            this.send(response);
            this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didSendHeartbeatResponse).map(function (f) { return f.bind(observer)(); });
            });
        }
        catch (error) {
            this.logger.error(error);
        }
    };
    DefaultScreenSharingSession.prototype.send = function (message) {
        try {
            this.webSocket.send(this.messageSerialization.serialize(message));
            this.logger.debug(function () { return 'sent screen sharing message'; });
            this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didSendScreenSharingMessage).map(function (f) { return f.bind(observer)(message.type); });
            });
            return message;
        }
        catch (error) {
            this.observerQueue.forEach(function (observer) {
                Maybe_1.default.of(observer.didFailSend).map(function (f) { return f.bind(observer)(error); });
            });
            throw error;
        }
    };
    return DefaultScreenSharingSession;
}());
exports.default = DefaultScreenSharingSession;
//# sourceMappingURL=DefaultScreenSharingSession.js.map