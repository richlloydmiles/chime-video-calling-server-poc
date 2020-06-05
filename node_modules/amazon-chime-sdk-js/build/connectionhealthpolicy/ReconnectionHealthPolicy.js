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
var ReconnectionHealthPolicy = /** @class */ (function (_super) {
    __extends(ReconnectionHealthPolicy, _super);
    function ReconnectionHealthPolicy(logger, configuration, data) {
        var _this = _super.call(this, configuration, data) || this;
        _this.logger = logger;
        _this.audioDelayPointsOverMaximum = 0;
        ReconnectionHealthPolicy.CONNECTION_UNHEALTHY_THRESHOLD =
            configuration.connectionUnhealthyThreshold;
        ReconnectionHealthPolicy.CONNECTION_WAIT_TIME_MS = configuration.connectionWaitTimeMs;
        ReconnectionHealthPolicy.MISSED_PONGS_THRESHOLD = configuration.missedPongsUpperThreshold;
        ReconnectionHealthPolicy.MAXIMUM_AUDIO_DELAY_MS = configuration.maximumAudioDelayMs;
        ReconnectionHealthPolicy.MAXIMUM_AUDIO_DELAY_DATA_POINTS =
            configuration.maximumAudioDelayDataPoints;
        return _this;
    }
    ReconnectionHealthPolicy.prototype.health = function () {
        var connectionStartedRecently = this.currentData.isConnectionStartRecent(ReconnectionHealthPolicy.CONNECTION_WAIT_TIME_MS);
        if (connectionStartedRecently) {
            return 1;
        }
        var noPacketsReceivedRecently = this.currentData.consecutiveStatsWithNoPackets >=
            ReconnectionHealthPolicy.CONNECTION_UNHEALTHY_THRESHOLD;
        var missedPongsRecently = this.currentData.consecutiveMissedPongs >= ReconnectionHealthPolicy.MISSED_PONGS_THRESHOLD;
        if (this.currentData.audioSpeakerDelayMs > ReconnectionHealthPolicy.MAXIMUM_AUDIO_DELAY_MS) {
            this.audioDelayPointsOverMaximum += 1;
        }
        else {
            this.audioDelayPointsOverMaximum = 0;
        }
        var hasBadAudioDelay = this.audioDelayPointsOverMaximum > ReconnectionHealthPolicy.MAXIMUM_AUDIO_DELAY_DATA_POINTS;
        if (hasBadAudioDelay) {
            this.audioDelayPointsOverMaximum = 0;
        }
        var needsReconnect = noPacketsReceivedRecently || missedPongsRecently || hasBadAudioDelay;
        if (needsReconnect) {
            this.logger.warn("reconnection recommended due to: no packets received: " + noPacketsReceivedRecently + ", missed pongs: " + missedPongsRecently + ", bad audio delay: " + hasBadAudioDelay);
            return 0;
        }
        return 1;
    };
    return ReconnectionHealthPolicy;
}(BaseConnectionHealthPolicy_1.default));
exports.default = ReconnectionHealthPolicy;
//# sourceMappingURL=ReconnectionHealthPolicy.js.map