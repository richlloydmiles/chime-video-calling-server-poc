"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implements the [Full Jitter algorithm](
 * https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
 * and also allows for specifying a fixed wait added to the full jitter backoff
 * (which can be zero).
 */
var FullJitterBackoff = /** @class */ (function () {
    function FullJitterBackoff(fixedWaitMs, shortBackoffMs, longBackoffMs) {
        this.fixedWaitMs = fixedWaitMs;
        this.shortBackoffMs = shortBackoffMs;
        this.longBackoffMs = longBackoffMs;
        this.currentRetry = 0;
        if (this.fixedWaitMs < 0) {
            this.fixedWaitMs = 0;
        }
        if (this.shortBackoffMs < 0) {
            this.shortBackoffMs = 0;
        }
        if (this.longBackoffMs < 0) {
            this.longBackoffMs = 0;
        }
        this.reset();
    }
    FullJitterBackoff.prototype.reset = function () {
        this.currentRetry = 0;
    };
    FullJitterBackoff.prototype.nextBackoffAmountMs = function () {
        var fullJitterMs = Math.random() *
            Math.min(this.longBackoffMs, this.shortBackoffMs * Math.pow(2.0, this.currentRetry)) +
            this.fixedWaitMs;
        this.currentRetry += 1;
        return fullJitterMs;
    };
    return FullJitterBackoff;
}());
exports.default = FullJitterBackoff;
//# sourceMappingURL=FullJitterBackoff.js.map