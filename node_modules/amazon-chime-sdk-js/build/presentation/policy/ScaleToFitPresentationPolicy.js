"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var PresentationBoxType_1 = require("../PresentationBoxType");
var ScaleToFitPresentationPolicy = /** @class */ (function () {
    function ScaleToFitPresentationPolicy() {
        this.calculate = function (state) {
            switch (state.boxType) {
                case PresentationBoxType_1.default.LETTER_BOX:
                    var height = state.viewportDimensions[0] / state.sourceAspectRatio;
                    return {
                        dimensions: [state.viewportDimensions[0], height],
                        translations: [0, state.viewportDimensions[1] / 2 - height / 2],
                    };
                case PresentationBoxType_1.default.PILLAR_BOX:
                    var width = state.viewportDimensions[1] * state.sourceAspectRatio;
                    return {
                        dimensions: [width, state.viewportDimensions[1]],
                        translations: [state.viewportDimensions[0] / 2 - width / 2, 0],
                    };
                case PresentationBoxType_1.default.NONE:
                    return {
                        dimensions: state.viewportDimensions,
                        translations: [0, 0],
                    };
            }
        };
    }
    return ScaleToFitPresentationPolicy;
}());
exports.default = ScaleToFitPresentationPolicy;
//# sourceMappingURL=ScaleToFitPresentationPolicy.js.map