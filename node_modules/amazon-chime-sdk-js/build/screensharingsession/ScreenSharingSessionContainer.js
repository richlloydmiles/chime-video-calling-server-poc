"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var FullJitterBackoffFactory_1 = require("../backoff/FullJitterBackoffFactory");
var DefaultDOMWebSocketFactory_1 = require("../domwebsocket/DefaultDOMWebSocketFactory");
var Maybe_1 = require("../maybe/Maybe");
var WebMMediaRecordingFactory_1 = require("../mediarecording/WebMMediaRecordingFactory");
var DefaultPromisedWebSocketFactory_1 = require("../promisedwebsocket/DefaultPromisedWebSocketFactory");
var ReconnectingPromisedWebSocketFactory_1 = require("../promisedwebsocket/ReconnectingPromisedWebSocketFactory");
var ProtocolScreenMessageDetailSerialization_1 = require("../screenmessagedetailserialization/ProtocolScreenMessageDetailSerialization");
var ScreenShareStreamFactory_1 = require("../screensharestreaming/ScreenShareStreamFactory");
var ScreenSharingMessageFlagSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageFlagSerializer");
var ScreenSharingMessageSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageSerializer");
var ScreenSharingMessageTypeSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageTypeSerializer");
var DefaultScreenSharingSessionFactory_1 = require("./DefaultScreenSharingSessionFactory");
var ScreenSharingSessionContainer = /** @class */ (function () {
    function ScreenSharingSessionContainer(mediaStreamBroker, logger, options) {
        if (options === void 0) { options = {}; }
        this.mediaStreamBroker = mediaStreamBroker;
        this.logger = logger;
        this.options = options;
        this.screenSharingSessionFactoryMemo = null;
        this.backoffFactoryMemo = null;
    }
    ScreenSharingSessionContainer.prototype.screenSharingSessionFactory = function () {
        this.screenSharingSessionFactoryMemo =
            this.screenSharingSessionFactoryMemo ||
                new DefaultScreenSharingSessionFactory_1.default(this.displayMediaConstraints, this.reconnectingPromisedWebSocketFactory(), this.messageSerialization(), this.mediaStreamBroker, this.screenSharingStreamFactory(), this.mediaRecordingFactory(), this.logger);
        return this.screenSharingSessionFactoryMemo;
    };
    ScreenSharingSessionContainer.prototype.displayMediaConstraints = function (sourceId) {
        return {
            audio: false,
            video: __assign(__assign({}, (!sourceId && {
                frameRate: {
                    max: 3,
                },
            })), (sourceId && {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: sourceId,
                    maxFrameRate: 3,
                },
            })),
        };
    };
    ScreenSharingSessionContainer.prototype.screenSharingStreamFactory = function () {
        return new ScreenShareStreamFactory_1.default();
    };
    ScreenSharingSessionContainer.prototype.mediaRecordingFactory = function () {
        var options = {};
        Maybe_1.default.of(this.options.bitRate).map(function (f) { return (options.videoBitsPerSecond = f); });
        return new WebMMediaRecordingFactory_1.default(options);
    };
    ScreenSharingSessionContainer.prototype.reconnectingPromisedWebSocketFactory = function () {
        return new ReconnectingPromisedWebSocketFactory_1.default(this.promisedWebSocketFactory(), this.backOffFactory(), Maybe_1.default.of(this.options.reconnectRetryLimit).getOrElse(5));
    };
    ScreenSharingSessionContainer.prototype.backOffFactory = function () {
        this.backoffFactoryMemo =
            this.backoffFactoryMemo || new FullJitterBackoffFactory_1.default(1000, 100, 300);
        return this.backoffFactoryMemo;
    };
    ScreenSharingSessionContainer.prototype.promisedWebSocketFactory = function () {
        return new DefaultPromisedWebSocketFactory_1.default(this.domWebSocketFactory());
    };
    ScreenSharingSessionContainer.prototype.domWebSocketFactory = function () {
        return new DefaultDOMWebSocketFactory_1.default();
    };
    ScreenSharingSessionContainer.prototype.messageSerialization = function () {
        return new ScreenSharingMessageSerializer_1.default(this.typeSerialization(), this.flagSerialization(), this.screenSignalingSerialization());
    };
    ScreenSharingSessionContainer.prototype.typeSerialization = function () {
        return new ScreenSharingMessageTypeSerializer_1.default();
    };
    ScreenSharingSessionContainer.prototype.flagSerialization = function () {
        return new ScreenSharingMessageFlagSerializer_1.default();
    };
    ScreenSharingSessionContainer.prototype.screenSignalingSerialization = function () {
        return new ProtocolScreenMessageDetailSerialization_1.default();
    };
    return ScreenSharingSessionContainer;
}());
exports.default = ScreenSharingSessionContainer;
//# sourceMappingURL=ScreenSharingSessionContainer.js.map