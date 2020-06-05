"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var resize_observer_1 = require("resize-observer");
var DefaultResizeObserverAdapter_1 = require("./DefaultResizeObserverAdapter");
var ResizeObserverAdapterFactory = /** @class */ (function () {
    function ResizeObserverAdapterFactory(provider) {
        this.provider = provider;
    }
    ResizeObserverAdapterFactory.prototype.create = function (callback) {
        if (this.provider) {
            return this.provider();
        }
        return new DefaultResizeObserverAdapter_1.default(new resize_observer_1.ResizeObserver(callback));
    };
    return ResizeObserverAdapterFactory;
}());
exports.default = ResizeObserverAdapterFactory;
//# sourceMappingURL=ResizeObserverAdapterFactory.js.map