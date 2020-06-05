"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[MeetingSessionCredentials]] includes the credentials used to authenticate
 * the attendee on the meeting
 */
var MeetingSessionCredentials = /** @class */ (function () {
    function MeetingSessionCredentials() {
        /**
         * The attendee id for these credentials.
         */
        this.attendeeId = null;
        /**
         * The external user id associated with the attendee.
         */
        this.externalUserId = null;
        /**
         * If set, the session will be authenticated with a join token.
         */
        this.joinToken = null;
    }
    /**
     * Overrides JSON serialization so that join token is redacted.
     */
    MeetingSessionCredentials.prototype.toJSON = function () {
        return {
            attendeeId: this.attendeeId,
            joinToken: this.joinToken === null ? null : '<redacted>',
        };
    };
    return MeetingSessionCredentials;
}());
exports.default = MeetingSessionCredentials;
//# sourceMappingURL=MeetingSessionCredentials.js.map