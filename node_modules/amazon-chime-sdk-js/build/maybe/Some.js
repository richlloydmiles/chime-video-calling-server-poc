"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("./Maybe");
var Some = /** @class */ (function () {
    function Some(value) {
        this.value = value;
        this.isSome = true;
        this.isNone = false;
    }
    Some.prototype.map = function (f) {
        return Maybe_1.default.of(f(this.value));
    };
    Some.prototype.flatMap = function (f) {
        return f(this.value);
    };
    Some.prototype.get = function () {
        return this.value;
    };
    Some.prototype.getOrElse = function (_value) {
        return this.value;
    };
    Some.prototype.defaulting = function (value) {
        return Maybe_1.default.of(this.getOrElse(value));
    };
    Some.of = function (value) {
        if (value === null || value === undefined) {
            throw new Error('value is ${value}');
        }
        return new Some(value);
    };
    return Some;
}());
exports.default = Some;
//# sourceMappingURL=Some.js.map