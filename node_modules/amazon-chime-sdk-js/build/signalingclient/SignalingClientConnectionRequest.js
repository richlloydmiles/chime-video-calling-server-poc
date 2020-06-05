"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * [[SignalingClientConnectionRequest]] represents an connection request.
 */
var SignalingClientConnectionRequest = /** @class */ (function () {
    /** Creates a request with the given URL, conference id, and session token.
     *
     * @param {string} signalingURL The URL of the signaling proxy.
     * @param {string} sessionToken The session token that will auth the connection.
     */
    function SignalingClientConnectionRequest(signalingURL, sessionToken) {
        this.signalingURL = signalingURL;
        this.sessionToken = sessionToken;
    }
    /** Gets the signaling URL representing this request.*/
    SignalingClientConnectionRequest.prototype.url = function () {
        return this.signalingURL + '?X-Chime-Control-Protocol-Version=3';
    };
    /** Gets the protocols associated with this request.*/
    SignalingClientConnectionRequest.prototype.protocols = function () {
        return ['_aws_wt_session', this.sessionToken];
    };
    return SignalingClientConnectionRequest;
}());
exports.default = SignalingClientConnectionRequest;
//# sourceMappingURL=SignalingClientConnectionRequest.js.map