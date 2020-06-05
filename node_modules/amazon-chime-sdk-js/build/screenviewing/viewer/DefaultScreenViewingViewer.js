"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultScreenViewingViewer = /** @class */ (function () {
    function DefaultScreenViewingViewer(deltaRenderer, logger) {
        this.deltaRenderer = deltaRenderer;
        this.logger = logger;
    }
    DefaultScreenViewingViewer.prototype.start = function (viewport) {
        this.logger.info("DefaultScreenViewingViewer: Starting");
        this.deltaRenderer.setViewport(viewport);
    };
    DefaultScreenViewingViewer.prototype.stop = function () {
        this.logger.info("DefaultScreenViewingViewer: Stopping");
        this.deltaRenderer.close();
    };
    DefaultScreenViewingViewer.prototype.resizeAndSync = function () {
        this.deltaRenderer.resizeAndSync();
    };
    return DefaultScreenViewingViewer;
}());
exports.default = DefaultScreenViewingViewer;
//# sourceMappingURL=DefaultScreenViewingViewer.js.map