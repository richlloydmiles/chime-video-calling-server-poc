"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var None_1 = require("./None");
var Some_1 = require("./Some");
var Maybe = /** @class */ (function () {
    function Maybe() {
    }
    Maybe.of = function (value) {
        return value === undefined || value === null ? None_1.default.of() : Some_1.default.of(value);
    };
    return Maybe;
}());
exports.default = Maybe;
//# sourceMappingURL=Maybe.js.map