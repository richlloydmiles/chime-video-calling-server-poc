"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var NoOpVideoElementFactory = /** @class */ (function () {
    function NoOpVideoElementFactory() {
    }
    NoOpVideoElementFactory.prototype.create = function () {
        var element = {
            clientWidth: 400,
            clientHeight: 300,
            width: 400,
            height: 300,
            videoWidth: 400,
            videoHeight: 300,
            style: {
                transform: '',
            },
            hasAttribute: function () {
                return false;
            },
            removeAttribute: function () { },
            setAttribute: function () { },
            srcObject: false,
            pause: function () { },
            play: function () {
                return Promise.resolve();
            },
        };
        // @ts-ignore
        return element;
    };
    return NoOpVideoElementFactory;
}());
exports.default = NoOpVideoElementFactory;
//# sourceMappingURL=NoOpVideoElementFactory.js.map