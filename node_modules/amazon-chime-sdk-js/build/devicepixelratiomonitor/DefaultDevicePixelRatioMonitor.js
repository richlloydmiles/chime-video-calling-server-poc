"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultDevicePixelRatioMonitor = /** @class */ (function () {
    function DefaultDevicePixelRatioMonitor(devicePixelRatioSource, logger) {
        var _this = this;
        this.devicePixelRatioSource = devicePixelRatioSource;
        this.mediaQueryListener = function () {
            _this.observerQueue.forEach(function (tileObserver) {
                tileObserver.devicePixelRatioChanged(_this.devicePixelRatioSource.devicePixelRatio());
            });
        };
        this.observerQueue = new Set();
        if (typeof window !== 'undefined') {
            var mediaQueryList = matchMedia("(resolution: " + this.devicePixelRatioSource.devicePixelRatio() + "dppx)");
            if (typeof mediaQueryList.addEventListener === 'function') {
                mediaQueryList.addEventListener('change', this.mediaQueryListener);
            }
            else if (typeof mediaQueryList.addListener === 'function') {
                mediaQueryList.addListener(this.mediaQueryListener);
            }
            else {
                logger.warn('ignoring DefaultDevicePixelRatioMonitor');
            }
        }
    }
    DefaultDevicePixelRatioMonitor.prototype.registerObserver = function (observer) {
        this.observerQueue.add(observer);
        observer.devicePixelRatioChanged(this.devicePixelRatioSource.devicePixelRatio());
    };
    DefaultDevicePixelRatioMonitor.prototype.removeObserver = function (observer) {
        this.observerQueue.delete(observer);
    };
    return DefaultDevicePixelRatioMonitor;
}());
exports.default = DefaultDevicePixelRatioMonitor;
//# sourceMappingURL=DefaultDevicePixelRatioMonitor.js.map