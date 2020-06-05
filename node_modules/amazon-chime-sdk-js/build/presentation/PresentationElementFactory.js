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
var PresentationElementFactory = /** @class */ (function () {
    function PresentationElementFactory() {
    }
    PresentationElementFactory.createContent = function (element, window) {
        return {
            getPosition: function () {
                return element.style.position;
            },
            getDimensions: function () {
                return [
                    parseFloat(window.getComputedStyle(element).width.replace('px', '')),
                    parseFloat(window.getComputedStyle(element).height.replace('px', '')),
                ];
            },
            getTranslations: function () {
                return [
                    parseFloat(window.getComputedStyle(element).left.replace('px', '')),
                    parseFloat(window.getComputedStyle(element).top.replace('px', '')),
                ];
            },
            setPosition: function (position) {
                element.style.position = position;
            },
            setDimensions: function (_a) {
                var _b = __read(_a, 2), width = _b[0], height = _b[1];
                element.style.width = width + 'px';
                element.style.height = height + 'px';
            },
            setTranslations: function (_a) {
                var _b = __read(_a, 2), left = _b[0], top = _b[1];
                element.style.left = left + 'px';
                element.style.top = top + 'px';
            },
        };
    };
    PresentationElementFactory.createSource = function (imageDimensions) {
        return {
            getDimensions: function () {
                return [imageDimensions.imageWidthPixels, imageDimensions.imageHeightPixels];
            },
        };
    };
    PresentationElementFactory.createViewport = function (element, window) {
        return {
            getDimensions: function () {
                return [
                    parseFloat(window.getComputedStyle(element).width.replace('px', '')),
                    parseFloat(window.getComputedStyle(element).height.replace('px', '')),
                ];
            },
            setOverflow: function (overflow) {
                element.style.overflow = overflow;
            },
            setPosition: function (position) {
                element.style.position = position;
            },
        };
    };
    return PresentationElementFactory;
}());
exports.default = PresentationElementFactory;
//# sourceMappingURL=PresentationElementFactory.js.map