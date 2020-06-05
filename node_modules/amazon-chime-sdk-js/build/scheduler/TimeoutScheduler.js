"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[TimeoutScheduler]] calls the callback once after timeoutMs milliseconds.
 */
var TimeoutScheduler = /** @class */ (function () {
    function TimeoutScheduler(timeoutMs) {
        this.timeoutMs = timeoutMs;
        // eslint-disable-next-line
        this.timer = null;
    }
    TimeoutScheduler.prototype.start = function (callback) {
        var _this = this;
        this.stop();
        this.timer = setTimeout(function () {
            clearTimeout(_this.timer);
            callback();
        }, this.timeoutMs);
    };
    TimeoutScheduler.prototype.stop = function () {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    return TimeoutScheduler;
}());
exports.default = TimeoutScheduler;
//# sourceMappingURL=TimeoutScheduler.js.map