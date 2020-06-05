"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultVideoStreamIdSet_1 = require("../videostreamidset/DefaultVideoStreamIdSet");
/**
 * [[AllHighestVideoBandwidthPolicy]] implements is a rudimentary policy that simply
 * always subscribes to the highest quality video stream available
 * for all non-self participants.
 */
var AllHighestVideoBandwidthPolicy = /** @class */ (function () {
    function AllHighestVideoBandwidthPolicy(selfAttendeeId) {
        this.selfAttendeeId = selfAttendeeId;
        this.optimalReceiveSet = new DefaultVideoStreamIdSet_1.default();
        this.subscribedReceiveSet = new DefaultVideoStreamIdSet_1.default();
    }
    AllHighestVideoBandwidthPolicy.prototype.updateIndex = function (videoIndex) {
        this.optimalReceiveSet = this.calculateOptimalReceiveSet(videoIndex);
    };
    AllHighestVideoBandwidthPolicy.prototype.updateAvailableBandwidth = function (_bandwidthKbps) { };
    AllHighestVideoBandwidthPolicy.prototype.updateCalculatedOptimalReceiveSet = function () { };
    AllHighestVideoBandwidthPolicy.prototype.wantsResubscribe = function () {
        return !this.subscribedReceiveSet.equal(this.optimalReceiveSet);
    };
    AllHighestVideoBandwidthPolicy.prototype.chooseSubscriptions = function () {
        this.subscribedReceiveSet = this.optimalReceiveSet.clone();
        return this.subscribedReceiveSet.clone();
    };
    AllHighestVideoBandwidthPolicy.prototype.calculateOptimalReceiveSet = function (videoIndex) {
        return videoIndex.highestQualityStreamFromEachGroupExcludingSelf(this.selfAttendeeId);
    };
    return AllHighestVideoBandwidthPolicy;
}());
exports.default = AllHighestVideoBandwidthPolicy;
//# sourceMappingURL=AllHighestVideoBandwidthPolicy.js.map