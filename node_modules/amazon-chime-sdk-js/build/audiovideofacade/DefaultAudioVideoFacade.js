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
var DefaultAudioVideoFacade = /** @class */ (function () {
    function DefaultAudioVideoFacade(audioVideoController, videoTileController, realtimeController, audioMixController, deviceController, contentShareController) {
        this.audioVideoController = audioVideoController;
        this.videoTileController = videoTileController;
        this.realtimeController = realtimeController;
        this.audioMixController = audioMixController;
        this.deviceController = deviceController;
        this.contentShareController = contentShareController;
    }
    DefaultAudioVideoFacade.prototype.addObserver = function (observer) {
        this.audioVideoController.addObserver(observer);
        this.trace('addObserver');
    };
    DefaultAudioVideoFacade.prototype.removeObserver = function (observer) {
        this.audioVideoController.removeObserver(observer);
        this.trace('removeObserver');
    };
    DefaultAudioVideoFacade.prototype.start = function () {
        this.audioVideoController.start();
        this.trace('start');
    };
    DefaultAudioVideoFacade.prototype.stop = function () {
        this.audioVideoController.stop();
        this.trace('stop');
    };
    DefaultAudioVideoFacade.prototype.getRTCPeerConnectionStats = function (selector) {
        this.trace('getRTCPeerConnectionStats', selector ? selector.id : null);
        return this.audioVideoController.getRTCPeerConnectionStats(selector);
    };
    DefaultAudioVideoFacade.prototype.bindAudioElement = function (element) {
        var result = this.audioMixController.bindAudioElement(element);
        this.trace('bindAudioElement', element.id, result);
        return result;
    };
    DefaultAudioVideoFacade.prototype.unbindAudioElement = function () {
        this.audioMixController.unbindAudioElement();
        this.trace('unbindAudioElement');
    };
    DefaultAudioVideoFacade.prototype.bindVideoElement = function (tileId, videoElement) {
        this.videoTileController.bindVideoElement(tileId, videoElement);
        this.trace('bindVideoElement', { tileId: tileId, videoElementId: videoElement.id });
    };
    DefaultAudioVideoFacade.prototype.unbindVideoElement = function (tileId) {
        this.videoTileController.unbindVideoElement(tileId);
        this.trace('unbindVideoElement', tileId);
    };
    DefaultAudioVideoFacade.prototype.startLocalVideoTile = function () {
        var result = this.videoTileController.startLocalVideoTile();
        this.trace('startLocalVideoTile', null, result);
        return result;
    };
    DefaultAudioVideoFacade.prototype.stopLocalVideoTile = function () {
        this.videoTileController.stopLocalVideoTile();
        this.trace('stopLocalVideoTile');
    };
    DefaultAudioVideoFacade.prototype.hasStartedLocalVideoTile = function () {
        var result = this.videoTileController.hasStartedLocalVideoTile();
        this.trace('hasStartedLocalVideoTile', null, result);
        return result;
    };
    DefaultAudioVideoFacade.prototype.removeLocalVideoTile = function () {
        this.videoTileController.removeLocalVideoTile();
        this.trace('removeLocalVideoTile');
    };
    DefaultAudioVideoFacade.prototype.getLocalVideoTile = function () {
        var result = this.videoTileController.getLocalVideoTile();
        this.trace('getLocalVideoTile');
        return result;
    };
    DefaultAudioVideoFacade.prototype.pauseVideoTile = function (tileId) {
        this.videoTileController.pauseVideoTile(tileId);
        this.trace('pauseVideoTile', tileId);
    };
    DefaultAudioVideoFacade.prototype.unpauseVideoTile = function (tileId) {
        this.videoTileController.unpauseVideoTile(tileId);
        this.trace('unpauseVideoTile', tileId);
    };
    DefaultAudioVideoFacade.prototype.getVideoTile = function (tileId) {
        var result = this.videoTileController.getVideoTile(tileId);
        this.trace('getVideoTile', tileId);
        return result;
    };
    DefaultAudioVideoFacade.prototype.getAllRemoteVideoTiles = function () {
        var result = this.videoTileController.getAllRemoteVideoTiles();
        this.trace('getAllRemoteVideoTiles');
        return result;
    };
    DefaultAudioVideoFacade.prototype.getAllVideoTiles = function () {
        var result = this.videoTileController.getAllVideoTiles();
        this.trace('getAllVideoTiles');
        return result;
    };
    DefaultAudioVideoFacade.prototype.addVideoTile = function () {
        var result = this.videoTileController.addVideoTile();
        this.trace('addVideoTile', null, result.state());
        return result;
    };
    DefaultAudioVideoFacade.prototype.removeVideoTile = function (tileId) {
        this.videoTileController.removeVideoTile(tileId);
        this.trace('removeVideoTile', tileId);
    };
    DefaultAudioVideoFacade.prototype.removeVideoTilesByAttendeeId = function (attendeeId) {
        var result = this.videoTileController.removeVideoTilesByAttendeeId(attendeeId);
        this.trace('removeVideoTilesByAttendeeId', attendeeId, result);
        return result;
    };
    DefaultAudioVideoFacade.prototype.removeAllVideoTiles = function () {
        this.videoTileController.removeAllVideoTiles();
        this.trace('removeAllVideoTiles');
    };
    DefaultAudioVideoFacade.prototype.captureVideoTile = function (tileId) {
        var result = this.videoTileController.captureVideoTile(tileId);
        this.trace('captureVideoTile', tileId);
        return result;
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToAttendeeIdPresence = function (callback) {
        this.realtimeController.realtimeSubscribeToAttendeeIdPresence(callback);
        this.trace('realtimeSubscribeToAttendeeIdPresence');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeToAttendeeIdPresence = function (callback) {
        this.realtimeController.realtimeUnsubscribeToAttendeeIdPresence(callback);
        this.trace('realtimeUnsubscribeToAttendeeIdPresence');
    };
    DefaultAudioVideoFacade.prototype.realtimeSetCanUnmuteLocalAudio = function (canUnmute) {
        this.realtimeController.realtimeSetCanUnmuteLocalAudio(canUnmute);
        this.trace('realtimeSetCanUnmuteLocalAudio', canUnmute);
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToSetCanUnmuteLocalAudio = function (callback) {
        this.realtimeController.realtimeSubscribeToSetCanUnmuteLocalAudio(callback);
        this.trace('realtimeSubscribeToSetCanUnmuteLocalAudio');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeToSetCanUnmuteLocalAudio = function (callback) {
        this.realtimeController.realtimeUnsubscribeToSetCanUnmuteLocalAudio(callback);
    };
    DefaultAudioVideoFacade.prototype.realtimeCanUnmuteLocalAudio = function () {
        var result = this.realtimeController.realtimeCanUnmuteLocalAudio();
        this.trace('realtimeCanUnmuteLocalAudio', null, result);
        return result;
    };
    DefaultAudioVideoFacade.prototype.realtimeMuteLocalAudio = function () {
        this.realtimeController.realtimeMuteLocalAudio();
        this.trace('realtimeMuteLocalAudio');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnmuteLocalAudio = function () {
        var result = this.realtimeController.realtimeUnmuteLocalAudio();
        this.trace('realtimeUnmuteLocalAudio');
        return result;
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToMuteAndUnmuteLocalAudio = function (callback) {
        this.realtimeController.realtimeSubscribeToMuteAndUnmuteLocalAudio(callback);
        this.trace('realtimeSubscribeToMuteAndUnmuteLocalAudio');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeToMuteAndUnmuteLocalAudio = function (callback) {
        this.realtimeController.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(callback);
    };
    DefaultAudioVideoFacade.prototype.realtimeIsLocalAudioMuted = function () {
        var result = this.realtimeController.realtimeIsLocalAudioMuted();
        this.trace('realtimeIsLocalAudioMuted');
        return result;
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToVolumeIndicator = function (attendeeId, callback) {
        this.realtimeController.realtimeSubscribeToVolumeIndicator(attendeeId, callback);
        this.trace('realtimeSubscribeToVolumeIndicator', attendeeId);
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeFromVolumeIndicator = function (attendeeId) {
        this.realtimeController.realtimeUnsubscribeFromVolumeIndicator(attendeeId);
        this.trace('realtimeUnsubscribeFromVolumeIndicator', attendeeId);
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToLocalSignalStrengthChange = function (callback) {
        this.realtimeController.realtimeSubscribeToLocalSignalStrengthChange(callback);
        this.trace('realtimeSubscribeToLocalSignalStrengthChange');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeToLocalSignalStrengthChange = function (callback) {
        this.realtimeController.realtimeUnsubscribeToLocalSignalStrengthChange(callback);
        this.trace('realtimeUnsubscribeToLocalSignalStrengthChange');
    };
    DefaultAudioVideoFacade.prototype.realtimeSendDataMessage = function (topic, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, lifetimeMs) {
        this.realtimeController.realtimeSendDataMessage(topic, data, lifetimeMs);
        this.trace('realtimeSendDataMessage');
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToReceiveDataMessage = function (topic, callback) {
        this.realtimeController.realtimeSubscribeToReceiveDataMessage(topic, callback);
        this.trace('realtimeSubscribeToReceiveDataMessage');
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeFromReceiveDataMessage = function (topic) {
        this.realtimeController.realtimeUnsubscribeFromReceiveDataMessage(topic);
        this.trace('realtimeUnsubscribeFromReceiveDataMessage');
    };
    DefaultAudioVideoFacade.prototype.realtimeSubscribeToFatalError = function (callback) {
        this.realtimeController.realtimeSubscribeToFatalError(callback);
    };
    DefaultAudioVideoFacade.prototype.realtimeUnsubscribeToFatalError = function (callback) {
        this.realtimeController.realtimeUnsubscribeToFatalError(callback);
    };
    DefaultAudioVideoFacade.prototype.subscribeToActiveSpeakerDetector = function (policy, callback, scoresCallback, scoresCallbackIntervalMs) {
        this.audioVideoController.activeSpeakerDetector.subscribe(policy, callback, scoresCallback, scoresCallbackIntervalMs);
        this.trace('subscribeToActiveSpeakerDetector');
    };
    DefaultAudioVideoFacade.prototype.unsubscribeFromActiveSpeakerDetector = function (callback) {
        this.audioVideoController.activeSpeakerDetector.unsubscribe(callback);
        this.trace('unsubscribeFromActiveSpeakerDetector');
    };
    DefaultAudioVideoFacade.prototype.listAudioInputDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceController.listAudioInputDevices()];
                    case 1:
                        result = _a.sent();
                        this.trace('listAudioInputDevices', null, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DefaultAudioVideoFacade.prototype.listVideoInputDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceController.listVideoInputDevices()];
                    case 1:
                        result = _a.sent();
                        this.trace('listVideoInputDevices', null, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DefaultAudioVideoFacade.prototype.listAudioOutputDevices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceController.listAudioOutputDevices()];
                    case 1:
                        result = _a.sent();
                        this.trace('listAudioOutputDevices', null, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DefaultAudioVideoFacade.prototype.chooseAudioInputDevice = function (device) {
        var result = this.deviceController.chooseAudioInputDevice(device);
        this.trace('chooseAudioInputDevice', device);
        return result;
    };
    DefaultAudioVideoFacade.prototype.chooseVideoInputDevice = function (device) {
        var result = this.deviceController.chooseVideoInputDevice(device);
        this.trace('chooseVideoInputDevice', device);
        return result;
    };
    DefaultAudioVideoFacade.prototype.chooseAudioOutputDevice = function (deviceId) {
        var result = this.deviceController.chooseAudioOutputDevice(deviceId);
        this.trace('chooseAudioOutputDevice', deviceId);
        return result;
    };
    DefaultAudioVideoFacade.prototype.addDeviceChangeObserver = function (observer) {
        this.deviceController.addDeviceChangeObserver(observer);
        this.trace('addDeviceChangeObserver');
    };
    DefaultAudioVideoFacade.prototype.removeDeviceChangeObserver = function (observer) {
        this.deviceController.removeDeviceChangeObserver(observer);
        this.trace('removeDeviceChangeObserver');
    };
    DefaultAudioVideoFacade.prototype.createAnalyserNodeForAudioInput = function () {
        var result = this.deviceController.createAnalyserNodeForAudioInput();
        this.trace('createAnalyserNodeForAudioInput');
        return result;
    };
    DefaultAudioVideoFacade.prototype.startVideoPreviewForVideoInput = function (element) {
        this.deviceController.startVideoPreviewForVideoInput(element);
        this.trace('startVideoPreviewForVideoInput', element.id);
    };
    DefaultAudioVideoFacade.prototype.stopVideoPreviewForVideoInput = function (element) {
        this.deviceController.stopVideoPreviewForVideoInput(element);
        this.trace('stopVideoPreviewForVideoInput', element.id);
    };
    DefaultAudioVideoFacade.prototype.setDeviceLabelTrigger = function (trigger) {
        this.deviceController.setDeviceLabelTrigger(trigger);
        this.trace('setDeviceLabelTrigger');
    };
    DefaultAudioVideoFacade.prototype.mixIntoAudioInput = function (stream) {
        var result = this.deviceController.mixIntoAudioInput(stream);
        this.trace('mixIntoAudioInput', stream.id);
        return result;
    };
    DefaultAudioVideoFacade.prototype.chooseVideoInputQuality = function (width, height, frameRate, maxBandwidthKbps) {
        this.deviceController.chooseVideoInputQuality(width, height, frameRate, maxBandwidthKbps);
        this.trace('chooseVideoInputQuality', {
            width: width,
            height: height,
            frameRate: frameRate,
            maxBandwidthKbps: maxBandwidthKbps,
        });
    };
    DefaultAudioVideoFacade.prototype.enableWebAudio = function (flag) {
        this.deviceController.enableWebAudio(flag);
        this.trace('enableWebAudio', flag);
    };
    DefaultAudioVideoFacade.prototype.startContentShare = function (stream) {
        var result = this.contentShareController.startContentShare(stream);
        this.trace('startContentShare');
        return result;
    };
    DefaultAudioVideoFacade.prototype.startContentShareFromScreenCapture = function (sourceId, frameRate) {
        var result = this.contentShareController.startContentShareFromScreenCapture(sourceId, frameRate);
        this.trace('startContentShareFromScreenCapture');
        return result;
    };
    DefaultAudioVideoFacade.prototype.pauseContentShare = function () {
        this.contentShareController.pauseContentShare();
        this.trace('pauseContentShare');
    };
    DefaultAudioVideoFacade.prototype.unpauseContentShare = function () {
        this.contentShareController.unpauseContentShare();
        this.trace('unpauseContentShare');
    };
    DefaultAudioVideoFacade.prototype.stopContentShare = function () {
        this.contentShareController.stopContentShare();
        this.trace('stopContentShare');
    };
    DefaultAudioVideoFacade.prototype.addContentShareObserver = function (observer) {
        this.contentShareController.addContentShareObserver(observer);
        this.trace('addContentShareObserver');
    };
    DefaultAudioVideoFacade.prototype.removeContentShareObserver = function (observer) {
        this.contentShareController.removeContentShareObserver(observer);
        this.trace('removeContentShareObserver');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DefaultAudioVideoFacade.prototype.trace = function (name, input, output) {
        var meetingId = this.audioVideoController.configuration.meetingId;
        var attendeeId = this.audioVideoController.configuration.credentials.attendeeId;
        var s = "API/DefaultAudioVideoFacade/" + meetingId + "/" + attendeeId + "/" + name;
        if (typeof input !== 'undefined') {
            s += " " + JSON.stringify(input);
        }
        if (typeof output !== 'undefined') {
            s += " -> " + JSON.stringify(output);
        }
        this.audioVideoController.logger.info(s);
    };
    return DefaultAudioVideoFacade;
}());
exports.default = DefaultAudioVideoFacade;
//# sourceMappingURL=DefaultAudioVideoFacade.js.map