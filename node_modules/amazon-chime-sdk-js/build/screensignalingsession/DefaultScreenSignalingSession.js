"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../maybe/Maybe");
var ScreenSharingMessageFlag_1 = require("../screensharingmessage/ScreenSharingMessageFlag");
var ScreenSharingMessageType_1 = require("../screensharingmessage/ScreenSharingMessageType");
var ScreenSignalingSessionEventType_1 = require("./ScreenSignalingSessionEventType");
var DefaultScreenSignalingSession = /** @class */ (function () {
    function DefaultScreenSignalingSession(webSocket, messageSerialization, logger) {
        var _this = this;
        this.webSocket = webSocket;
        this.messageSerialization = messageSerialization;
        this.logger = logger;
        this.listeners = new Map();
        this.webSocket.addEventListener('message', function (event) {
            _this.onMessageHandler(event);
        });
        this.webSocket.addEventListener('close', function (event) {
            _this.dispatchEvent(event);
        });
    }
    DefaultScreenSignalingSession.prototype.open = function (timeoutMs) {
        return this.webSocket.open(timeoutMs);
    };
    DefaultScreenSignalingSession.prototype.close = function (timeoutMs) {
        return this.webSocket.close(timeoutMs);
    };
    DefaultScreenSignalingSession.prototype.addEventListener = function (type, listener) {
        var _this = this;
        Maybe_1.default.of(this.listeners.get(type))
            .defaulting(new Set())
            .map(function (listeners) { return listeners.add(listener); })
            .map(function (listeners) { return _this.listeners.set(type, listeners); });
    };
    DefaultScreenSignalingSession.prototype.dispatchEvent = function (event) {
        Maybe_1.default.of(this.listeners.get(event.type)).map(function (listeners) {
            return listeners.forEach(function (listener) { return listener(event); });
        });
        return event.defaultPrevented;
    };
    DefaultScreenSignalingSession.prototype.removeEventListener = function (type, listener) {
        Maybe_1.default.of(this.listeners.get(type)).map(function (f) { return f.delete(listener); });
    };
    DefaultScreenSignalingSession.prototype.onMessageHandler = function (event) {
        var array = new Uint8Array(event.data);
        var message = this.messageSerialization.deserialize(array);
        switch (message.type) {
            case ScreenSharingMessageType_1.default.HeartbeatRequestType:
                this.logger.info('DefaultScreenSignalingSession received HeartbeatRequest');
                var response = {
                    type: ScreenSharingMessageType_1.default.HeartbeatResponseType,
                    flags: [ScreenSharingMessageFlag_1.default.Local],
                    data: new Uint8Array([]),
                };
                this.logger.info('Sending HeartbeatResponseType');
                this.webSocket.send(this.messageSerialization.serialize(response));
                this.dispatchEvent(new CustomEvent(ScreenSignalingSessionEventType_1.default.Heartbeat));
                break;
            case ScreenSharingMessageType_1.default.StreamStart:
                this.logger.info("received StreamStart; " + JSON.stringify(message.detail));
                var streamStart = new CustomEvent(ScreenSignalingSessionEventType_1.default.StreamStart, {
                    detail: message.detail,
                });
                this.dispatchEvent(streamStart);
                break;
            case ScreenSharingMessageType_1.default.StreamEnd:
                this.logger.info("received StreamEnd; " + JSON.stringify(message.detail));
                var streamEnd = new CustomEvent(ScreenSignalingSessionEventType_1.default.StreamEnd, {
                    detail: message.detail,
                });
                this.dispatchEvent(streamEnd);
                break;
            case ScreenSharingMessageType_1.default.PresenterSwitch:
                this.logger.info("received PresenterSwitch; " + JSON.stringify(message.detail));
                var streamSwitch = new CustomEvent(ScreenSignalingSessionEventType_1.default.StreamSwitch, {
                    detail: message.detail,
                });
                this.dispatchEvent(streamSwitch);
                break;
        }
    };
    DefaultScreenSignalingSession.SessionKey = '_aws_wt_session';
    return DefaultScreenSignalingSession;
}());
exports.default = DefaultScreenSignalingSession;
//# sourceMappingURL=DefaultScreenSignalingSession.js.map