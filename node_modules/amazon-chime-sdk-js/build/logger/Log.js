"use strict";
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log(sequenceNumber, message, timestampMs, logLevel) {
        this.sequenceNumber = sequenceNumber;
        this.message = message;
        this.timestampMs = timestampMs;
        this.logLevel = logLevel;
    }
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=Log.js.map