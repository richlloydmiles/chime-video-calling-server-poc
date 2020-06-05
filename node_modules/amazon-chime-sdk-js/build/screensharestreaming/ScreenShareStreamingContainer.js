"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenShareStreamFactory_1 = require("./ScreenShareStreamFactory");
var ScreenShareStreamingContainer = /** @class */ (function () {
    function ScreenShareStreamingContainer() {
        this.memo = null;
    }
    ScreenShareStreamingContainer.prototype.screenShareStreamingFactory = function () {
        this.memo = this.memo || new ScreenShareStreamFactory_1.default();
        return this.memo;
    };
    return ScreenShareStreamingContainer;
}());
exports.default = ScreenShareStreamingContainer;
//# sourceMappingURL=ScreenShareStreamingContainer.js.map