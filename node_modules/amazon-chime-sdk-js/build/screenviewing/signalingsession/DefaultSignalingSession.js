"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../../maybe/Maybe");
var ScreenSignalingSessionEventType_1 = require("../../screensignalingsession/ScreenSignalingSessionEventType");
var DefaultSignalingSession = /** @class */ (function () {
    function DefaultSignalingSession(screenSignalingSessionFactory) {
        this.screenSignalingSessionFactory = screenSignalingSessionFactory;
        this.DEFAULT_TIMEOUT_MS = 500;
        this.observers = new Set();
    }
    DefaultSignalingSession.prototype.open = function (connectionRequest) {
        var _this = this;
        if (this.session) {
            return Promise.reject(new Error('Must close connection before opening another'));
        }
        this.session = this.screenSignalingSessionFactory.create(connectionRequest.screenDataURL, connectionRequest.sessionToken);
        this.session.addEventListener(ScreenSignalingSessionEventType_1.default.StreamStart, function (event) {
            _this.observers.forEach(function (observer) {
                Maybe_1.default.of(observer.streamDidStart).map(function (f) { return f(event.detail); });
            });
        });
        this.session.addEventListener(ScreenSignalingSessionEventType_1.default.StreamEnd, function (event) {
            _this.observers.forEach(function (observer) {
                Maybe_1.default.of(observer.streamDidStop).map(function (f) { return f(event.detail); });
            });
        });
        this.session.addEventListener(ScreenSignalingSessionEventType_1.default.StreamSwitch, function (event) {
            _this.observers.forEach(function (observer) {
                return Maybe_1.default.of(observer.streamDidSwitch).map(function (f) { return f(event.detail); });
            });
        });
        return this.session.open(connectionRequest.timeoutMs).then(function () { });
    };
    DefaultSignalingSession.prototype.close = function () {
        if (!this.session) {
            return Promise.resolve();
        }
        var session = this.session;
        this.session = null;
        return session.close(this.DEFAULT_TIMEOUT_MS).then(function () { });
    };
    DefaultSignalingSession.prototype.registerObserver = function (observer) {
        this.observers.add(observer);
    };
    DefaultSignalingSession.prototype.unregisterObserver = function (observer) {
        this.observers.delete(observer);
    };
    return DefaultSignalingSession;
}());
exports.default = DefaultSignalingSession;
//# sourceMappingURL=DefaultSignalingSession.js.map