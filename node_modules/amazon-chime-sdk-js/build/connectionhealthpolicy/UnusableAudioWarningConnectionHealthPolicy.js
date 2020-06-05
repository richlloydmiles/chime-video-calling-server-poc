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
var BaseConnectionHealthPolicy_1 = require("./BaseConnectionHealthPolicy");
var UnusableAudioWarningConnectionHealthPolicy = /** @class */ (function (_super) {
    __extends(UnusableAudioWarningConnectionHealthPolicy, _super);
    function UnusableAudioWarningConnectionHealthPolicy(configuration, data) {
        var _this = _super.call(this, configuration, data) || this;
        _this.coolDownTimeMs = configuration.cooldownTimeMs;
        _this.pastSamplesToConsider = configuration.pastSamplesToConsider;
        _this.fractionalLoss = configuration.fractionalLoss;
        _this.packetsExpected = configuration.packetsExpected;
        _this.maximumTimesToWarn = configuration.maximumTimesToWarn;
        _this.lastWarnTimestampMs = 0;
        _this.warnCount = 0;
        return _this;
    }
    UnusableAudioWarningConnectionHealthPolicy.prototype.calculateFractionalLoss = function () {
        if (this.currentData.packetsReceivedInLastMinute.length < this.pastSamplesToConsider) {
            return 0;
        }
        var samplesToConsider = this.pastSamplesToConsider;
        var totalPacketsExpected = samplesToConsider * this.packetsExpected;
        var totalPacketsReceived = 0;
        for (var i = 0; i < samplesToConsider; i++) {
            totalPacketsReceived += this.currentData.packetsReceivedInLastMinute[i];
        }
        return Math.min(Math.max(1 - totalPacketsReceived / totalPacketsExpected, 0), 1);
    };
    UnusableAudioWarningConnectionHealthPolicy.prototype.health = function () {
        var warnedRecently = Date.now() - this.lastWarnTimestampMs < this.coolDownTimeMs;
        if (warnedRecently) {
            return 1;
        }
        var hasHadHighPacketLoss = this.calculateFractionalLoss() >= this.fractionalLoss;
        var shouldWarn = hasHadHighPacketLoss;
        if (shouldWarn) {
            if (this.currentHealth !== 0) {
                this.lastWarnTimestampMs = Date.now();
                this.warnCount++;
                if (this.warnCount > this.maximumTimesToWarn) {
                    return 1;
                }
            }
            return 0;
        }
        return 1;
    };
    return UnusableAudioWarningConnectionHealthPolicy;
}(BaseConnectionHealthPolicy_1.default));
exports.default = UnusableAudioWarningConnectionHealthPolicy;
//# sourceMappingURL=UnusableAudioWarningConnectionHealthPolicy.js.map