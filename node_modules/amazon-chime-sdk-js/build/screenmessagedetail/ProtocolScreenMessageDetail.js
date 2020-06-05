"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ProtobufScreenMessageDetail = /** @class */ (function () {
    function ProtobufScreenMessageDetail(message) {
        this.message = message;
    }
    Object.defineProperty(ProtobufScreenMessageDetail.prototype, "attendeeId", {
        get: function () {
            return this.message.attendeeId;
        },
        enumerable: true,
        configurable: true
    });
    return ProtobufScreenMessageDetail;
}());
exports.default = ProtobufScreenMessageDetail;
//# sourceMappingURL=ProtocolScreenMessageDetail.js.map