"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DevicePixelRatioWindowSource = /** @class */ (function () {
    function DevicePixelRatioWindowSource() {
    }
    DevicePixelRatioWindowSource.prototype.devicePixelRatio = function () {
        if (typeof window === 'undefined' || !window || !window.devicePixelRatio) {
            return 1;
        }
        return window.devicePixelRatio;
    };
    return DevicePixelRatioWindowSource;
}());
exports.default = DevicePixelRatioWindowSource;
//# sourceMappingURL=DevicePixelRatioWindowSource.js.map