"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FullJitterBackoff_1 = require("./FullJitterBackoff");
var FullJitterLimitedBackoff = /** @class */ (function (_super) {
    __extends(FullJitterLimitedBackoff, _super);
    function FullJitterLimitedBackoff(fixedWaitMs, shortBackoffMs, longBackoffMs, limit) {
        var _this = _super.call(this, fixedWaitMs, shortBackoffMs, longBackoffMs) || this;
        _this.limit = limit;
        _this.attempts = 0;
        return _this;
    }
    FullJitterLimitedBackoff.prototype.nextBackoffAmountMs = function () {
        this.attempts++;
        if (this.attempts > this.limit) {
            throw new Error('retry limit exceeded');
        }
        return _super.prototype.nextBackoffAmountMs.call(this);
    };
    return FullJitterLimitedBackoff;
}(FullJitterBackoff_1.default));
exports.default = FullJitterLimitedBackoff;
//# sourceMappingURL=FullJitterLimitedBackoff.js.map