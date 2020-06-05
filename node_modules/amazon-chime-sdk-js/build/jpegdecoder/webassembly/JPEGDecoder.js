"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var JPEGDecoder = /** @class */ (function () {
    function JPEGDecoder(module, width, height) {
        this.pointer = 0;
        this.module = null;
        this.module = module;
        this.pointer = this.module.wasm().jpegdecoder_new(width, height);
    }
    JPEGDecoder.prototype.free = function () {
        this.module.wasm().__wbg_jpegdecoder_free(this.pointer);
        this.pointer = 0;
        this.module = null;
    };
    JPEGDecoder.prototype.outputPointer = function () {
        return this.module.wasm().jpegdecoder_output_ptr(this.pointer);
    };
    JPEGDecoder.prototype.decode = function (inputPointer, inputLength) {
        return this.module.wasm().jpegdecoder_decode(this.pointer, inputPointer, inputLength) !== 0;
    };
    JPEGDecoder.prototype.width = function () {
        return this.module.wasm().jpegdecoder_width(this.pointer);
    };
    JPEGDecoder.prototype.height = function () {
        return this.module.wasm().jpegdecoder_height(this.pointer);
    };
    return JPEGDecoder;
}());
exports.default = JPEGDecoder;
//# sourceMappingURL=JPEGDecoder.js.map