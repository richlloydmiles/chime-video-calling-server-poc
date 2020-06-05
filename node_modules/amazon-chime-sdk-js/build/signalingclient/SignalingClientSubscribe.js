"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[SignalingClientSubscribe]] contains settings for the Subscribe SignalFrame.
 */
var SignalingClientSubscribe = /** @class */ (function () {
    /** Initializes a SignalingClientSubscribe with the given properties.
     *
     * @param{string} attendeeId Attendee ID of the client
     * @param{string} sdpOffer SDP offer created by WebRTC
     * @param{string} audioHost host
     * @param{boolean} audioMuted Whether audio from client is muted
     * @param{boolean} audioCheckin Whether audio is in checked-in state
     * @param{Array<number>} receiveStreamIds Which video streams to receive
     * @param{boolean} localVideoEnabled Whether to send a video stream for the local camera
     * @param{number} videoInputFrameRate Video input capture framerate; zero for no video
     * @param{number} videoInputMaxBitrateKbps Video input max bitrate; zero for no video
     * @param{boolean} connectionTypeHasVideo Whether connection type has video
     */
    function SignalingClientSubscribe(attendeeId, sdpOffer, audioHost, audioMuted, audioCheckin, receiveStreamIds, localVideoEnabled, videoInputFrameRate, videoInputMaxBitrateKbps, connectionTypeHasVideo) {
        this.attendeeId = attendeeId;
        this.sdpOffer = sdpOffer;
        this.audioHost = audioHost;
        this.audioMuted = audioMuted;
        this.audioCheckin = audioCheckin;
        this.receiveStreamIds = receiveStreamIds;
        this.localVideoEnabled = localVideoEnabled;
        this.videoInputFrameRate = videoInputFrameRate;
        this.videoInputMaxBitrateKbps = videoInputMaxBitrateKbps;
        this.connectionTypeHasVideo = connectionTypeHasVideo;
    }
    return SignalingClientSubscribe;
}());
exports.default = SignalingClientSubscribe;
//# sourceMappingURL=SignalingClientSubscribe.js.map