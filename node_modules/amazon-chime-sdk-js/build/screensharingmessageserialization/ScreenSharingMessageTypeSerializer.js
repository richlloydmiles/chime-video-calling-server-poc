"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenSharingMessageType_1 = require("../screensharingmessage/ScreenSharingMessageType");
/**
 * [[ScreenSharingMessageTypeSerializer]] Default ScreenSharingMessageTypeSerialization implementation
 */
var ScreenSharingMessageTypeSerializer = /** @class */ (function () {
    function ScreenSharingMessageTypeSerializer() {
    }
    ScreenSharingMessageTypeSerializer.prototype.serialize = function (type) {
        if (ScreenSharingMessageTypeSerializer.fromTypeMap.has(type)) {
            return ScreenSharingMessageTypeSerializer.fromTypeMap.get(type);
        }
        return 0;
    };
    ScreenSharingMessageTypeSerializer.prototype.deserialize = function (byte) {
        if (ScreenSharingMessageTypeSerializer.fromNumberMap.has(byte)) {
            return ScreenSharingMessageTypeSerializer.fromNumberMap.get(byte);
        }
        return ScreenSharingMessageType_1.default.UnknownType;
    };
    ScreenSharingMessageTypeSerializer.fromNumberMap = new Map([
        [0x02, ScreenSharingMessageType_1.default.KeyRequest],
        [0x03, ScreenSharingMessageType_1.default.StreamStart],
        [0x04, ScreenSharingMessageType_1.default.StreamEnd],
        [0x05, ScreenSharingMessageType_1.default.StreamStop],
        [0x06, ScreenSharingMessageType_1.default.HeartbeatRequestType],
        [0x07, ScreenSharingMessageType_1.default.HeartbeatResponseType],
        [0x0d, ScreenSharingMessageType_1.default.WebM],
        [0x10, ScreenSharingMessageType_1.default.PresenterSwitch],
        [0x15, ScreenSharingMessageType_1.default.StreamPause],
        [0x16, ScreenSharingMessageType_1.default.StreamUnpause],
    ]);
    ScreenSharingMessageTypeSerializer.fromTypeMap = new Map(Array.from(ScreenSharingMessageTypeSerializer.fromNumberMap).map(function (entry) { return entry.reverse(); }));
    return ScreenSharingMessageTypeSerializer;
}());
exports.default = ScreenSharingMessageTypeSerializer;
//# sourceMappingURL=ScreenSharingMessageTypeSerializer.js.map