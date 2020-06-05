"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var JPEGDecoderInput = /** @class */ (function () {
    function JPEGDecoderInput(module, maxBytes) {
        this.pointer = 0;
        this.module = null;
        this.module = module;
        this.pointer = this.module.wasm().jpegdecoderinput_new(maxBytes);
    }
    JPEGDecoderInput.prototype.free = function () {
        this.module.wasm().__wbg_jpegdecoderinput_free(this.pointer);
        this.pointer = 0;
        this.module = null;
    };
    JPEGDecoderInput.prototype.inputPointer = function () {
        return this.module.wasm().jpegdecoderinput_input_ptr(this.pointer);
    };
    return JPEGDecoderInput;
}());
exports.default = JPEGDecoderInput;
//# sourceMappingURL=JPEGDecoderInput.js.map