"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DragType_1 = require("../../dragobserver/DragType");
var DefaultPresentation_1 = require("../../presentation/DefaultPresentation");
var PresentationPolicy_1 = require("../../presentation/policy/PresentationPolicy");
var ScaleToFitPresentationPolicy_1 = require("../../presentation/policy/ScaleToFitPresentationPolicy");
var PresentationElementFactory_1 = require("../../presentation/PresentationElementFactory");
var DefaultScreenViewingDeltaRenderer = /** @class */ (function () {
    function DefaultScreenViewingDeltaRenderer(jpegDecoderController, logger, window, resizeObserverFactory, dragObserverFactory) {
        var _this = this;
        this.jpegDecoderController = jpegDecoderController;
        this.logger = logger;
        this.window = window;
        this.dragObserverFactory = dragObserverFactory;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-member-accessibility
        this.syncBuffer = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-member-accessibility
        this.jpegDataArrays = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-member-accessibility
        this.hasRendered = [];
        this.presentation = new DefaultPresentation_1.default();
        this.policy = new ScaleToFitPresentationPolicy_1.default();
        this.viewport = null;
        this.content = null;
        this.dragObserver = null;
        this.resizeObserver = resizeObserverFactory.create(function () { return _this.updatePresentation && _this.updatePresentation(); });
    }
    DefaultScreenViewingDeltaRenderer.make2DArray = function (columns, rows) {
        var arr = [];
        for (var i = 0; i < rows; i++) {
            arr[i] = new Array(columns);
        }
        return arr;
    };
    DefaultScreenViewingDeltaRenderer.prototype.buildViewer = function (imageDimensions) {
        this.logger.info("DefaultScreenViewingDeltaRenderer: Building viewer with info " + JSON.stringify(imageDimensions));
        this.syncBuffer = DefaultScreenViewingDeltaRenderer.make2DArray(imageDimensions.screenWidth, imageDimensions.screenHeight);
        this.jpegDataArrays = DefaultScreenViewingDeltaRenderer.make2DArray(imageDimensions.screenWidth, imageDimensions.screenHeight);
        this.hasRendered = DefaultScreenViewingDeltaRenderer.make2DArray(imageDimensions.screenWidth, imageDimensions.screenHeight);
        this.jpegDecoderInstance = this.jpegDecoderController.createInstance(imageDimensions.macroBlock, imageDimensions.macroBlock);
        this.imageDimensions = imageDimensions;
    };
    DefaultScreenViewingDeltaRenderer.prototype.resizeAndSync = function () {
        if (!this.imageDimensions || !this.jpegDecoderInstance) {
            return;
        }
        var now = this.window.performance.now();
        if (!this.content ||
            now - this.lastResizeAndSyncTime < DefaultScreenViewingDeltaRenderer.SYNC_TIMEOUT_MS) {
            return;
        }
        this.logger.debug(function () { return "DefaultScreenViewingDeltaRenderer: sync'ing"; });
        if (this.content.width !== this.imageDimensions.imageWidthPixels ||
            this.content.height !== this.imageDimensions.imageHeightPixels) {
            this.content.width = this.imageDimensions.imageWidthPixels;
            this.content.height = this.imageDimensions.imageHeightPixels;
            this.updatePresentation && this.updatePresentation();
        }
        this.renderSync();
        this.lastResizeAndSyncTime = this.window.performance.now();
    };
    DefaultScreenViewingDeltaRenderer.prototype.renderSync = function () {
        this.logger.debug(function () { return "DefaultScreenViewingDeltaRenderer: Rendering sync"; });
        var context = this.getContext();
        if (!context) {
            return;
        }
        var _loop_1 = function (row) {
            var _loop_2 = function (col) {
                var dx = col * this_1.imageDimensions.macroBlock;
                var dy = row * this_1.imageDimensions.macroBlock;
                var rendered = this_1.hasRendered[row][col];
                var jpegDataArray = this_1.jpegDataArrays[row][col];
                if (!jpegDataArray || rendered) {
                    return "continue";
                }
                var imageData = this_1.getImageData(jpegDataArray);
                if (!imageData) {
                    return "continue";
                }
                context.putImageData(imageData, dx, dy);
                this_1.hasRendered[row][col] = true;
                this_1.logger.debug(function () { return "rendered row=" + row + " col=" + col; });
            };
            for (var col = 0; col < this_1.imageDimensions.screenWidth; col++) {
                _loop_2(col);
            }
        };
        var this_1 = this;
        for (var row = 0; row < this.imageDimensions.screenHeight; row++) {
            _loop_1(row);
        }
    };
    DefaultScreenViewingDeltaRenderer.prototype.getImageData = function (jpegDataArray) {
        try {
            return this.jpegDecoderInstance.decodeToImageData(jpegDataArray);
        }
        catch (e) {
            this.logger.error(e);
        }
    };
    DefaultScreenViewingDeltaRenderer.prototype.getContext = function () {
        return this.content && this.content.getContext('2d');
    };
    DefaultScreenViewingDeltaRenderer.prototype.close = function () {
        this.logger.info("DefaultScreenViewingDeltaRenderer: Closing");
        this.getContext() && this.getContext().clearRect(0, 0, this.content.width, this.content.height);
        this.viewport && this.viewport.removeChild(this.content);
        this.dragObserver && this.dragObserver.unobserve();
        this.content = null;
        this.viewport = null;
        this.dragObserver = null;
    };
    DefaultScreenViewingDeltaRenderer.prototype.setViewport = function (viewport) {
        var _this = this;
        if (this.viewport || this.content) {
            this.logger.warn('Current view must be closed before starting anew');
            return;
        }
        this.viewport = viewport;
        this.content = this.window.document.createElement('canvas');
        this.viewport.prepend(this.content);
        this.resizeObserver.observe(viewport);
        this.dragObserver = this.dragObserverFactory(this.window, function (dragEvent) {
            dragEvent.type !== DragType_1.default.BEGIN &&
                _this.updatePresentation &&
                _this.updatePresentation({
                    type: PresentationPolicy_1.ZoomType.NONE,
                }, dragEvent);
        }, viewport);
        if (this.imageDimensions) {
            this.hasRendered = DefaultScreenViewingDeltaRenderer.make2DArray(this.imageDimensions.screenWidth, this.imageDimensions.screenHeight);
        }
    };
    DefaultScreenViewingDeltaRenderer.prototype.hideViewport = function () {
        if (this.content) {
            this.content.style.display = 'none';
        }
    };
    DefaultScreenViewingDeltaRenderer.prototype.revealViewport = function () {
        if (this.content) {
            this.content.style.display = 'block';
        }
    };
    DefaultScreenViewingDeltaRenderer.prototype.changePresentationPolicy = function (policy) {
        this.policy = policy;
        this.updatePresentation();
    };
    DefaultScreenViewingDeltaRenderer.prototype.zoomRelative = function (relativeZoomFactor) {
        this.updatePresentation({
            type: PresentationPolicy_1.ZoomType.ZOOM,
            relativeFactor: relativeZoomFactor,
        });
    };
    DefaultScreenViewingDeltaRenderer.prototype.zoomAbsolute = function (absoluteZoomFactor) {
        this.updatePresentation({
            type: PresentationPolicy_1.ZoomType.ZOOM,
            absoluteFactor: absoluteZoomFactor,
        });
    };
    DefaultScreenViewingDeltaRenderer.prototype.zoomReset = function () {
        this.updatePresentation({
            type: PresentationPolicy_1.ZoomType.RESET,
        });
    };
    DefaultScreenViewingDeltaRenderer.prototype.updatePresentation = function (zoomEvent, dragEvent) {
        this.imageDimensions &&
            this.viewport &&
            this.content &&
            this.presentation.present(PresentationElementFactory_1.default.createSource(this.imageDimensions), PresentationElementFactory_1.default.createViewport(this.viewport, this.window), PresentationElementFactory_1.default.createContent(this.content, this.window), this.policy, zoomEvent, dragEvent);
    };
    DefaultScreenViewingDeltaRenderer.SYNC_TIMEOUT_MS = 500;
    return DefaultScreenViewingDeltaRenderer;
}());
exports.default = DefaultScreenViewingDeltaRenderer;
//# sourceMappingURL=DefaultScreenViewingDeltaRenderer.js.map