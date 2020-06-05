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
var BaseTask_1 = require("./BaseTask");
var InitializeDefaultJPEGDecoderControllerTask = /** @class */ (function (_super) {
    __extends(InitializeDefaultJPEGDecoderControllerTask, _super);
    function InitializeDefaultJPEGDecoderControllerTask(defaultJPEGDecoderController, logger) {
        var _this = _super.call(this, logger) || this;
        _this.defaultJPEGDecoderController = defaultJPEGDecoderController;
        _this.logger = logger;
        return _this;
    }
    InitializeDefaultJPEGDecoderControllerTask.prototype.run = function () {
        return this.defaultJPEGDecoderController.init();
    };
    return InitializeDefaultJPEGDecoderControllerTask;
}(BaseTask_1.default));
exports.default = InitializeDefaultJPEGDecoderControllerTask;
//# sourceMappingURL=InitializeDefaultJPEGDecoderControllerTask.js.map