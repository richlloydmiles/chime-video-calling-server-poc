"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[IntervalScheduler]] calls the callback every intervalMs milliseconds.
 */
var IntervalScheduler = /** @class */ (function () {
    function IntervalScheduler(intervalMs) {
        this.intervalMs = intervalMs;
        // eslint-disable-next-line
        this.timer = null;
    }
    IntervalScheduler.prototype.start = function (callback) {
        this.stop();
        this.timer = setInterval(callback, this.intervalMs);
    };
    IntervalScheduler.prototype.stop = function () {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
    };
    return IntervalScheduler;
}());
exports.default = IntervalScheduler;
//# sourceMappingURL=IntervalScheduler.js.map