"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Versioning_1 = require("../versioning/Versioning");
var WebSocketReadyState_1 = require("./WebSocketReadyState");
var DefaultWebSocketAdapter = /** @class */ (function () {
    function DefaultWebSocketAdapter(logger) {
        this.logger = logger;
    }
    DefaultWebSocketAdapter.prototype.create = function (url, protocols) {
        this.connection = new WebSocket(Versioning_1.default.urlWithVersion(url), protocols);
        this.connection.binaryType = 'arraybuffer';
    };
    DefaultWebSocketAdapter.prototype.send = function (message) {
        var _this = this;
        try {
            this.connection.send(message.buffer);
            return true;
        }
        catch (err) {
            this.logger.debug(function () {
                return "send error: " + err.message + ", websocket state=" + WebSocketReadyState_1.default[_this.readyState()];
            });
            return false;
        }
    };
    DefaultWebSocketAdapter.prototype.close = function () {
        this.connection.close();
    };
    DefaultWebSocketAdapter.prototype.destroy = function () {
        this.connection = null;
    };
    DefaultWebSocketAdapter.prototype.addEventListener = function (handler, eventListener) {
        this.connection.addEventListener(handler, eventListener);
    };
    DefaultWebSocketAdapter.prototype.readyState = function () {
        if (!this.connection) {
            return WebSocketReadyState_1.default.None;
        }
        switch (this.connection.readyState) {
            case WebSocket.CONNECTING:
                return WebSocketReadyState_1.default.Connecting;
            case WebSocket.OPEN:
                return WebSocketReadyState_1.default.Open;
            case WebSocket.CLOSING:
                return WebSocketReadyState_1.default.Closing;
            case WebSocket.CLOSED:
                return WebSocketReadyState_1.default.Closed;
        }
    };
    return DefaultWebSocketAdapter;
}());
exports.default = DefaultWebSocketAdapter;
//# sourceMappingURL=DefaultWebSocketAdapter.js.map