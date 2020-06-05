"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../../maybe/Maybe");
/**
 * [[DefaultScreenViewingSession]] is a default impl of the interface.
 */
var DefaultScreenViewingSession = /** @class */ (function () {
    function DefaultScreenViewingSession(webSocketFactory, logger) {
        this.webSocketFactory = webSocketFactory;
        this.logger = logger;
        this.webSocket = null;
    }
    DefaultScreenViewingSession.prototype.withObserver = function (observer) {
        this.observer = observer;
        return this;
    };
    DefaultScreenViewingSession.prototype.openConnection = function (request) {
        var _this = this;
        this.logger.info("DefaultScreenViewingSession: Opening connection");
        if (this.webSocket) {
            return Promise.reject(new Error('Must close existing connection before opening a new one'));
        }
        this.webSocket = this.webSocketFactory.create(request.screenViewingURL, request.protocols(), 'arraybuffer');
        this.webSocket.addEventListener('message', function (event) {
            Maybe_1.default.of(_this.observer).map(function (observer) {
                Maybe_1.default.of(observer.didReceiveWebSocketMessage).map(function (f) { return f.bind(_this.observer)(event); });
            });
        });
        this.webSocket.addEventListener('close', function (event) {
            Maybe_1.default.of(_this.observer).map(function (observer) {
                Maybe_1.default.of(observer.didCloseWebSocket).map(function (f) { return f.bind(_this.observer)(event); });
            });
            _this.webSocket = null;
        });
        return this.webSocket.open(request.timeoutMs);
    };
    DefaultScreenViewingSession.prototype.closeConnection = function () {
        this.logger.info("DefaultScreenViewingSession: Closing connection");
        if (!this.webSocket) {
            return Promise.reject(new Error('No websocket to close'));
        }
        var webSocket = this.webSocket;
        this.webSocket = null;
        return webSocket.close(DefaultScreenViewingSession.DEFAULT_TIMEOUT).then(function () { });
    };
    DefaultScreenViewingSession.prototype.send = function (data) {
        this.logger.debug(function () { return "DefaultScreenViewingSession: Sending " + data.byteLength + " bytes"; });
        this.webSocket.send(data);
    };
    DefaultScreenViewingSession.DEFAULT_TIMEOUT = 1000;
    return DefaultScreenViewingSession;
}());
exports.default = DefaultScreenViewingSession;
//# sourceMappingURL=DefaultScreenViewingSession.js.map