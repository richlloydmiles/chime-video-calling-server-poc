"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var WebMMediaRecording_1 = require("./WebMMediaRecording");
var WebMMediaRecordingFactory = /** @class */ (function () {
    function WebMMediaRecordingFactory(mediaRecordingOptions) {
        if (mediaRecordingOptions === void 0) { mediaRecordingOptions = {}; }
        this.mediaRecordingOptions = mediaRecordingOptions;
    }
    WebMMediaRecordingFactory.prototype.create = function (mediaStream) {
        return new WebMMediaRecording_1.default(mediaStream, this.mediaRecordingOptions);
    };
    return WebMMediaRecordingFactory;
}());
exports.default = WebMMediaRecordingFactory;
//# sourceMappingURL=WebMMediaRecordingFactory.js.map