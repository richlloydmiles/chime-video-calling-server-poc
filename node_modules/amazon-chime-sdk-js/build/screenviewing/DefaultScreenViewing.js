"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DragAndZoomPresentationPolicy_1 = require("../presentation/policy/DragAndZoomPresentationPolicy");
var ScaleToFitPresentationPolicy_1 = require("../presentation/policy/ScaleToFitPresentationPolicy");
var DefaultScreenViewing = /** @class */ (function () {
    function DefaultScreenViewing(componentContext) {
        this.componentContext = componentContext;
    }
    /**
     * Opens the screen signaling connection
     * @param request
     */
    DefaultScreenViewing.prototype.open = function (request) {
        var _this = this;
        this.request = request;
        return this.componentContext.jpegDecoderController
            .init()
            .then(function () { return _this.componentContext.signalingSession.open(request); })
            .then(function () { });
    };
    /**
     * Stops screen viewing and closes the screen signaling connection
     */
    DefaultScreenViewing.prototype.close = function () {
        var _this = this;
        return this.stop()
            .catch(function () { })
            .finally(function () {
            return _this.componentContext.signalingSession.close();
        });
    };
    /**
     * Initializes the viewport and opens the screen viewing data connection
     * @param canvasContainer
     */
    DefaultScreenViewing.prototype.start = function (canvasContainer) {
        this.componentContext.viewer.start(canvasContainer);
        return this.componentContext.viewingSession.openConnection(this.request).then(function () { });
    };
    /**
     * Tears down the viewport and closes the screen viewing data connection
     */
    DefaultScreenViewing.prototype.stop = function () {
        this.componentContext.viewer.stop();
        return this.componentContext.viewingSession.closeConnection();
    };
    DefaultScreenViewing.prototype.presentScaleToFit = function () {
        this.componentContext.deltaRenderer.changePresentationPolicy(new ScaleToFitPresentationPolicy_1.default());
    };
    DefaultScreenViewing.prototype.presentDragAndZoom = function () {
        this.componentContext.deltaRenderer.changePresentationPolicy(new DragAndZoomPresentationPolicy_1.default());
    };
    DefaultScreenViewing.prototype.zoomIn = function (relativeZoomFactor) {
        this.componentContext.deltaRenderer.zoomRelative(relativeZoomFactor || 1.25);
    };
    DefaultScreenViewing.prototype.zoomOut = function (relativeZoomFactor) {
        this.componentContext.deltaRenderer.zoomRelative(relativeZoomFactor || 0.8);
    };
    DefaultScreenViewing.prototype.zoom = function (absoluteZoomFactor) {
        this.componentContext.deltaRenderer.zoomAbsolute(absoluteZoomFactor);
    };
    DefaultScreenViewing.prototype.zoomReset = function () {
        this.componentContext.deltaRenderer.zoomReset();
    };
    DefaultScreenViewing.prototype.registerObserver = function (observer) {
        this.componentContext.signalingSession.registerObserver(observer);
    };
    DefaultScreenViewing.prototype.unregisterObserver = function (observer) {
        this.componentContext.signalingSession.unregisterObserver(observer);
    };
    return DefaultScreenViewing;
}());
exports.default = DefaultScreenViewing;
//# sourceMappingURL=DefaultScreenViewing.js.map