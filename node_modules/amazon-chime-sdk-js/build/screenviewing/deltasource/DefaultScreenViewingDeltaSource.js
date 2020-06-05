"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultScreenViewingDeltaSource = /** @class */ (function () {
    function DefaultScreenViewingDeltaSource(deltaRenderer, logger) {
        this.deltaRenderer = deltaRenderer;
        this.logger = logger;
    }
    DefaultScreenViewingDeltaSource.prototype.flushSyncBuffer = function () {
        this.logger.debug(function () { return "DefaultScreenViewingDeltaSource: Flushing sync buffer"; });
        for (var dy = 0; dy < this.deltaRenderer.imageDimensions.screenHeight; dy++) {
            for (var dx = 0; dx < this.deltaRenderer.imageDimensions.screenWidth; dx++) {
                if (!this.deltaRenderer.syncBuffer[dy][dx]) {
                    continue;
                }
                this.deltaRenderer.jpegDataArrays[dy][dx] = this.deltaRenderer.syncBuffer[dy][dx];
                this.deltaRenderer.syncBuffer[dy][dx] = null;
                this.deltaRenderer.hasRendered[dy][dx] = false;
            }
        }
    };
    return DefaultScreenViewingDeltaSource;
}());
exports.default = DefaultScreenViewingDeltaSource;
//# sourceMappingURL=DefaultScreenViewingDeltaSource.js.map