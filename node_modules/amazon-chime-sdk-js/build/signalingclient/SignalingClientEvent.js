"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var SignalingClientEventType_1 = require("./SignalingClientEventType");
/*
 * [[SignalingClientEvent]] stores an event that can be sent to observers of the SignalingClient.
 */
var SignalingClientEvent = /** @class */ (function () {
    /** Initializes a SignalingClientEvent with the given SignalingClientEventType.
     *
     * @param {SignalingClient} client Indicates the SignalingClient associated with the event.
     * @param {SignalingClientEventType} type Indicates the kind of event.
     * @param {SdkSignalFrame} message SdkSignalFrame if type is ReceivedSignalFrame
     */
    function SignalingClientEvent(client, type, message) {
        this.client = client;
        this.type = type;
        this.message = message;
        this.timestampMs = Date.now();
    }
    SignalingClientEvent.prototype.isConnectionTerminated = function () {
        switch (this.type) {
            case SignalingClientEventType_1.default.WebSocketFailed:
            case SignalingClientEventType_1.default.WebSocketError:
            case SignalingClientEventType_1.default.WebSocketClosing:
            case SignalingClientEventType_1.default.WebSocketClosed:
                return true;
            default:
                return false;
        }
    };
    return SignalingClientEvent;
}());
exports.default = SignalingClientEvent;
//# sourceMappingURL=SignalingClientEvent.js.map