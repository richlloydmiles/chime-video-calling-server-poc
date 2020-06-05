"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var VideoLogEvent_1 = require("../statscollector/VideoLogEvent");
var BaseTask_1 = require("./BaseTask");
/*
 * [[AttachMediaInputTask]] adds audio and video input to peer connection.
 */
var AttachMediaInputTask = /** @class */ (function (_super) {
    __extends(AttachMediaInputTask, _super);
    function AttachMediaInputTask(context) {
        var _this = _super.call(this, context.logger) || this;
        _this.context = context;
        _this.taskName = 'AttachMediaInputTask';
        return _this;
    }
    AttachMediaInputTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transceiverController, audioInput, audioTracks, senders_1, videoInput, videoTracks_1, videoTrack, senders;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transceiverController = this.context.transceiverController;
                        transceiverController.setPeer(this.context.peer);
                        transceiverController.setupLocalTransceivers();
                        audioInput = this.context.activeAudioInput;
                        if (!audioInput) return [3 /*break*/, 4];
                        audioTracks = audioInput.getAudioTracks();
                        if (!this.context.browserBehavior.requiresUnifiedPlan()) return [3 /*break*/, 2];
                        this.context.logger.info('attaching audio track to peer connection (unified-plan)');
                        return [4 /*yield*/, transceiverController.setAudioInput(audioTracks.length ? audioTracks[0] : null)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.context.logger.info('attaching audio track to peer connection (plan-b)');
                        senders_1 = this.context.peer.getSenders();
                        audioInput.getAudioTracks().forEach(function (track) {
                            if (!senders_1.find(function (sender) {
                                return sender.track.id === track.id;
                            })) {
                                // unclear why this does not deal with the case of removing
                                // an existing track as we do in attachVideoInput
                                // @ts-ignore
                                _this.context.localAudioSender = _this.context.peer.addTrack(track, audioInput);
                            }
                        });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, transceiverController.setAudioInput(null)];
                    case 5:
                        _a.sent();
                        this.context.logger.warn('no audio track');
                        _a.label = 6;
                    case 6:
                        videoInput = this.context.activeVideoInput;
                        if (!videoInput) return [3 /*break*/, 10];
                        videoTracks_1 = videoInput.getVideoTracks();
                        videoTrack = videoTracks_1.length ? videoTracks_1[0] : null;
                        if (!this.context.browserBehavior.requiresUnifiedPlan()) return [3 /*break*/, 8];
                        this.context.logger.info('attaching video track to peer connection (unified-plan)');
                        return [4 /*yield*/, transceiverController.setVideoInput(videoTrack)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        this.context.logger.info('attaching video track to peer connection (plan-b)');
                        senders = this.context.peer.getSenders();
                        if (!senders.find(function (sender) {
                            return sender.track && sender.track.id === videoTracks_1[0].id;
                        })) {
                            if (this.context.localVideoSender) {
                                // @ts-ignore
                                this.context.peer.removeTrack(this.context.localVideoSender);
                                this.context.localVideoSender = null;
                            }
                            this.context.localVideoSender = this.context.peer.addTrack(videoTracks_1[0], videoInput);
                        }
                        _a.label = 9;
                    case 9:
                        if (videoTrack) {
                            this.context.statsCollector.logVideoEvent(VideoLogEvent_1.default.InputAttached, this.context.videoDeviceInformation);
                            this.context.videoInputAttachedTimestampMs = Date.now();
                        }
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, transceiverController.setVideoInput(null)];
                    case 11:
                        _a.sent();
                        this.context.logger.info('no video track');
                        if (this.context.localVideoSender) {
                            this.context.logger.info('removing track from peer');
                            // @ts-ignore
                            this.context.peer.removeTrack(this.context.localVideoSender);
                            this.context.localVideoSender = null;
                        }
                        _a.label = 12;
                    case 12:
                        this.context.videoSubscriptions = transceiverController.updateVideoTransceivers(this.context.videoStreamIndex, this.context.videosToReceive);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AttachMediaInputTask;
}(BaseTask_1.default));
exports.default = AttachMediaInputTask;
//# sourceMappingURL=AttachMediaInputTask.js.map