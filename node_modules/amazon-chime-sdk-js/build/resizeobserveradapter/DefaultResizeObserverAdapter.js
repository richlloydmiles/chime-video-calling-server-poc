"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultResizeObserverAdapter = /** @class */ (function () {
    function DefaultResizeObserverAdapter(resizeObserver) {
        this.resizeObserver = resizeObserver;
    }
    DefaultResizeObserverAdapter.prototype.observe = function (target) {
        this.resizeObserver.observe(target);
    };
    DefaultResizeObserverAdapter.prototype.unobserve = function (target) {
        this.resizeObserver.unobserve(target);
    };
    return DefaultResizeObserverAdapter;
}());
exports.default = DefaultResizeObserverAdapter;
//# sourceMappingURL=DefaultResizeObserverAdapter.js.map