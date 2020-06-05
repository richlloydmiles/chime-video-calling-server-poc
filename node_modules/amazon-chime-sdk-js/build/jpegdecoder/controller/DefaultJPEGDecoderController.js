"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultJPEGDecoderInstance_1 = require("../instance/DefaultJPEGDecoderInstance");
var JPEGDecoderInput_1 = require("../webassembly/JPEGDecoderInput");
var JPEGDecoderModule_1 = require("../webassembly/JPEGDecoderModule");
var DefaultJPEGDecoderController = /** @class */ (function () {
    function DefaultJPEGDecoderController(logger, maxInputSize) {
        this.logger = logger;
        this.maxInputSize = maxInputSize;
        this.decoderInput = null;
        this.jpegDecoderModule = null;
    }
    DefaultJPEGDecoderController.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info('loading JPEGDecoder WebAssembly module');
                        this.jpegDecoderModule = new JPEGDecoderModule_1.default(this.logger);
                        return [4 /*yield*/, this.jpegDecoderModule.init()];
                    case 1:
                        _a.sent();
                        this.logger.info('loaded JPEGDecoder WebAssembly module');
                        this.decoderInput = new JPEGDecoderInput_1.default(this.jpegDecoderModule, this.maxInputSize);
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultJPEGDecoderController.prototype.free = function () {
        this.decoderInput.free();
        this.jpegDecoderModule.free();
        this.decoderInput = null;
        this.jpegDecoderModule = null;
    };
    DefaultJPEGDecoderController.prototype.createInstance = function (width, height) {
        return new DefaultJPEGDecoderInstance_1.default(this.jpegDecoderModule, this, width, height);
    };
    DefaultJPEGDecoderController.prototype.newInternalInputView = function () {
        return new Uint8Array(this.jpegDecoderModule.wasm().memory.buffer, this.decoderInput.inputPointer(), this.maxInputSize);
    };
    DefaultJPEGDecoderController.prototype.newInternalOutputView = function (pointer, length) {
        return new Uint8ClampedArray(this.jpegDecoderModule.wasm().memory.buffer, pointer, length);
    };
    DefaultJPEGDecoderController.prototype.inputPointer = function () {
        return this.decoderInput.inputPointer();
    };
    DefaultJPEGDecoderController.prototype.isInputTooLarge = function (inputLength) {
        return inputLength > this.maxInputSize;
    };
    return DefaultJPEGDecoderController;
}());
exports.default = DefaultJPEGDecoderController;
//# sourceMappingURL=DefaultJPEGDecoderController.js.map