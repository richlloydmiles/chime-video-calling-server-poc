"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var NoOpTask = /** @class */ (function () {
    function NoOpTask() {
    }
    NoOpTask.prototype.cancel = function () { };
    NoOpTask.prototype.name = function () {
        return 'NoOpTask';
    };
    NoOpTask.prototype.run = function () {
        return;
    };
    NoOpTask.prototype.setParent = function (_parentTask) { };
    return NoOpTask;
}());
exports.default = NoOpTask;
//# sourceMappingURL=NoOpTask.js.map