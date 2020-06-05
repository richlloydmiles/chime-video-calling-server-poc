"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DragType_1 = require("../dragobserver/DragType");
var PresentationBoxType_1 = require("./PresentationBoxType");
var CSS_OVERFLOW_HIDDEN = 'hidden';
var CSS_POSITION_ABSOLUTE = 'absolute';
var CSS_POSITION_RELATIVE = 'relative';
var DefaultPresentation = /** @class */ (function () {
    function DefaultPresentation() {
    }
    DefaultPresentation.prototype.present = function (source, viewport, content, policy, zoomEvent, dragEvent) {
        var viewportAspectRatio = viewport.getDimensions()[0] / viewport.getDimensions()[1];
        var sourceAspectRatio = source.getDimensions()[0] / source.getDimensions()[1];
        var contentPlacement = {
            dimensions: content.getDimensions(),
            translations: content.getTranslations(),
        };
        var state = {
            contentPlacement: contentPlacement,
            sourceDimensions: source.getDimensions(),
            sourceAspectRatio: sourceAspectRatio,
            viewportDimensions: viewport.getDimensions(),
            viewportAspectRatio: viewportAspectRatio,
            scale: content.getDimensions()[0] / source.getDimensions()[0],
            boxType: DefaultPresentation.boxType(sourceAspectRatio, viewportAspectRatio),
            focus: {
                normalizedContentFocus: DefaultPresentation.contentFocus(contentPlacement, dragEvent),
                normalizedViewportFocus: DefaultPresentation.viewportFocus(viewport.getDimensions(), dragEvent),
            },
        };
        var newPlacement = policy.calculate(state, {
            zoom: zoomEvent,
            drag: dragEvent,
        });
        viewport.setPosition(CSS_POSITION_RELATIVE);
        viewport.setOverflow(CSS_OVERFLOW_HIDDEN);
        content.setPosition(CSS_POSITION_ABSOLUTE);
        content.setDimensions(newPlacement.dimensions);
        content.setTranslations(newPlacement.translations);
    };
    DefaultPresentation.cssPixels = function (value) {
        return value + "px";
    };
    DefaultPresentation.boxType = function (sourceAspectRatio, viewportAspectRatio) {
        if (sourceAspectRatio > viewportAspectRatio) {
            return PresentationBoxType_1.default.LETTER_BOX;
        }
        if (sourceAspectRatio < viewportAspectRatio) {
            return PresentationBoxType_1.default.PILLAR_BOX;
        }
        return PresentationBoxType_1.default.NONE;
    };
    DefaultPresentation.contentFocus = function (contentPlacement, dragEvent) {
        if (!dragEvent || dragEvent.type === DragType_1.default.END) {
            return [0.5, 0.5];
        }
        if (dragEvent.type === DragType_1.default.BEGIN) {
            return [
                (dragEvent.coords[0] - contentPlacement.translations[0]) / contentPlacement.dimensions[0],
                (dragEvent.coords[1] - contentPlacement.translations[1]) / contentPlacement.dimensions[1],
            ];
        }
        return [
            (dragEvent.last.coords[0] - contentPlacement.translations[0]) /
                contentPlacement.dimensions[0],
            (dragEvent.last.coords[1] - contentPlacement.translations[1]) /
                contentPlacement.dimensions[1],
        ];
    };
    DefaultPresentation.viewportFocus = function (viewportDims, dragEvent) {
        if (!dragEvent || dragEvent.type === DragType_1.default.END) {
            return [0.5, 0.5];
        }
        return [dragEvent.coords[0] / viewportDims[0], dragEvent.coords[1] / viewportDims[1]];
    };
    return DefaultPresentation;
}());
exports.default = DefaultPresentation;
//# sourceMappingURL=DefaultPresentation.js.map