"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultVideoCaptureAndEncodeParameter_1 = require("../videocaptureandencodeparameter/DefaultVideoCaptureAndEncodeParameter");
/** NScaleVideoUplinkBandwidthPolicy implements capture and encode
 *  parameters that are nearly equivalent to those chosen by the
 *  traditional native clients, except for a modification to
 *  maxBandwidthKbps described below. */
var NScaleVideoUplinkBandwidthPolicy = /** @class */ (function () {
    function NScaleVideoUplinkBandwidthPolicy(selfAttendeeId) {
        this.selfAttendeeId = selfAttendeeId;
        this.numParticipants = 0;
        this.idealMaxBandwidthKbps = 1400;
        this.hasBandwidthPriority = false;
        this.optimalParameters = new DefaultVideoCaptureAndEncodeParameter_1.default(0, 0, 0, 0, false);
        this.parametersInEffect = new DefaultVideoCaptureAndEncodeParameter_1.default(0, 0, 0, 0, false);
    }
    NScaleVideoUplinkBandwidthPolicy.prototype.updateIndex = function (videoIndex) {
        // the +1 for self is assuming that we intend to send video, since
        // the context here is VideoUplinkBandwidthPolicy
        this.numParticipants =
            videoIndex.numberOfVideoPublishingParticipantsExcludingSelf(this.selfAttendeeId) + 1;
        this.optimalParameters = new DefaultVideoCaptureAndEncodeParameter_1.default(this.captureWidth(), this.captureHeight(), this.captureFrameRate(), this.maxBandwidthKbps(), false);
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.wantsResubscribe = function () {
        return !this.parametersInEffect.equal(this.optimalParameters);
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.chooseCaptureAndEncodeParameters = function () {
        this.parametersInEffect = this.optimalParameters.clone();
        return this.parametersInEffect.clone();
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.captureWidth = function () {
        var width = 640;
        if (this.numParticipants > 4) {
            width = 320;
        }
        return width;
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.captureHeight = function () {
        var height = 360;
        if (this.numParticipants > 4) {
            height = 180;
        }
        return height;
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.captureFrameRate = function () {
        return 15;
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.maxBandwidthKbps = function () {
        if (this.hasBandwidthPriority) {
            return Math.trunc(this.idealMaxBandwidthKbps);
        }
        var rate = 0;
        if (this.numParticipants <= 2) {
            rate = this.idealMaxBandwidthKbps;
        }
        else if (this.numParticipants <= 4) {
            rate = (this.idealMaxBandwidthKbps * 2) / 3;
        }
        else {
            rate = ((544 / 11 + 14880 / (11 * this.numParticipants)) / 600) * this.idealMaxBandwidthKbps;
        }
        return Math.trunc(rate);
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.setIdealMaxBandwidthKbps = function (idealMaxBandwidthKbps) {
        this.idealMaxBandwidthKbps = idealMaxBandwidthKbps;
    };
    NScaleVideoUplinkBandwidthPolicy.prototype.setHasBandwidthPriority = function (hasBandwidthPriority) {
        this.hasBandwidthPriority = hasBandwidthPriority;
    };
    return NScaleVideoUplinkBandwidthPolicy;
}());
exports.default = NScaleVideoUplinkBandwidthPolicy;
//# sourceMappingURL=NScaleVideoUplinkBandwidthPolicy.js.map