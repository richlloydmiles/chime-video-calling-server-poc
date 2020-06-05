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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTask_1 = require("./BaseTask");
var TaskStatus_1 = require("./TaskStatus");
/**
 * [[SerialGroupTask]] runs a set of tasks in series. When canceled, it stops
 * any currently running task and runs no further tasks in the group.
 */
var SerialGroupTask = /** @class */ (function (_super) {
    __extends(SerialGroupTask, _super);
    function SerialGroupTask(logger, taskName, tasksToRunSerially) {
        var e_1, _a;
        var _this = _super.call(this, logger) || this;
        _this.taskName = taskName;
        _this.tasksToRunSerially = tasksToRunSerially;
        _this.currentTask = null;
        try {
            for (var tasksToRunSerially_1 = __values(tasksToRunSerially), tasksToRunSerially_1_1 = tasksToRunSerially_1.next(); !tasksToRunSerially_1_1.done; tasksToRunSerially_1_1 = tasksToRunSerially_1.next()) {
                var task = tasksToRunSerially_1_1.value;
                task.setParent(_this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tasksToRunSerially_1_1 && !tasksToRunSerially_1_1.done && (_a = tasksToRunSerially_1.return)) _a.call(tasksToRunSerially_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    SerialGroupTask.prototype.cancel = function () {
        if (this.currentTask) {
            this.logger.info("canceling serial group task " + this.name() + " subtask " + this.currentTask.name());
            this.currentTask.cancel();
        }
    };
    SerialGroupTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, task, err_1, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, 9, 10]);
                        _a = __values(this.tasksToRunSerially), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 7];
                        task = _b.value;
                        if (this.getStatus() === TaskStatus_1.default.CANCELED) {
                            this.logAndThrow("serial group task " + this.name() + " was canceled");
                        }
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, 5, 6]);
                        this.logger.info("serial group task " + this.name() + " running subtask " + task.name());
                        this.currentTask = task;
                        return [4 /*yield*/, task.run()];
                    case 3:
                        _d.sent();
                        this.logger.info("serial group task " + this.name() + " completed subtask " + task.name());
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _d.sent();
                        this.logAndThrow("serial group task " + this.name() + " was canceled due to subtask " +
                            (this.currentTask.name() + " error: " + err_1.message));
                        return [3 /*break*/, 6];
                    case 5:
                        this.currentTask = null;
                        return [7 /*endfinally*/];
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        this.logger.info("serial group task " + this.name() + " completed");
                        return [2 /*return*/];
                }
            });
        });
    };
    return SerialGroupTask;
}(BaseTask_1.default));
exports.default = SerialGroupTask;
//# sourceMappingURL=SerialGroupTask.js.map