"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenShareStream_1 = require("./ScreenShareStream");
var ScreenShareStreamFactory = /** @class */ (function () {
    function ScreenShareStreamFactory() {
    }
    ScreenShareStreamFactory.prototype.create = function (mediaRecording) {
        return new ScreenShareStream_1.default(mediaRecording);
    };
    return ScreenShareStreamFactory;
}());
exports.default = ScreenShareStreamFactory;
//# sourceMappingURL=ScreenShareStreamFactory.js.map