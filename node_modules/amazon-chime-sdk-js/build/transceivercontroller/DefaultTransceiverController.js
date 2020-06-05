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
var DefaultTransceiverController = /** @class */ (function () {
    function DefaultTransceiverController(logger, browserBehavior) {
        this.logger = logger;
        this.browserBehavior = browserBehavior;
        this._localCameraTransceiver = null;
        this._localAudioTransceiver = null;
        this.videoSubscriptions = [];
        this.defaultMediaStream = null;
        this.peer = null;
    }
    DefaultTransceiverController.setVideoSendingBitrateKbpsForSender = function (sender, bitrateKbps, _logger) {
        return __awaiter(this, void 0, void 0, function () {
            var param, _a, _b, encodeParam;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!sender || bitrateKbps <= 0) {
                            return [2 /*return*/];
                        }
                        param = sender.getParameters();
                        if (!param.encodings) {
                            param.encodings = [{}];
                        }
                        try {
                            for (_a = __values(param.encodings), _b = _a.next(); !_b.done; _b = _a.next()) {
                                encodeParam = _b.value;
                                encodeParam.maxBitrate = bitrateKbps * 1000;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, sender.setParameters(param)];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTransceiverController.replaceAudioTrackForSender = function (sender, track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sender) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, sender.replaceTrack(track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DefaultTransceiverController.prototype.localAudioTransceiver = function () {
        return this._localAudioTransceiver;
    };
    DefaultTransceiverController.prototype.localVideoTransceiver = function () {
        return this._localCameraTransceiver;
    };
    DefaultTransceiverController.prototype.setVideoSendingBitrateKbps = function (bitrateKbps) {
        return __awaiter(this, void 0, void 0, function () {
            var sender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this won't set bandwidth limitation for video in Chrome
                        if (!this._localCameraTransceiver || this._localCameraTransceiver.direction !== 'sendrecv') {
                            return [2 /*return*/];
                        }
                        sender = this._localCameraTransceiver.sender;
                        return [4 /*yield*/, DefaultTransceiverController.setVideoSendingBitrateKbpsForSender(sender, bitrateKbps, this.logger)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTransceiverController.prototype.setPeer = function (peer) {
        this.peer = peer;
    };
    DefaultTransceiverController.prototype.reset = function () {
        this._localCameraTransceiver = null;
        this._localAudioTransceiver = null;
        this.videoSubscriptions = [];
        this.defaultMediaStream = null;
        this.peer = null;
    };
    DefaultTransceiverController.prototype.useTransceivers = function () {
        if (!this.peer || !this.browserBehavior.requiresUnifiedPlan()) {
            return false;
        }
        return typeof this.peer.getTransceivers !== 'undefined';
    };
    DefaultTransceiverController.prototype.trackIsVideoInput = function (track) {
        if (!this._localCameraTransceiver) {
            return false;
        }
        return (track === this._localCameraTransceiver.sender.track ||
            track === this._localCameraTransceiver.receiver.track);
    };
    DefaultTransceiverController.prototype.setupLocalTransceivers = function () {
        if (!this.useTransceivers()) {
            return;
        }
        if (!this.defaultMediaStream && typeof MediaStream !== 'undefined') {
            this.defaultMediaStream = new MediaStream();
        }
        if (!this._localAudioTransceiver) {
            this._localAudioTransceiver = this.peer.addTransceiver('audio', {
                direction: 'inactive',
                streams: [this.defaultMediaStream],
            });
        }
        if (!this._localCameraTransceiver) {
            this._localCameraTransceiver = this.peer.addTransceiver('video', {
                direction: 'inactive',
                streams: [this.defaultMediaStream],
            });
        }
    };
    DefaultTransceiverController.prototype.replaceAudioTrack = function (track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._localAudioTransceiver || this._localAudioTransceiver.direction !== 'sendrecv') {
                            this.logger.info("audio transceiver direction is not set up or not activated");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this._localAudioTransceiver.sender.replaceTrack(track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DefaultTransceiverController.prototype.setAudioInput = function (track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setTransceiverInput(this._localAudioTransceiver, track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTransceiverController.prototype.setVideoInput = function (track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setTransceiverInput(this._localCameraTransceiver, track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultTransceiverController.prototype.updateVideoTransceivers = function (videoStreamIndex, videosToReceive) {
        var _this = this;
        if (!this.useTransceivers()) {
            return videosToReceive.array();
        }
        // See https://blog.mozilla.org/webrtc/rtcrtptransceiver-explored/ for details on transceivers
        var transceivers = this.peer.getTransceivers();
        // Subscription index 0 is reserved for transmitting camera.
        // We mark inactive slots with 0 in the subscription array.
        this.videoSubscriptions = [0];
        videosToReceive = videosToReceive.clone();
        this.unsubscribeTransceivers(transceivers, videoStreamIndex, videosToReceive);
        this.subscribeTransceivers(transceivers, videosToReceive);
        this.logger.debug(function () {
            return _this.debugDumpTransceivers();
        });
        return this.videoSubscriptions;
    };
    DefaultTransceiverController.prototype.unsubscribeTransceivers = function (transceivers, videoStreamIndex, videosToReceive) {
        var e_2, _a;
        try {
            // disable transceivers which are no longer going to subscribe
            for (var transceivers_1 = __values(transceivers), transceivers_1_1 = transceivers_1.next(); !transceivers_1_1.done; transceivers_1_1 = transceivers_1.next()) {
                var transceiver = transceivers_1_1.value;
                if (transceiver === this._localCameraTransceiver || !this.transceiverIsVideo(transceiver)) {
                    continue;
                }
                // by convention with the video host, msid is equal to the media section mid, prefixed with the string "v_"
                // we use this to get the streamId for the track
                var streamId = videoStreamIndex.streamIdForTrack('v_' + transceiver.mid);
                if (streamId !== undefined && videosToReceive.contain(streamId)) {
                    transceiver.direction = 'recvonly';
                    this.videoSubscriptions.push(streamId);
                    videosToReceive.remove(streamId);
                }
                else {
                    transceiver.direction = 'inactive';
                    // mark this slot inactive with a 0 in the subscription array
                    this.videoSubscriptions.push(0);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (transceivers_1_1 && !transceivers_1_1.done && (_a = transceivers_1.return)) _a.call(transceivers_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    DefaultTransceiverController.prototype.subscribeTransceivers = function (transceivers, videosToReceive) {
        var e_3, _a, e_4, _b;
        if (videosToReceive.size() === 0) {
            return;
        }
        // Handle remaining subscriptions using existing inactive transceivers.
        var videosRemaining = videosToReceive.array();
        // Begin counting out index in the the subscription array at 1 since the camera.
        // Always occupies position 0 (whether active or not).
        var n = 1;
        try {
            for (var transceivers_2 = __values(transceivers), transceivers_2_1 = transceivers_2.next(); !transceivers_2_1.done; transceivers_2_1 = transceivers_2.next()) {
                var transceiver = transceivers_2_1.value;
                if (transceiver === this._localCameraTransceiver || !this.transceiverIsVideo(transceiver)) {
                    continue;
                }
                if (transceiver.direction === 'inactive') {
                    transceiver.direction = 'recvonly';
                    var streamId = videosRemaining.shift();
                    this.videoSubscriptions[n] = streamId;
                    if (videosRemaining.length === 0) {
                        break;
                    }
                }
                n += 1;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (transceivers_2_1 && !transceivers_2_1.done && (_a = transceivers_2.return)) _a.call(transceivers_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            // add transceivers for the remaining subscriptions
            for (var videosRemaining_1 = __values(videosRemaining), videosRemaining_1_1 = videosRemaining_1.next(); !videosRemaining_1_1.done; videosRemaining_1_1 = videosRemaining_1.next()) {
                var index = videosRemaining_1_1.value;
                // @ts-ignore
                var transceiver = this.peer.addTransceiver('video', {
                    direction: 'recvonly',
                    streams: [this.defaultMediaStream],
                });
                this.videoSubscriptions.push(index);
                this.logger.info("adding transceiver mid: " + transceiver.mid + " subscription: " + index + " direction: recvonly");
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (videosRemaining_1_1 && !videosRemaining_1_1.done && (_b = videosRemaining_1.return)) _b.call(videosRemaining_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    DefaultTransceiverController.prototype.transceiverIsVideo = function (transceiver) {
        return ((transceiver.receiver &&
            transceiver.receiver.track &&
            transceiver.receiver.track.kind === 'video') ||
            (transceiver.sender && transceiver.sender.track && transceiver.sender.track.kind === 'video'));
    };
    DefaultTransceiverController.prototype.debugDumpTransceivers = function () {
        var e_5, _a;
        var msg = '';
        var n = 0;
        try {
            for (var _b = __values(this.peer.getTransceivers()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var transceiver = _c.value;
                if (!this.transceiverIsVideo(transceiver)) {
                    continue;
                }
                msg += "transceiver index=" + n + " mid=" + transceiver.mid + " subscription=" + this.videoSubscriptions[n] + " direction=" + transceiver.direction + "\n";
                n += 1;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return msg;
    };
    DefaultTransceiverController.prototype.setTransceiverInput = function (transceiver, track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!transceiver) {
                            return [2 /*return*/];
                        }
                        if (track) {
                            transceiver.direction = 'sendrecv';
                        }
                        else {
                            transceiver.direction = 'inactive';
                        }
                        return [4 /*yield*/, transceiver.sender.replaceTrack(track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DefaultTransceiverController;
}());
exports.default = DefaultTransceiverController;
//# sourceMappingURL=DefaultTransceiverController.js.map