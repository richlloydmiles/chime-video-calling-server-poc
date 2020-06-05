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
/**
 * [[ParallelGroupTask]] runs a set of tasks in parallel. When canceled, it
 * stops any currently running tasks.
 */
var ParallelGroupTask = /** @class */ (function (_super) {
    __extends(ParallelGroupTask, _super);
    function ParallelGroupTask(logger, taskName, tasksToRunParallel) {
        var e_1, _a;
        var _this = _super.call(this, logger) || this;
        _this.taskName = taskName;
        _this.tasksToRunParallel = tasksToRunParallel;
        try {
            for (var tasksToRunParallel_1 = __values(tasksToRunParallel), tasksToRunParallel_1_1 = tasksToRunParallel_1.next(); !tasksToRunParallel_1_1.done; tasksToRunParallel_1_1 = tasksToRunParallel_1.next()) {
                var task = tasksToRunParallel_1_1.value;
                task.setParent(_this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tasksToRunParallel_1_1 && !tasksToRunParallel_1_1.done && (_a = tasksToRunParallel_1.return)) _a.call(tasksToRunParallel_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    ParallelGroupTask.prototype.cancel = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.tasksToRunParallel), _c = _b.next(); !_c.done; _c = _b.next()) {
                var task = _c.value;
                this.logger.info("canceling parallel group task " + this.name() + " subtask " + task.name());
                task.cancel();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ParallelGroupTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskResults, _a, _b, task, failures, i, err_1, failureMessage;
            var e_3, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        taskResults = [];
                        try {
                            for (_a = __values(this.tasksToRunParallel), _b = _a.next(); !_b.done; _b = _a.next()) {
                                task = _b.value;
                                this.logger.info("parallel group task " + this.name() + " running subtask " + task.name());
                                taskResults.push(task.run());
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        failures = [];
                        i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(i < taskResults.length)) return [3 /*break*/, 7];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, taskResults[i]];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _d.sent();
                        failures.push("task " + this.tasksToRunParallel[i].name() + " failed: " + err_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        this.logger.info("parallel group task " + this.name() + " completed subtask " + this.tasksToRunParallel[i].name());
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        if (failures.length > 0) {
                            failureMessage = failures.join(', ');
                            this.logAndThrow("parallel group task " + this.name() + " failed for tasks: " + failureMessage);
                        }
                        this.logger.info("parallel group task " + this.name() + " completed");
                        return [2 /*return*/];
                }
            });
        });
    };
    return ParallelGroupTask;
}(BaseTask_1.default));
exports.default = ParallelGroupTask;
//# sourceMappingURL=ParallelGroupTask.js.map