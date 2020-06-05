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
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var BaseTask_1 = require("./BaseTask");
/**
 * [[ReceiveVideoInputTask]] acquires a video input from [[DeviceController]].
 */
var ReceiveVideoInputTask = /** @class */ (function (_super) {
    __extends(ReceiveVideoInputTask, _super);
    function ReceiveVideoInputTask(context) {
        var _this = _super.call(this, context.logger) || this;
        _this.context = context;
        _this.taskName = 'ReceiveVideoInputTask';
        return _this;
    }
    ReceiveVideoInputTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var receiveEnabled, localTile, videoInput, error_1, videoTracks, attendeeId, trackSettings, externalUserId, i, track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receiveEnabled = this.context.videoDuplexMode === SignalingProtocol_js_1.SdkStreamServiceType.RX ||
                            this.context.videoDuplexMode === SignalingProtocol_js_1.SdkStreamServiceType.DUPLEX;
                        if (this.context.videoTileController.hasStartedLocalVideoTile()) {
                            this.context.videoDuplexMode = receiveEnabled
                                ? SignalingProtocol_js_1.SdkStreamServiceType.DUPLEX
                                : SignalingProtocol_js_1.SdkStreamServiceType.TX;
                        }
                        else {
                            this.context.videoDuplexMode = receiveEnabled ? SignalingProtocol_js_1.SdkStreamServiceType.RX : 0;
                        }
                        this.context.videoCaptureAndEncodeParameter = this.context.videoUplinkBandwidthPolicy.chooseCaptureAndEncodeParameters();
                        if (!this.context.videoTileController.hasStartedLocalVideoTile()) {
                            this.context.logger.info('a video input is not enabled');
                            if (this.context.activeVideoInput) {
                                this.stopVideoInput();
                            }
                            return [2 /*return*/];
                        }
                        localTile = this.context.videoTileController.getLocalVideoTile();
                        videoInput = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.context.mediaStreamBroker.acquireVideoInputStream()];
                    case 2:
                        videoInput = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.context.logger.warn('could not acquire video input from current device');
                        return [3 /*break*/, 4];
                    case 4:
                        this.context.activeVideoInput = videoInput;
                        if (videoInput) {
                            videoTracks = videoInput.getVideoTracks();
                            attendeeId = this.context.meetingSessionConfiguration.credentials.attendeeId;
                            trackSettings = videoTracks[0].getSettings();
                            externalUserId = this.context.audioVideoController.configuration.credentials
                                .externalUserId;
                            localTile.bindVideoStream(attendeeId, true, videoInput, trackSettings.width, trackSettings.height, null, externalUserId);
                            for (i = 0; i < videoTracks.length; i++) {
                                track = videoTracks[i];
                                this.logger.info("using video device label=" + track.label + " id=" + track.id);
                                this.context.videoDeviceInformation['current_camera_name'] = track.label;
                                this.context.videoDeviceInformation['current_camera_id'] = track.id;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ReceiveVideoInputTask.prototype.stopVideoInput = function () {
        this.context.mediaStreamBroker.releaseMediaStream(this.context.activeVideoInput);
        this.context.activeVideoInput = null;
    };
    return ReceiveVideoInputTask;
}(BaseTask_1.default));
exports.default = ReceiveVideoInputTask;
//# sourceMappingURL=ReceiveVideoInputTask.js.map