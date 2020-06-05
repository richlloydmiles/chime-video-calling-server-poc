"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[ScreenViewingSessionConnectionRequest]] represents an connection request.
 */
var ScreenViewingSessionConnectionRequest = /** @class */ (function () {
    function ScreenViewingSessionConnectionRequest(screenViewingURLWithOptionalSessionToken, screenDataURL, sessionToken, timeoutMs) {
        this.screenViewingURLWithOptionalSessionToken = screenViewingURLWithOptionalSessionToken;
        this.screenDataURL = screenDataURL;
        this.sessionToken = sessionToken;
        this.timeoutMs = timeoutMs;
    }
    Object.defineProperty(ScreenViewingSessionConnectionRequest.prototype, "screenViewingURL", {
        get: function () {
            if (this.screenViewingURLWithOptionalSessionToken.includes('&session_token=')) {
                return this.screenViewingURLWithOptionalSessionToken;
            }
            else {
                return this.screenViewingURLWithOptionalSessionToken + "&session_token=" + this.sessionToken;
            }
        },
        enumerable: true,
        configurable: true
    });
    ScreenViewingSessionConnectionRequest.prototype.protocols = function () {
        return [];
    };
    return ScreenViewingSessionConnectionRequest;
}());
exports.default = ScreenViewingSessionConnectionRequest;
//# sourceMappingURL=ScreenViewingSessionConnectionRequest.js.map