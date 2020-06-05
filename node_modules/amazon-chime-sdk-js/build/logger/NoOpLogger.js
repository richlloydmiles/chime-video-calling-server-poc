"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("./LogLevel");
/**
 * [[NoOpLogger]] does not log any message.
 */
var NoOpLogger = /** @class */ (function () {
    function NoOpLogger(level) {
        if (level === void 0) { level = LogLevel_1.default.OFF; }
        this.level = level;
    }
    NoOpLogger.prototype.info = function (_msg) { };
    NoOpLogger.prototype.warn = function (_msg) { };
    NoOpLogger.prototype.error = function (_msg) { };
    NoOpLogger.prototype.debug = function (debugFunction) {
        if (LogLevel_1.default.DEBUG < this.level) {
            return;
        }
        debugFunction();
    };
    NoOpLogger.prototype.setLogLevel = function (level) {
        this.level = level;
    };
    NoOpLogger.prototype.getLogLevel = function () {
        return this.level;
    };
    return NoOpLogger;
}());
exports.default = NoOpLogger;
//# sourceMappingURL=NoOpLogger.js.map