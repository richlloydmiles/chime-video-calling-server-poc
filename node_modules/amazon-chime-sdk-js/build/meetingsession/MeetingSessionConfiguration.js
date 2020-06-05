"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultBrowserBehavior_1 = require("../browserbehavior/DefaultBrowserBehavior");
var ConnectionHealthPolicyConfiguration_1 = require("../connectionhealthpolicy/ConnectionHealthPolicyConfiguration");
var AllHighestVideoBandwidthPolicy_1 = require("../videodownlinkbandwidthpolicy/AllHighestVideoBandwidthPolicy");
var NScaleVideoUplinkBandwidthPolicy_1 = require("../videouplinkbandwidthpolicy/NScaleVideoUplinkBandwidthPolicy");
var MeetingSessionCredentials_1 = require("./MeetingSessionCredentials");
var MeetingSessionURLs_1 = require("./MeetingSessionURLs");
/**
 * [[MeetingSessionConfiguration]] contains the information necessary to start
 * a session.
 */
var MeetingSessionConfiguration = /** @class */ (function () {
    /**
     * Constructs a MeetingSessionConfiguration optionally with a chime:CreateMeeting and
     * chime:CreateAttendee response. You can pass in either a JSON object containing the
     * responses, or a JSON object containing the information in the Meeting and Attendee
     * root-level fields. Examples:
     *
     * ```
     * const configuration = new MeetingSessionConfiguration({
     *   "Meeting": {
     *      "MeetingId": "...",
     *      "MediaPlacement": {
     *        "AudioHostUrl": "...",
     *        "ScreenDataUrl": "...",
     *        "ScreenSharingUrl": "...",
     *        "ScreenViewingUrl": "...",
     *        "SignalingUrl": "...",
     *        "TurnControlUrl": "..."
     *      }
     *    }
     *   }
     * }, {
     *   "Attendee": {
     *     "ExternalUserId": "...",
     *     "AttendeeId": "...",
     *     "JoinToken": "..."
     *   }
     * });
     * ```
     *
     * ```
     * const configuration = new MeetingSessionConfiguration({
     *   "MeetingId": "...",
     *   "MediaPlacement": {
     *     "AudioHostUrl": "...",
     *     "ScreenDataUrl": "...",
     *     "ScreenSharingUrl": "...",
     *     "ScreenViewingUrl": "...",
     *     "SignalingUrl": "...",
     *     "TurnControlUrl": "..."
     *   }
     * }, {
     *   "ExternalUserId": "...",
     *   "AttendeeId": "...",
     *   "JoinToken": "..."
     * });
     * ```
     */
    function MeetingSessionConfiguration(createMeetingResponse, createAttendeeResponse) {
        /**
         * The id of the meeting the session is joining.
         */
        this.meetingId = null;
        /**
         * The credentials used to authenticate the session.
         */
        this.credentials = null;
        /**
         * The URLs the session uses to reach the meeting service.
         */
        this.urls = null;
        /**
         * Maximum amount of time in milliseconds to allow for connecting.
         */
        this.connectionTimeoutMs = 15000;
        /**
         * Maximum amount of time in milliseconds to allow for a screen sharing connection.
         */
        this.screenSharingTimeoutMs = 5000;
        /**
         * Maximum amount of time in milliseconds to allow for a screen viewing connection.
         */
        this.screenViewingTimeoutMs = 5000;
        /**
         * Screen sharing session options.
         */
        this.screenSharingSessionOptions = {};
        /**
         * Configuration for connection health policies: reconnection, unusable audio warning connection,
         * and signal strength bars connection.
         */
        this.connectionHealthPolicyConfiguration = new ConnectionHealthPolicyConfiguration_1.default();
        /**
         * Feature flag to enable WebAudio processing
         */
        this.enableWebAudio = false;
        /**
         * Feature flag to enable Chromium-based browsers
         */
        this.enableUnifiedPlanForChromiumBasedBrowsers = false;
        /**
         * Video downlink bandwidth policy to determine which remote videos
         * are subscribed to.
         */
        this.videoDownlinkBandwidthPolicy = null;
        /**
         * Video uplink bandwidth policy to determine the bandwidth constraints
         * of the local video.
         */
        this.videoUplinkBandwidthPolicy = null;
        if (createMeetingResponse) {
            if (createMeetingResponse.Meeting) {
                createMeetingResponse = createMeetingResponse.Meeting;
            }
            this.meetingId = createMeetingResponse.MeetingId;
            this.urls = new MeetingSessionURLs_1.default();
            this.urls.audioHostURL = createMeetingResponse.MediaPlacement.AudioHostUrl;
            this.urls.screenDataURL = createMeetingResponse.MediaPlacement.ScreenDataUrl;
            this.urls.screenSharingURL = createMeetingResponse.MediaPlacement.ScreenSharingUrl;
            this.urls.screenViewingURL = createMeetingResponse.MediaPlacement.ScreenViewingUrl;
            this.urls.signalingURL = createMeetingResponse.MediaPlacement.SignalingUrl;
            this.urls.turnControlURL = createMeetingResponse.MediaPlacement.TurnControlUrl;
        }
        if (createAttendeeResponse) {
            if (createAttendeeResponse.Attendee) {
                createAttendeeResponse = createAttendeeResponse.Attendee;
            }
            this.credentials = new MeetingSessionCredentials_1.default();
            this.credentials.attendeeId = createAttendeeResponse.AttendeeId;
            this.credentials.externalUserId = createAttendeeResponse.ExternalUserId;
            this.credentials.joinToken = createAttendeeResponse.JoinToken;
        }
        if (new DefaultBrowserBehavior_1.default().screenShareSendsOnlyKeyframes()) {
            this.screenSharingSessionOptions = { bitRate: 384000 };
        }
        this.videoDownlinkBandwidthPolicy = new AllHighestVideoBandwidthPolicy_1.default(this.credentials ? this.credentials.attendeeId : null);
        this.videoUplinkBandwidthPolicy = new NScaleVideoUplinkBandwidthPolicy_1.default(this.credentials ? this.credentials.attendeeId : null);
    }
    return MeetingSessionConfiguration;
}());
exports.default = MeetingSessionConfiguration;
//# sourceMappingURL=MeetingSessionConfiguration.js.map