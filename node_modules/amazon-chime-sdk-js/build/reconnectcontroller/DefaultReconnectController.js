"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var TimeoutScheduler_1 = require("../scheduler/TimeoutScheduler");
var DefaultReconnectController = /** @class */ (function () {
    function DefaultReconnectController(reconnectTimeoutMs, backoffPolicy) {
        this.reconnectTimeoutMs = reconnectTimeoutMs;
        this.backoffPolicy = backoffPolicy;
        this.shouldReconnect = true;
        this.onlyRestartPeerConnection = false;
        this.firstConnectionAttempted = false;
        this.firstConnectionAttemptTimestampMs = 0;
        this.lastActiveTimestampMs = Infinity;
        this._isFirstConnection = true;
        this.backoffTimer = null;
        this.backoffCancel = null;
        this.reset();
    }
    DefaultReconnectController.prototype.timeSpentReconnectingMs = function () {
        if (!this.firstConnectionAttempted) {
            return 0;
        }
        return Date.now() - this.firstConnectionAttemptTimestampMs;
    };
    DefaultReconnectController.prototype.hasPastReconnectDeadline = function () {
        if (Date.now() - this.lastActiveTimestampMs >= this.reconnectTimeoutMs) {
            return true;
        }
        return this.timeSpentReconnectingMs() >= this.reconnectTimeoutMs;
    };
    DefaultReconnectController.prototype.reset = function () {
        this.cancel();
        this.shouldReconnect = true;
        this.onlyRestartPeerConnection = false;
        this.firstConnectionAttempted = false;
        this.firstConnectionAttemptTimestampMs = 0;
        this.lastActiveTimestampMs = Infinity;
        this.backoffPolicy.reset();
    };
    DefaultReconnectController.prototype.startedConnectionAttempt = function (isFirstConnection) {
        this._isFirstConnection = isFirstConnection;
        if (!this.firstConnectionAttempted) {
            this.firstConnectionAttempted = true;
            this.firstConnectionAttemptTimestampMs = Date.now();
        }
    };
    DefaultReconnectController.prototype.hasStartedConnectionAttempt = function () {
        return this.firstConnectionAttempted;
    };
    DefaultReconnectController.prototype.isFirstConnection = function () {
        return this._isFirstConnection;
    };
    DefaultReconnectController.prototype.disableReconnect = function () {
        this.shouldReconnect = false;
    };
    DefaultReconnectController.prototype.enableRestartPeerConnection = function () {
        this.onlyRestartPeerConnection = true;
    };
    DefaultReconnectController.prototype.cancel = function () {
        this.disableReconnect();
        if (this.backoffTimer) {
            this.backoffTimer.stop();
            if (this.backoffCancel) {
                this.backoffCancel();
                this.backoffCancel = null;
            }
        }
    };
    DefaultReconnectController.prototype.retryWithBackoff = function (retryFunc, cancelFunc) {
        var _this = this;
        var willRetry = this.shouldReconnect && !this.hasPastReconnectDeadline();
        if (willRetry) {
            this.backoffCancel = cancelFunc;
            this.backoffTimer = new TimeoutScheduler_1.default(this.backoffPolicy.nextBackoffAmountMs());
            this.backoffTimer.start(function () {
                _this.backoffCancel = null;
                retryFunc();
            });
        }
        return willRetry;
    };
    DefaultReconnectController.prototype.shouldOnlyRestartPeerConnection = function () {
        return this.onlyRestartPeerConnection;
    };
    DefaultReconnectController.prototype.clone = function () {
        return new DefaultReconnectController(this.reconnectTimeoutMs, this.backoffPolicy);
    };
    DefaultReconnectController.prototype.setLastActiveTimestampMs = function (timestampMs) {
        this.lastActiveTimestampMs = timestampMs;
    };
    return DefaultReconnectController;
}());
exports.default = DefaultReconnectController;
//# sourceMappingURL=DefaultReconnectController.js.map