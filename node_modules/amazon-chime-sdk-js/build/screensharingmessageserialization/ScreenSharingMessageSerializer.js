"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenSharingMessageType_1 = require("../screensharingmessage/ScreenSharingMessageType");
var ScreenSharingMessageSerializer = /** @class */ (function () {
    function ScreenSharingMessageSerializer(typeSerialization, flagSerialization, signalingDetailSerialization) {
        this.typeSerialization = typeSerialization;
        this.flagSerialization = flagSerialization;
        this.signalingDetailSerialization = signalingDetailSerialization;
    }
    ScreenSharingMessageSerializer.prototype.serialize = function (message) {
        var type = this.typeSerialization.serialize(message.type);
        var flags = this.flagSerialization.serialize(message.flags);
        var header = Uint8Array.of(type, flags, 0x0, 0x0);
        return new Blob([header, message.data]);
    };
    ScreenSharingMessageSerializer.prototype.deserialize = function (buffer) {
        var signalingDetail = null;
        var type = this.typeSerialization.deserialize(buffer[0]);
        var flags = this.flagSerialization.deserialize(buffer[1]);
        var data = buffer.slice(4, buffer.length);
        if (ScreenSharingMessageSerializer.detailedSignals.indexOf(type) > -1) {
            signalingDetail = this.signalingDetailSerialization.deserialize(data).getOrElse(null);
        }
        return {
            type: type,
            flags: flags,
            data: data,
            detail: signalingDetail,
        };
    };
    ScreenSharingMessageSerializer.detailedSignals = Array.of(ScreenSharingMessageType_1.default.StreamStart, ScreenSharingMessageType_1.default.StreamEnd, ScreenSharingMessageType_1.default.PresenterSwitch);
    return ScreenSharingMessageSerializer;
}());
exports.default = ScreenSharingMessageSerializer;
//# sourceMappingURL=ScreenSharingMessageSerializer.js.map