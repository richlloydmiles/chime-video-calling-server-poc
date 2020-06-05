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
var DefaultBrowserBehavior_1 = require("../browserbehavior/DefaultBrowserBehavior");
var DefaultModality_1 = require("../modality/DefaultModality");
var AsyncScheduler_1 = require("../scheduler/AsyncScheduler");
var VideoTileState_1 = require("./VideoTileState");
var DefaultVideoTile = /** @class */ (function () {
    function DefaultVideoTile(tileId, localTile, tileController, devicePixelRatioMonitor) {
        this.tileController = tileController;
        this.devicePixelRatioMonitor = devicePixelRatioMonitor;
        this.tileState = new VideoTileState_1.default();
        this.tileState.tileId = tileId;
        this.tileState.localTile = localTile;
        this.devicePixelRatioMonitor.registerObserver(this);
    }
    DefaultVideoTile.connectVideoStreamToVideoElement = function (videoStream, videoElement, localTile) {
        var _this = this;
        var transform = localTile && videoStream.getVideoTracks()[0].getSettings().facingMode !== 'environment'
            ? 'rotateY(180deg)'
            : '';
        DefaultVideoTile.setVideoElementFlag(videoElement, 'disablePictureInPicture', localTile);
        DefaultVideoTile.setVideoElementFlag(videoElement, 'disableRemotePlayback', localTile);
        if (videoElement.style.transform !== transform) {
            videoElement.style.transform = transform;
        }
        if (videoElement.hasAttribute('controls')) {
            videoElement.removeAttribute('controls');
        }
        if (!videoElement.hasAttribute('autoplay')) {
            videoElement.setAttribute('autoplay', 'true');
        }
        // playsinline is needed for video to play in Iphone in non-fullscreen mode.
        // See https://developer.apple.com/documentation/webkit/safari_tools_and_features/delivering_video_content_for_safari#3030250
        if (!videoElement.hasAttribute('playsinline')) {
            videoElement.setAttribute('playsinline', 'true');
        }
        if (!videoElement.hasAttribute('muted')) {
            videoElement.setAttribute('muted', 'true');
        }
        if (videoElement.srcObject !== videoStream) {
            videoElement.srcObject = videoStream;
        }
        if (new DefaultBrowserBehavior_1.default().requiresVideoElementWorkaround()) {
            new AsyncScheduler_1.default().start(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, videoElement.play()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    DefaultVideoTile.disconnectVideoStreamFromVideoElement = function (videoElement, dueToPause) {
        var e_1, _a;
        if (!videoElement) {
            return;
        }
        if (dueToPause) {
            videoElement.srcObject = null;
            videoElement.style.transform = '';
        }
        else {
            if (!videoElement.srcObject) {
                return;
            }
            videoElement.pause();
            videoElement.style.transform = '';
            DefaultVideoTile.setVideoElementFlag(videoElement, 'disablePictureInPicture', false);
            DefaultVideoTile.setVideoElementFlag(videoElement, 'disableRemotePlayback', false);
            // We must remove all the tracks from the MediaStream before
            // clearing the `srcObject` to prevent Safari from crashing.
            var mediaStream = videoElement.srcObject;
            var tracks = mediaStream.getTracks();
            try {
                for (var tracks_1 = __values(tracks), tracks_1_1 = tracks_1.next(); !tracks_1_1.done; tracks_1_1 = tracks_1.next()) {
                    var track = tracks_1_1.value;
                    track.stop();
                    mediaStream.removeTrack(track);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tracks_1_1 && !tracks_1_1.done && (_a = tracks_1.return)) _a.call(tracks_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Need to yield the message loop before clearing `srcObject` to
            // prevent Safari from crashing.
            if (new DefaultBrowserBehavior_1.default().requiresVideoElementWorkaround()) {
                new AsyncScheduler_1.default().start(function () {
                    videoElement.srcObject = null;
                });
            }
            else {
                videoElement.srcObject = null;
            }
        }
    };
    DefaultVideoTile.prototype.destroy = function () {
        this.devicePixelRatioMonitor.removeObserver(this);
        if (this.tileState.boundVideoElement &&
            this.tileState.boundVideoElement.srcObject === this.tileState.boundVideoStream) {
            DefaultVideoTile.disconnectVideoStreamFromVideoElement(this.tileState.boundVideoElement, false);
        }
        this.tileState = new VideoTileState_1.default();
    };
    DefaultVideoTile.prototype.devicePixelRatioChanged = function (newDevicePixelRatio) {
        this.tileState.devicePixelRatio = newDevicePixelRatio;
        this.sendTileStateUpdate();
    };
    DefaultVideoTile.prototype.id = function () {
        return this.tileState.tileId;
    };
    DefaultVideoTile.prototype.state = function () {
        return this.tileState.clone();
    };
    DefaultVideoTile.prototype.stateRef = function () {
        return this.tileState;
    };
    DefaultVideoTile.prototype.bindVideoStream = function (attendeeId, localTile, mediaStream, contentWidth, contentHeight, streamId, externalUserId) {
        var tileUpdated = false;
        if (this.tileState.boundAttendeeId !== attendeeId) {
            this.tileState.boundAttendeeId = attendeeId;
            if (new DefaultModality_1.default(attendeeId).hasModality(DefaultModality_1.default.MODALITY_CONTENT)) {
                this.tileState.isContent = true;
            }
            tileUpdated = true;
        }
        if (this.tileState.boundExternalUserId !== externalUserId) {
            this.tileState.boundExternalUserId = externalUserId;
            tileUpdated = true;
        }
        if (this.tileState.localTile !== localTile) {
            this.tileState.localTile = localTile;
            tileUpdated = true;
        }
        if (this.tileState.boundVideoStream !== mediaStream) {
            this.tileState.boundVideoStream = mediaStream;
            tileUpdated = true;
        }
        if (this.tileState.videoStreamContentWidth !== contentWidth) {
            this.tileState.videoStreamContentWidth = contentWidth;
            tileUpdated = true;
        }
        if (this.tileState.videoStreamContentHeight !== contentHeight) {
            this.tileState.videoStreamContentHeight = contentHeight;
            tileUpdated = true;
        }
        if (this.tileState.streamId !== streamId) {
            this.tileState.streamId = streamId;
            tileUpdated = true;
        }
        if (tileUpdated) {
            this.sendTileStateUpdate();
        }
    };
    DefaultVideoTile.prototype.bindVideoElement = function (videoElement) {
        var tileUpdated = false;
        if (this.tileState.boundVideoElement !== videoElement) {
            this.tileState.boundVideoElement = videoElement;
            tileUpdated = true;
        }
        if (this.tileState.boundVideoElement !== null) {
            if (this.tileState.videoElementCSSWidthPixels !== videoElement.clientWidth) {
                this.tileState.videoElementCSSWidthPixels = videoElement.clientWidth;
                tileUpdated = true;
            }
            if (this.tileState.videoElementCSSHeightPixels !== videoElement.clientHeight) {
                this.tileState.videoElementCSSHeightPixels = videoElement.clientHeight;
                tileUpdated = true;
            }
        }
        else {
            this.tileState.videoElementCSSWidthPixels = null;
            this.tileState.videoElementCSSHeightPixels = null;
        }
        if (tileUpdated) {
            this.sendTileStateUpdate();
        }
    };
    DefaultVideoTile.prototype.pause = function () {
        if (!this.tileState.paused) {
            this.tileState.paused = true;
            this.sendTileStateUpdate();
        }
    };
    DefaultVideoTile.prototype.unpause = function () {
        if (this.tileState.paused) {
            this.tileState.paused = false;
            this.sendTileStateUpdate();
        }
    };
    DefaultVideoTile.prototype.markPoorConnection = function () {
        if (this.tileState.poorConnection) {
            return false;
        }
        this.tileState.poorConnection = true;
        this.sendTileStateUpdate();
        return true;
    };
    DefaultVideoTile.prototype.unmarkPoorConnection = function () {
        if (!this.tileState.poorConnection) {
            return false;
        }
        this.tileState.poorConnection = false;
        this.sendTileStateUpdate();
        return true;
    };
    DefaultVideoTile.prototype.capture = function () {
        if (!this.tileState.active) {
            return null;
        }
        var canvas = document.createElement('canvas');
        var video = this.tileState.boundVideoElement;
        canvas.width = video.videoWidth || video.width;
        canvas.height = video.videoHeight || video.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    DefaultVideoTile.prototype.sendTileStateUpdate = function () {
        this.updateActiveState();
        this.updateVideoStreamOnVideoElement();
        this.updateVideoElementPhysicalPixels();
        this.tileController.sendTileStateUpdate(this.state());
    };
    DefaultVideoTile.prototype.updateActiveState = function () {
        this.tileState.active = !!(!this.tileState.paused &&
            !this.tileState.poorConnection &&
            this.tileState.boundAttendeeId &&
            this.tileState.boundVideoElement &&
            this.tileState.boundVideoStream);
    };
    DefaultVideoTile.prototype.updateVideoElementPhysicalPixels = function () {
        if (typeof this.tileState.videoElementCSSWidthPixels === 'number' &&
            typeof this.tileState.videoElementCSSHeightPixels === 'number') {
            this.tileState.videoElementPhysicalWidthPixels =
                this.tileState.devicePixelRatio * this.tileState.videoElementCSSWidthPixels;
            this.tileState.videoElementPhysicalHeightPixels =
                this.tileState.devicePixelRatio * this.tileState.videoElementCSSHeightPixels;
        }
        else {
            this.tileState.videoElementPhysicalWidthPixels = null;
            this.tileState.videoElementPhysicalHeightPixels = null;
        }
    };
    DefaultVideoTile.prototype.updateVideoStreamOnVideoElement = function () {
        if (this.tileState.active) {
            DefaultVideoTile.connectVideoStreamToVideoElement(this.tileState.boundVideoStream, this.tileState.boundVideoElement, this.tileState.localTile);
        }
        else {
            DefaultVideoTile.disconnectVideoStreamFromVideoElement(this.tileState.boundVideoElement, this.tileState.paused);
        }
    };
    DefaultVideoTile.setVideoElementFlag = function (videoElement, flag, value) {
        if (flag in videoElement) {
            // @ts-ignore
            videoElement[flag] = value;
        }
    };
    return DefaultVideoTile;
}());
exports.default = DefaultVideoTile;
//# sourceMappingURL=DefaultVideoTile.js.map