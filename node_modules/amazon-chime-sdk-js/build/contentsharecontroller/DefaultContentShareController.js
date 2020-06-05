"use strict";
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var Maybe_1 = require("../maybe/Maybe");
var MeetingSessionConfiguration_1 = require("../meetingsession/MeetingSessionConfiguration");
var MeetingSessionCredentials_1 = require("../meetingsession/MeetingSessionCredentials");
var AsyncScheduler_1 = require("../scheduler/AsyncScheduler");
var ContentShareConstants_1 = require("./ContentShareConstants");
var DefaultContentShareController = /** @class */ (function () {
    function DefaultContentShareController(mediaStreamBroker, audioVideo) {
        this.mediaStreamBroker = mediaStreamBroker;
        this.audioVideo = audioVideo;
        this.observerQueue = new Set();
        this.audioVideo.addObserver(this);
    }
    DefaultContentShareController.createContentShareMeetingSessionConfigure = function (configuration) {
        var contentShareConfiguration = new MeetingSessionConfiguration_1.default();
        contentShareConfiguration.meetingId = configuration.meetingId;
        contentShareConfiguration.urls = configuration.urls;
        contentShareConfiguration.credentials = new MeetingSessionCredentials_1.default();
        contentShareConfiguration.credentials.attendeeId =
            configuration.credentials.attendeeId + ContentShareConstants_1.default.Modality;
        contentShareConfiguration.credentials.joinToken =
            configuration.credentials.joinToken + ContentShareConstants_1.default.Modality;
        return contentShareConfiguration;
    };
    DefaultContentShareController.prototype.startContentShare = function (stream) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            var _this = this;
            return __generator(this, function (_a) {
                if (!stream) {
                    return [2 /*return*/];
                }
                this.mediaStreamBroker.mediaStream = stream;
                for (i = 0; i < this.mediaStreamBroker.mediaStream.getTracks().length; i++) {
                    this.mediaStreamBroker.mediaStream.getTracks()[i].addEventListener('ended', function () {
                        _this.stopContentShare();
                    });
                }
                this.audioVideo.start();
                if (this.mediaStreamBroker.mediaStream.getVideoTracks().length > 0) {
                    this.audioVideo.videoTileController.startLocalVideoTile();
                }
                return [2 /*return*/];
            });
        });
    };
    DefaultContentShareController.prototype.startContentShareFromScreenCapture = function (sourceId, frameRate) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaStream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaStreamBroker.acquireScreenCaptureDisplayInputStream(sourceId, frameRate)];
                    case 1:
                        mediaStream = _a.sent();
                        return [4 /*yield*/, this.startContentShare(mediaStream)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DefaultContentShareController.prototype.pauseContentShare = function () {
        if (this.mediaStreamBroker.toggleMediaStream(false)) {
            this.forEachContentShareObserver(function (observer) {
                Maybe_1.default.of(observer.contentShareDidPause).map(function (f) { return f.bind(observer)(); });
            });
        }
    };
    DefaultContentShareController.prototype.unpauseContentShare = function () {
        if (this.mediaStreamBroker.toggleMediaStream(true)) {
            this.forEachContentShareObserver(function (observer) {
                Maybe_1.default.of(observer.contentShareDidUnpause).map(function (f) { return f.bind(observer)(); });
            });
        }
    };
    DefaultContentShareController.prototype.stopContentShare = function () {
        this.audioVideo.stop();
        this.mediaStreamBroker.cleanup();
    };
    DefaultContentShareController.prototype.addContentShareObserver = function (observer) {
        this.observerQueue.add(observer);
    };
    DefaultContentShareController.prototype.removeContentShareObserver = function (observer) {
        this.observerQueue.delete(observer);
    };
    DefaultContentShareController.prototype.forEachContentShareObserver = function (observerFunc) {
        var e_1, _a;
        var _this = this;
        var _loop_1 = function (observer) {
            new AsyncScheduler_1.default().start(function () {
                if (_this.observerQueue.has(observer)) {
                    observerFunc(observer);
                }
            });
        };
        try {
            for (var _b = __values(this.observerQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                _loop_1(observer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    DefaultContentShareController.prototype.audioVideoDidStart = function () {
        this.forEachContentShareObserver(function (observer) {
            Maybe_1.default.of(observer.contentShareDidStart).map(function (f) { return f.bind(observer)(); });
        });
    };
    DefaultContentShareController.prototype.audioVideoDidStop = function (_sessionStatus) {
        //If the content attendee got dropped or could not connect, stopContentShare will not be called
        //So make sure to clean up the media stream.
        this.mediaStreamBroker.cleanup();
        this.forEachContentShareObserver(function (observer) {
            Maybe_1.default.of(observer.contentShareDidStop).map(function (f) { return f.bind(observer)(); });
        });
    };
    return DefaultContentShareController;
}());
exports.default = DefaultContentShareController;
//# sourceMappingURL=DefaultContentShareController.js.map