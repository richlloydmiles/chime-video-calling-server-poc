"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DragType_1 = require("../../dragobserver/DragType");
var PresentationPolicy_1 = require("./PresentationPolicy");
var ScaleToFitPresentationPolicy_1 = require("./ScaleToFitPresentationPolicy");
var DragAndZoomPresentationPolicy = /** @class */ (function () {
    function DragAndZoomPresentationPolicy() {
        this.calculate = function (state, updateEvent) {
            var newContentDimensions = DragAndZoomPresentationPolicy.getNewContentDimensions(state.contentPlacement.dimensions, state.sourceDimensions, updateEvent);
            if (DragAndZoomPresentationPolicy.shouldScaleToFit(newContentDimensions, state.viewportDimensions, updateEvent)) {
                return new ScaleToFitPresentationPolicy_1.default().calculate(state);
            }
            if (updateEvent && updateEvent.drag && updateEvent.drag.type !== DragType_1.default.END) {
                // A drag event has occurred, the content placement's translations are dependent on the focus
                return {
                    dimensions: newContentDimensions,
                    translations: [
                        state.focus.normalizedViewportFocus[0] * state.viewportDimensions[0] -
                            state.focus.normalizedContentFocus[0] * newContentDimensions[0],
                        state.focus.normalizedViewportFocus[1] * state.viewportDimensions[1] -
                            state.focus.normalizedContentFocus[1] * newContentDimensions[1],
                    ],
                };
            }
            // Dragging just ended or there's no dragging, center and remove whitespace
            return {
                dimensions: newContentDimensions,
                translations: [
                    DragAndZoomPresentationPolicy.centerOrRemoveWhitespaceDim(newContentDimensions[0], state.contentPlacement.translations[0], state.viewportDimensions[0]),
                    DragAndZoomPresentationPolicy.centerOrRemoveWhitespaceDim(newContentDimensions[1], state.contentPlacement.translations[1], state.viewportDimensions[1]),
                ],
            };
        };
    }
    DragAndZoomPresentationPolicy.getNewContentDimensions = function (currentContentDims, sourceDims, updateEvent) {
        // If a zoom event is present, apply the zoom factor
        if (updateEvent && updateEvent.zoom && updateEvent.zoom.relativeFactor) {
            return currentContentDims.map(function (d) { return d * updateEvent.zoom.relativeFactor; });
        }
        if (updateEvent && updateEvent.zoom && updateEvent.zoom.absoluteFactor) {
            return sourceDims.map(function (d) { return d * updateEvent.zoom.absoluteFactor; });
        }
        return currentContentDims;
    };
    DragAndZoomPresentationPolicy.centerOrRemoveWhitespaceDim = function (contentDim, translation, viewportDim) {
        if (contentDim <= viewportDim) {
            // The content placement's dimension is smaller than the viewport's, center it
            return viewportDim / 2 - contentDim / 2;
        }
        if (translation > 0) {
            // The content placement has a positive translation, make it flush against that border
            return 0;
        }
        var right = translation + contentDim;
        if (right < viewportDim) {
            // The content placement has a positive translation on the other side, make it flush against that border
            return viewportDim - contentDim;
        }
        // The content is zoomed such that there's no whitespace, retain the current translation
        return translation;
    };
    DragAndZoomPresentationPolicy.shouldScaleToFit = function (_a, _b, updateEvent) {
        var _c = __read(_a, 2), newContentWidth = _c[0], newContentHeight = _c[1];
        var _d = __read(_b, 2), viewportWidth = _d[0], viewportHeight = _d[1];
        // Should scale to fit if a reset zoom event occurred or, after applying a zoom event, the content width and height
        // are smaller than the viewport width and height
        return ((updateEvent && updateEvent.zoom && updateEvent.zoom.type === PresentationPolicy_1.ZoomType.RESET) ||
            (newContentWidth <= viewportWidth && newContentHeight <= viewportHeight));
    };
    return DragAndZoomPresentationPolicy;
}());
exports.default = DragAndZoomPresentationPolicy;
//# sourceMappingURL=DragAndZoomPresentationPolicy.js.map