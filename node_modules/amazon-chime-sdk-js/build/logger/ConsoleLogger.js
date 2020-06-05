"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = require("./LogLevel");
/**
 * ConsoleLogger writes logs with console
 *
 * ```typescript
 *   // working with the ConsoleLogger
 *   const logger = new ConsoleLogger('demo'); //default level is LogLevel.WARN
 *   logger.info('info');
 *   logger.debug('debug');
 *   logger.warn('warn');
 *   logger.error('error');
 *
 *   // setting logging levels
 *   const logger = new ConsoleLogger('demo', LogLevel.INFO)
 *   logger.debug(debugFunc()); // this will not show up
 *   logger.setLogLevel(LogLevel.DEBUG)
 *   logger.debug(debugFunc()); // this will show up
 *
 * ```
 */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(name, level) {
        if (level === void 0) { level = LogLevel_1.default.WARN; }
        this.name = name;
        this.level = level;
    }
    ConsoleLogger.prototype.info = function (msg) {
        this.log(LogLevel_1.default.INFO, msg);
    };
    ConsoleLogger.prototype.warn = function (msg) {
        this.log(LogLevel_1.default.WARN, msg);
    };
    ConsoleLogger.prototype.error = function (msg) {
        this.log(LogLevel_1.default.ERROR, msg);
    };
    ConsoleLogger.prototype.debug = function (debugFunction) {
        if (LogLevel_1.default.DEBUG < this.level) {
            return;
        }
        this.log(LogLevel_1.default.DEBUG, debugFunction());
    };
    ConsoleLogger.prototype.setLogLevel = function (level) {
        this.level = level;
    };
    ConsoleLogger.prototype.getLogLevel = function () {
        return this.level;
    };
    ConsoleLogger.prototype.log = function (type, msg) {
        if (type < this.level) {
            return;
        }
        var timestamp = new Date().toISOString();
        var logMessage = timestamp + " [" + LogLevel_1.default[type] + "] " + this.name + " - " + msg;
        switch (type) {
            case LogLevel_1.default.ERROR:
                console.trace(logMessage);
                break;
            case LogLevel_1.default.WARN:
                console.warn(logMessage);
                break;
            case LogLevel_1.default.DEBUG:
                console.debug(logMessage.replace(/\\r\\n/g, '\n'));
                break;
            case LogLevel_1.default.INFO:
                console.info(logMessage);
                break;
        }
    };
    return ConsoleLogger;
}());
exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map