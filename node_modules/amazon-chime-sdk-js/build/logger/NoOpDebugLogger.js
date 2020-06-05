"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("./LogLevel");
var NoOpLogger_1 = require("./NoOpLogger");
/**
 * [[NoOpDebugLogger]] does not log any message but does call
 * debug functions by default.
 */
var NoOpDebugLogger = /** @class */ (function (_super) {
    __extends(NoOpDebugLogger, _super);
    function NoOpDebugLogger() {
        return _super.call(this, LogLevel_1.default.DEBUG) || this;
    }
    return NoOpDebugLogger;
}(NoOpLogger_1.default));
exports.default = NoOpDebugLogger;
//# sourceMappingURL=NoOpDebugLogger.js.map