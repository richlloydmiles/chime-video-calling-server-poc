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
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultSDP_1 = require("../sdp/DefaultSDP");
var BaseTask_1 = require("./BaseTask");
/*
 * [[SetRemoteDescriptionTask]] asynchronously calls [[setRemoteDescription]] on the
 * peer connection and then waits for the tracks to be added and for the ICE connection
 * to complete.
 */
var SetRemoteDescriptionTask = /** @class */ (function (_super) {
    __extends(SetRemoteDescriptionTask, _super);
    function SetRemoteDescriptionTask(context) {
        var _this = _super.call(this, context.logger) || this;
        _this.context = context;
        _this.taskName = 'SetRemoteDescriptionTask';
        return _this;
    }
    SetRemoteDescriptionTask.prototype.cancel = function () {
        if (this.cancelICEPromise) {
            this.cancelICEPromise();
        }
    };
    SetRemoteDescriptionTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var peer, sdp, sdpInactiveVideoOffer, sdpInactiveVideoAnswer, updatedAnswer, offer, answer, remoteDescription, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        peer = this.context.peer;
                        if (!peer) {
                            this.logAndThrow('session does not have peer connection; bypass set remote description');
                        }
                        sdp = this.context.sdpAnswer;
                        sdp = new DefaultSDP_1.default(sdp).withoutServerReflexiveCandidates().sdp;
                        if (!this.context.browserBehavior.requiresUnifiedPlan()) {
                            // Under Plan B if our offer has video, but we're not going to subscribe to
                            // any videos, ensure that the answer has video (marked inactive). If
                            // it doesn't, WebRTC will reject the SDP answer. This happens on Chrome
                            // when going from receiving one video to zero videos. The server does not
                            // provide a video m-line when there are no videos available under Plan B,
                            // thus we need to synthesize a video m-line by copying the one from the offer.
                            this.logger.info('checking for no videos (plan-b)');
                            if (this.context.videosToReceive.empty() && this.context.peer.remoteDescription) {
                                this.logger.info('have no videos and have remote description (plan-b)');
                                sdpInactiveVideoOffer = this.context.peer.localDescription.sdp;
                                sdpInactiveVideoAnswer = sdp;
                                updatedAnswer = sdpInactiveVideoAnswer;
                                offer = new DefaultSDP_1.default(sdpInactiveVideoOffer);
                                if (offer.hasVideo()) {
                                    this.logger.info("offer has video (plan-b): >>>" + offer.sdp + "<<<");
                                    answer = new DefaultSDP_1.default(sdpInactiveVideoAnswer);
                                    this.logger.info("existing answer (plan-b): >>>" + answer.sdp + "<<<");
                                    if (!answer.hasVideo()) {
                                        this.logger.info("copying inactive video from offer into answer (plan-b); sdp answer before is >>>" + sdpInactiveVideoAnswer + "<<<");
                                        updatedAnswer = answer.copyVideo(sdpInactiveVideoOffer).sdp;
                                    }
                                }
                                sdp = updatedAnswer;
                            }
                        }
                        this.logger.info("remote description is >>>" + sdp + "<<<");
                        remoteDescription = {
                            type: 'answer',
                            sdp: sdp,
                            toJSON: null,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.createICEConnectionCompletedPromise(remoteDescription)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetRemoteDescriptionTask.prototype.createICEConnectionCompletedPromise = function (remoteDescription) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var checkConnectionCompleted, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkConnectionCompleted = function () {
                            if (_this.context.peer.iceConnectionState === 'connected' ||
                                _this.context.peer.iceConnectionState === 'completed') {
                                _this.context.peer.removeEventListener('iceconnectionstatechange', checkConnectionCompleted);
                                resolve();
                            }
                        };
                        this.cancelICEPromise = function () {
                            if (_this.context.peer) {
                                _this.context.peer.removeEventListener('iceconnectionstatechange', checkConnectionCompleted);
                            }
                            reject(new Error(_this.name() + " got canceled while waiting for the ICE connection state"));
                        };
                        this.context.peer.addEventListener('iceconnectionstatechange', checkConnectionCompleted);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.context.peer.setRemoteDescription(remoteDescription)];
                    case 2:
                        _a.sent();
                        this.logger.info('set remote description, waiting for ICE connection');
                        checkConnectionCompleted();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        reject(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return SetRemoteDescriptionTask;
}(BaseTask_1.default));
exports.default = SetRemoteDescriptionTask;
//# sourceMappingURL=SetRemoteDescriptionTask.js.map