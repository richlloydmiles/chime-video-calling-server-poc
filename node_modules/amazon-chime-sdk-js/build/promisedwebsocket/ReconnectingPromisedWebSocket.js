"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../maybe/Maybe");
var TimeoutScheduler_1 = require("../scheduler/TimeoutScheduler");
var PromisedWebSocketClosureCode_1 = require("./PromisedWebSocketClosureCode");
var ReconnectingPromisedWebSocket = /** @class */ (function () {
    function ReconnectingPromisedWebSocket(url, protocols, binaryType, webSocketFactory, backoff) {
        this.url = url;
        this.protocols = protocols;
        this.binaryType = binaryType;
        this.webSocketFactory = webSocketFactory;
        this.backoff = backoff;
        this.callbacks = new Map();
        this.timeoutScheduler = null;
        this.webSocket = null;
    }
    ReconnectingPromisedWebSocket.prototype.close = function (timeoutMs, code, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var webSocket;
            return __generator(this, function (_a) {
                if (this.webSocket === null) {
                    return [2 /*return*/, Promise.reject(new Error('closed'))];
                }
                this.willCloseWebSocket();
                webSocket = this.webSocket;
                this.webSocket = null;
                return [2 /*return*/, webSocket.close(timeoutMs, code, reason)];
            });
        });
    };
    ReconnectingPromisedWebSocket.prototype.open = function (timeoutMs) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.webSocket !== null) {
                    return [2 /*return*/, Promise.reject(new Error('opened'))];
                }
                this.webSocket = this.webSocketFactory.create(this.url, this.protocols, this.binaryType);
                this.webSocket.addEventListener('close', function (event) {
                    if (ReconnectingPromisedWebSocket.normalClosureCodes.indexOf(event.code) <= -1) {
                        try {
                            var timeout = _this.backoff.nextBackoffAmountMs();
                            _this.timeoutScheduler = new TimeoutScheduler_1.default(timeout);
                            _this.timeoutScheduler.start(function () {
                                _this.timeoutScheduler.stop();
                                _this.open(timeoutMs)
                                    .catch(function (error) {
                                    _this.dispatchEvent(new CustomEvent('reconnect_error', { detail: error }));
                                })
                                    .then(function () { });
                            });
                            _this.dispatchEvent(new CustomEvent('reconnect'));
                        }
                        catch (e) {
                            _this.dispatchEvent(event);
                        }
                    }
                    else {
                        _this.dispatchEvent(event);
                    }
                    _this.webSocket = null;
                });
                this.webSocket.addEventListener('message', function (event) {
                    _this.dispatchEvent(event);
                });
                this.webSocket.addEventListener('open', function (event) {
                    _this.didOpenWebSocket();
                    _this.dispatchEvent(event);
                });
                return [2 /*return*/, this.webSocket.open(timeoutMs).catch(function (error) {
                        _this.webSocket = null;
                        throw error;
                    })];
            });
        });
    };
    ReconnectingPromisedWebSocket.prototype.send = function (data) {
        if (this.webSocket === null) {
            throw new Error('closed');
        }
        this.webSocket.send(data);
    };
    ReconnectingPromisedWebSocket.prototype.dispatchEvent = function (event) {
        Maybe_1.default.of(this.callbacks.get(event.type)).map(function (listeners) {
            return listeners.forEach(function (listener) { return listener(event); });
        });
        return event.defaultPrevented;
    };
    ReconnectingPromisedWebSocket.prototype.addEventListener = function (type, listener) {
        var _this = this;
        Maybe_1.default.of(this.callbacks.get(type))
            .defaulting(new Set())
            .map(function (listeners) { return listeners.add(listener); })
            .map(function (listeners) { return _this.callbacks.set(type, listeners); });
    };
    ReconnectingPromisedWebSocket.prototype.removeEventListener = function (type, listener) {
        Maybe_1.default.of(this.callbacks.get(type)).map(function (f) { return f.delete(listener); });
    };
    ReconnectingPromisedWebSocket.prototype.didOpenWebSocket = function () {
        Maybe_1.default.of(this.timeoutScheduler).map(function (scheduler) { return scheduler.stop(); });
        this.backoff.reset();
        this.timeoutScheduler = null;
    };
    ReconnectingPromisedWebSocket.prototype.willCloseWebSocket = function () {
        this.didOpenWebSocket();
    };
    ReconnectingPromisedWebSocket.normalClosureCodes = Array.of(PromisedWebSocketClosureCode_1.default.Normal, PromisedWebSocketClosureCode_1.default.EmptyCloseFrame);
    return ReconnectingPromisedWebSocket;
}());
exports.default = ReconnectingPromisedWebSocket;
//# sourceMappingURL=ReconnectingPromisedWebSocket.js.map