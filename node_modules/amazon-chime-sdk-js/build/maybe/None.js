"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("./Maybe");
var None = /** @class */ (function () {
    function None() {
        this.isSome = false;
        this.isNone = true;
    }
    None.prototype.get = function () {
        throw new Error('value is null');
    };
    None.prototype.getOrElse = function (value) {
        return value;
    };
    None.prototype.map = function (_f) {
        return new None();
    };
    None.prototype.flatMap = function (_f) {
        return new None();
    };
    None.prototype.defaulting = function (value) {
        return Maybe_1.default.of(this.getOrElse(value));
    };
    None.of = function () {
        return new None();
    };
    return None;
}());
exports.default = None;
//# sourceMappingURL=None.js.map