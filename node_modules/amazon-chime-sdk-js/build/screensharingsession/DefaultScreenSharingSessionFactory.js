"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultScreenSharingSession_1 = require("./DefaultScreenSharingSession");
var DefaultScreenSharingSessionFactory = /** @class */ (function () {
    function DefaultScreenSharingSessionFactory(mediaConstraintsProvider, webSocketFactory, messageSerialization, mediaStreamBroker, screenShareStreamFactory, mediaRecordingFactory, logger, timeSliceMs) {
        if (timeSliceMs === void 0) { timeSliceMs = 100; }
        this.mediaConstraintsProvider = mediaConstraintsProvider;
        this.webSocketFactory = webSocketFactory;
        this.messageSerialization = messageSerialization;
        this.mediaStreamBroker = mediaStreamBroker;
        this.screenShareStreamFactory = screenShareStreamFactory;
        this.mediaRecordingFactory = mediaRecordingFactory;
        this.logger = logger;
        this.timeSliceMs = timeSliceMs;
    }
    DefaultScreenSharingSessionFactory.prototype.create = function (url, sessionToken) {
        var protocols = [DefaultScreenSharingSessionFactory.SessionKey, sessionToken];
        var webSocket = this.webSocketFactory.create(url, protocols, DefaultScreenSharingSessionFactory.BinaryType);
        return new DefaultScreenSharingSession_1.default(webSocket, this.mediaConstraintsProvider, this.timeSliceMs, this.messageSerialization, this.mediaStreamBroker, this.screenShareStreamFactory, this.mediaRecordingFactory, this.logger);
    };
    DefaultScreenSharingSessionFactory.SessionKey = '_aws_wt_session';
    DefaultScreenSharingSessionFactory.BinaryType = 'arraybuffer';
    return DefaultScreenSharingSessionFactory;
}());
exports.default = DefaultScreenSharingSessionFactory;
//# sourceMappingURL=DefaultScreenSharingSessionFactory.js.map