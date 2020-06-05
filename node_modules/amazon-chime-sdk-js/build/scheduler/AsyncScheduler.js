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
var TimeoutScheduler_1 = require("./TimeoutScheduler");
/**
 * [[AsyncScheduler]] enqueues the callback for the soonest available run of the
 * event loop.
 */
var AsyncScheduler = /** @class */ (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        return _super.call(this, 0) || this;
    }
    return AsyncScheduler;
}(TimeoutScheduler_1.default));
exports.default = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map