"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var MediaRecordingEvent_1 = require("../mediarecording/MediaRecordingEvent");
var ScreenSharingMessageFlag_1 = require("../screensharingmessage/ScreenSharingMessageFlag");
var ScreenSharingMessageType_1 = require("../screensharingmessage/ScreenSharingMessageType");
var ScreenShareStreamingEvent_1 = require("./ScreenShareStreamingEvent");
var ScreenShareStream = /** @class */ (function () {
    function ScreenShareStream(mediaRecording) {
        this.mediaRecording = mediaRecording;
        this.listeners = new Map();
    }
    ScreenShareStream.prototype.key = function () {
        return this.mediaRecording.key();
    };
    ScreenShareStream.prototype.start = function (timeSliceMs) {
        var _this = this;
        this.mediaRecording.addEventListener('dataavailable', function (event) {
            _this.onDataAvailable(event);
        });
        this.mediaRecording.addEventListener(MediaRecordingEvent_1.default.EndedEvent, function () {
            _this.dispatchEvent(new CustomEvent(ScreenShareStreamingEvent_1.default.EndedEvent));
        });
        var message = {
            type: ScreenSharingMessageType_1.default.StreamStart,
            flags: [ScreenSharingMessageFlag_1.default.Local],
            data: new Uint8Array([]),
        };
        this.dispatchEvent(this.newMessageEvent(message));
        this.mediaRecording.start(timeSliceMs);
    };
    ScreenShareStream.prototype.stop = function () {
        var _this = this;
        return this.mediaRecording.stop().then(function () {
            var message = {
                type: ScreenSharingMessageType_1.default.StreamEnd,
                flags: [ScreenSharingMessageFlag_1.default.Local],
                data: new Uint8Array([]),
            };
            _this.dispatchEvent(_this.newMessageEvent(message));
        });
    };
    ScreenShareStream.prototype.pause = function () {
        var _this = this;
        return this.mediaRecording.pause().then(function () {
            var message = {
                type: ScreenSharingMessageType_1.default.StreamPause,
                flags: [ScreenSharingMessageFlag_1.default.Local],
                data: new Uint8Array([]),
            };
            _this.dispatchEvent(_this.newMessageEvent(message));
        });
    };
    ScreenShareStream.prototype.unpause = function () {
        var _this = this;
        return this.mediaRecording.unpause().then(function () {
            var message = {
                type: ScreenSharingMessageType_1.default.StreamUnpause,
                flags: [ScreenSharingMessageFlag_1.default.Local],
                data: new Uint8Array([]),
            };
            _this.dispatchEvent(_this.newMessageEvent(message));
        });
    };
    ScreenShareStream.prototype.addEventListener = function (type, listener) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, new Set());
        }
        this.listeners.get(type).add(listener);
    };
    ScreenShareStream.prototype.dispatchEvent = function (event) {
        if (this.listeners.has(event.type)) {
            this.listeners.get(event.type).forEach(function (listener) {
                listener(event);
            });
        }
        return event.defaultPrevented;
    };
    ScreenShareStream.prototype.removeEventListener = function (type, listener) {
        if (this.listeners.has(type)) {
            this.listeners.get(type).delete(listener);
        }
    };
    ScreenShareStream.prototype.onDataAvailable = function (event) {
        if (event.data.size !== 0) {
            var message = {
                type: ScreenSharingMessageType_1.default.WebM,
                flags: [ScreenSharingMessageFlag_1.default.Broadcast],
                data: event.data,
            };
            this.dispatchEvent(this.newMessageEvent(message));
        }
    };
    ScreenShareStream.prototype.newMessageEvent = function (message) {
        return new CustomEvent(ScreenShareStreamingEvent_1.default.MessageEvent, {
            detail: message,
        });
    };
    return ScreenShareStream;
}());
exports.default = ScreenShareStream;
//# sourceMappingURL=ScreenShareStream.js.map