"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[MeetingSessionVideoAvailability]] contains the video availability information.
 */
var MeetingSessionVideoAvailability = /** @class */ (function () {
    function MeetingSessionVideoAvailability() {
        /**
         * Indicates whether one or more remote video streams
         * are available for streaming. This can be used to decide whether or not to
         * switch the connection type to include video.
         */
        this.remoteVideoAvailable = false;
        /**
         * Indicates whether the server has a slot available for
         * this client's local video tile. If the client is already sending a local
         * video tile, then this will be true. This property can be used to decide
         * whether to offer the option to start the local video tile.
         */
        this.canStartLocalVideo = false;
    }
    /**
     * Returns whether the fields are the same as that of another availability object.
     */
    MeetingSessionVideoAvailability.prototype.equal = function (other) {
        return (this.remoteVideoAvailable === other.remoteVideoAvailable &&
            this.canStartLocalVideo === other.canStartLocalVideo);
    };
    /**
     * Returns a deep copy of this object.
     */
    MeetingSessionVideoAvailability.prototype.clone = function () {
        var cloned = new MeetingSessionVideoAvailability();
        cloned.remoteVideoAvailable = this.remoteVideoAvailable;
        cloned.canStartLocalVideo = this.canStartLocalVideo;
        return cloned;
    };
    return MeetingSessionVideoAvailability;
}());
exports.default = MeetingSessionVideoAvailability;
//# sourceMappingURL=MeetingSessionVideoAvailability.js.map