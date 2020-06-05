"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var JPEGDecoder_1 = require("../webassembly/JPEGDecoder");
var DefaultJPEGDecoderInstance = /** @class */ (function () {
    function DefaultJPEGDecoderInstance(module, controller, width, height) {
        this.decoder = null;
        this.controller = null;
        this.controller = controller;
        this.decoder = new JPEGDecoder_1.default(module, width, height);
    }
    DefaultJPEGDecoderInstance.prototype.free = function () {
        this.decoder.free();
        this.decoder = null;
        this.controller = null;
    };
    DefaultJPEGDecoderInstance.prototype.decodeToImageData = function (inputArray) {
        if (this.controller.isInputTooLarge(inputArray.length)) {
            throw new Error('buffer too large for jpeg decoder input buffer: ' + inputArray.length + ' bytes');
        }
        var b = this.controller.newInternalInputView();
        var d = inputArray;
        var n = d.length;
        var i = 0;
        for (i = 0; i < n; i++) {
            b[i] = d[i];
        }
        var result = this.decoder.decode(this.controller.inputPointer(), inputArray.length);
        if (!result) {
            throw new Error('jpeg decoder failed for input: ' + inputArray);
        }
        var actualWidth = this.decoder.width();
        var actualHeight = this.decoder.height();
        var actualBytes = actualWidth * actualHeight * 4;
        var buffer = this.controller.newInternalOutputView(this.decoder.outputPointer(), actualBytes);
        return new ImageData(buffer, actualWidth, actualHeight);
    };
    return DefaultJPEGDecoderInstance;
}());
exports.default = DefaultJPEGDecoderInstance;
//# sourceMappingURL=DefaultJPEGDecoderInstance.js.map