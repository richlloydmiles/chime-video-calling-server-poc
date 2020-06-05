"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenSharingMessageFlag_1 = require("../screensharingmessage/ScreenSharingMessageFlag");
var ScreenSharingMessageFlagSerializer = /** @class */ (function () {
    function ScreenSharingMessageFlagSerializer() {
    }
    ScreenSharingMessageFlagSerializer.prototype.serialize = function (flags) {
        var n = 0;
        if (flags.includes(ScreenSharingMessageFlag_1.default.Broadcast)) {
            n |= ScreenSharingMessageFlagSerializer.Broadcast;
        }
        if (flags.includes(ScreenSharingMessageFlag_1.default.Local)) {
            n |= ScreenSharingMessageFlagSerializer.Local;
        }
        if (flags.includes(ScreenSharingMessageFlag_1.default.Synthesized)) {
            n |= ScreenSharingMessageFlagSerializer.Synthesized;
        }
        if (flags.includes(ScreenSharingMessageFlag_1.default.Unicast)) {
            n |= ScreenSharingMessageFlagSerializer.Unicast;
        }
        return n;
    };
    ScreenSharingMessageFlagSerializer.prototype.deserialize = function (byte) {
        var flags = new Array();
        if (this.isBitSet(byte, ScreenSharingMessageFlagSerializer.Broadcast)) {
            flags.push(ScreenSharingMessageFlag_1.default.Broadcast);
        }
        if (this.isBitSet(byte, ScreenSharingMessageFlagSerializer.Unicast)) {
            flags.push(ScreenSharingMessageFlag_1.default.Unicast);
        }
        if (this.isBitSet(byte, ScreenSharingMessageFlagSerializer.Local)) {
            flags.push(ScreenSharingMessageFlag_1.default.Local);
        }
        if (this.isBitSet(byte, ScreenSharingMessageFlagSerializer.Synthesized)) {
            flags.push(ScreenSharingMessageFlag_1.default.Synthesized);
        }
        return flags;
    };
    ScreenSharingMessageFlagSerializer.prototype.isBitSet = function (byte, bit) {
        return (byte & bit) === bit;
    };
    ScreenSharingMessageFlagSerializer.Broadcast = 1 << 0;
    ScreenSharingMessageFlagSerializer.Local = 1 << 1;
    ScreenSharingMessageFlagSerializer.Synthesized = 1 << 2;
    ScreenSharingMessageFlagSerializer.Unicast = 1 << 3;
    return ScreenSharingMessageFlagSerializer;
}());
exports.default = ScreenSharingMessageFlagSerializer;
//# sourceMappingURL=ScreenSharingMessageFlagSerializer.js.map