"use strict";
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-explicit-any: 0 */
var DataMessage = /** @class */ (function () {
    function DataMessage(timestampMs, topic, data, senderAttendeeId, senderExternalUserId, throttled) {
        this.timestampMs = timestampMs;
        this.topic = topic;
        this.data = data;
        this.senderAttendeeId = senderAttendeeId;
        this.senderExternalUserId = senderExternalUserId;
        this.throttled = !!throttled;
    }
    /**
     * Helper conversion methods to convert Uint8Array data to string
     */
    DataMessage.prototype.text = function () {
        return new TextDecoder().decode(this.data);
    };
    /**
     * Helper conversion methods to convert Uint8Array data to JSON
     */
    DataMessage.prototype.json = function () {
        return JSON.parse(new TextDecoder().decode(this.data));
    };
    return DataMessage;
}());
exports.default = DataMessage;
//# sourceMappingURL=DataMessage.js.map