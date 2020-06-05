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
var SignalingClientEventType_1 = require("../signalingclient/SignalingClientEventType");
var BaseTask_1 = require("./BaseTask");
var CleanStoppedSessionTask = /** @class */ (function (_super) {
    __extends(CleanStoppedSessionTask, _super);
    function CleanStoppedSessionTask(context) {
        var _this = _super.call(this, context.logger) || this;
        _this.context = context;
        _this.taskName = 'CleanStoppedSessionTask';
        _this.taskCanceler = null;
        return _this;
    }
    CleanStoppedSessionTask.prototype.cancel = function () {
        if (this.taskCanceler) {
            this.taskCanceler.cancel();
            this.taskCanceler = null;
        }
    };
    CleanStoppedSessionTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, _a, _b, observer, tile;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, 4, 5]);
                        if (!this.context.signalingClient.ready()) return [3 /*break*/, 2];
                        this.context.signalingClient.closeConnection();
                        return [4 /*yield*/, this.receiveWebSocketClosedEvent()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_1 = _d.sent();
                        throw error_1;
                    case 4:
                        try {
                            for (_a = __values(this.context.removableObservers), _b = _a.next(); !_b.done; _b = _a.next()) {
                                observer = _b.value;
                                observer.removeObserver();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        this.context.statsCollector.stop();
                        this.context.statsCollector = null;
                        this.context.connectionMonitor.stop();
                        this.context.connectionMonitor = null;
                        if (this.context.peer) {
                            this.context.peer.close();
                        }
                        this.context.peer = null;
                        this.context.localVideoSender = null;
                        this.context.sdpAnswer = null;
                        this.context.sdpOfferInit = null;
                        this.context.indexFrame = null;
                        this.context.iceCandidateHandler = null;
                        this.context.iceCandidates = [];
                        this.context.turnCredentials = null;
                        this.context.videoSubscriptions = null;
                        this.context.transceiverController.reset();
                        this.context.mediaStreamBroker.releaseMediaStream(this.context.activeAudioInput);
                        this.context.activeAudioInput = null;
                        this.context.mediaStreamBroker.releaseMediaStream(this.context.activeVideoInput);
                        this.context.activeVideoInput = null;
                        this.context.realtimeController.realtimeSetLocalAudioInput(null);
                        tile = this.context.videoTileController.getLocalVideoTile();
                        if (tile) {
                            tile.bindVideoStream('', true, null, null, null, null);
                        }
                        this.context.videoTileController.removeAllVideoTiles();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CleanStoppedSessionTask.prototype.receiveWebSocketClosedEvent = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var Interceptor = /** @class */ (function () {
                function Interceptor(signalingClient) {
                    this.signalingClient = signalingClient;
                }
                Interceptor.prototype.cancel = function () {
                    this.signalingClient.removeObserver(this);
                    reject(new Error("CleanStoppedSessionTask got canceled while waiting for the WebSocket closed event"));
                };
                Interceptor.prototype.handleSignalingClientEvent = function (event) {
                    if (event.type === SignalingClientEventType_1.default.WebSocketClosed) {
                        this.signalingClient.removeObserver(this);
                        resolve();
                    }
                };
                return Interceptor;
            }());
            var interceptor = new Interceptor(_this.context.signalingClient);
            _this.taskCanceler = interceptor;
            _this.context.signalingClient.registerObserver(interceptor);
        });
    };
    return CleanStoppedSessionTask;
}(BaseTask_1.default));
exports.default = CleanStoppedSessionTask;
//# sourceMappingURL=CleanStoppedSessionTask.js.map