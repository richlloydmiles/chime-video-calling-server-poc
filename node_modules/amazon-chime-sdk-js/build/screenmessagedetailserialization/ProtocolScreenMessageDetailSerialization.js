"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../maybe/Maybe");
var ProtocolScreenMessageDetail_1 = require("../screenmessagedetail/ProtocolScreenMessageDetail");
var ScreenSignalingProtocol_1 = require("../screensignalingprotocol/ScreenSignalingProtocol");
var ProtocolScreenMessageDetailSerialization = /** @class */ (function () {
    function ProtocolScreenMessageDetailSerialization() {
    }
    ProtocolScreenMessageDetailSerialization.prototype.deserialize = function (data) {
        return Maybe_1.default.of(data).map(function (d) { return new ProtocolScreenMessageDetail_1.default(ScreenSignalingProtocol_1.SdkScreenSignalingMessage.decode(d)); });
    };
    return ProtocolScreenMessageDetailSerialization;
}());
exports.default = ProtocolScreenMessageDetailSerialization;
//# sourceMappingURL=ProtocolScreenMessageDetailSerialization.js.map