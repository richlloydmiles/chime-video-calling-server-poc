"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultVideoCaptureAndEncodeParameter = /** @class */ (function () {
    function DefaultVideoCaptureAndEncodeParameter(cameraWidth, cameraHeight, cameraFrameRate, maxEncodeBitrateKbps, isSimulcast) {
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
        this.cameraFrameRate = cameraFrameRate;
        this.maxEncodeBitrateKbps = maxEncodeBitrateKbps;
        this.isSimulcast = isSimulcast;
    }
    DefaultVideoCaptureAndEncodeParameter.prototype.equal = function (other) {
        var checkForEqual = other.captureWidth() === this.cameraWidth &&
            other.captureHeight() === this.cameraHeight &&
            other.captureFrameRate() === this.cameraFrameRate &&
            other.encodeBitrates().length === this.encodeBitrates().length &&
            other.encodeWidths().length === this.encodeWidths().length &&
            other.encodeHeights().length === this.encodeHeights().length;
        if (checkForEqual) {
            for (var i = 0; i < other.encodeWidths().length; i++) {
                if (other.encodeWidths()[i] !== this.encodeWidths()[i] ||
                    other.encodeHeights()[i] !== this.encodeHeights()[i] ||
                    other.encodeBitrates()[i] !== this.encodeBitrates()[i]) {
                    checkForEqual = false;
                    return checkForEqual;
                }
            }
        }
        return checkForEqual;
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.clone = function () {
        return new DefaultVideoCaptureAndEncodeParameter(this.cameraWidth, this.cameraHeight, this.cameraFrameRate, this.maxEncodeBitrateKbps, this.isSimulcast);
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.captureWidth = function () {
        return this.cameraWidth;
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.captureHeight = function () {
        return this.cameraHeight;
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.captureFrameRate = function () {
        return this.cameraFrameRate;
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.encodeBitrates = function () {
        // TODO: add simulcast layer
        return [this.maxEncodeBitrateKbps];
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.encodeWidths = function () {
        return [this.cameraWidth];
    };
    DefaultVideoCaptureAndEncodeParameter.prototype.encodeHeights = function () {
        return [this.cameraHeight];
    };
    return DefaultVideoCaptureAndEncodeParameter;
}());
exports.default = DefaultVideoCaptureAndEncodeParameter;
//# sourceMappingURL=DefaultVideoCaptureAndEncodeParameter.js.map