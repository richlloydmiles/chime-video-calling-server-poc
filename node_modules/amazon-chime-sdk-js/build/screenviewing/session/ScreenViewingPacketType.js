"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenViewingPacketType;
(function (ScreenViewingPacketType) {
    ScreenViewingPacketType[ScreenViewingPacketType["SETUP"] = 1] = "SETUP";
    ScreenViewingPacketType[ScreenViewingPacketType["DELTA"] = 2] = "DELTA";
    ScreenViewingPacketType[ScreenViewingPacketType["SYNC"] = 3] = "SYNC";
    ScreenViewingPacketType[ScreenViewingPacketType["ECHO_REQUEST"] = 4] = "ECHO_REQUEST";
    ScreenViewingPacketType[ScreenViewingPacketType["ECHO_RESPONSE"] = 5] = "ECHO_RESPONSE";
    ScreenViewingPacketType[ScreenViewingPacketType["NOSCREEN"] = 7] = "NOSCREEN";
    ScreenViewingPacketType[ScreenViewingPacketType["ENDSCREEN"] = 8] = "ENDSCREEN";
    ScreenViewingPacketType[ScreenViewingPacketType["JPEG_HEADER_BYTE_0"] = 255] = "JPEG_HEADER_BYTE_0";
    ScreenViewingPacketType[ScreenViewingPacketType["JPEG_HEADER_BYTE_1"] = 216] = "JPEG_HEADER_BYTE_1";
})(ScreenViewingPacketType = exports.ScreenViewingPacketType || (exports.ScreenViewingPacketType = {}));
exports.default = ScreenViewingPacketType;
//# sourceMappingURL=ScreenViewingPacketType.js.map