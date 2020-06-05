"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultJPEGDecoderController_1 = require("../../jpegdecoder/controller/DefaultJPEGDecoderController");
var ScreenViewingMessageDispatcher_1 = require("../clientobserver/ScreenViewingMessageDispatcher");
var DefaultScreenViewingDeltaRenderer_1 = require("../deltarenderer/DefaultScreenViewingDeltaRenderer");
var DefaultScreenViewingDeltaSource_1 = require("../deltasource/DefaultScreenViewingDeltaSource");
var DefaultScreenViewingMessageHandler_1 = require("../messagehandler/DefaultScreenViewingMessageHandler");
var DefaultScreenViewingSession_1 = require("../session/DefaultScreenViewingSession");
var DefaultSignalingSession_1 = require("../signalingsession/DefaultSignalingSession");
var DefaultScreenViewingViewer_1 = require("../viewer/DefaultScreenViewingViewer");
var DefaultScreenViewingComponentContext = /** @class */ (function () {
    function DefaultScreenViewingComponentContext(resizeObserverAdapterFactory, dragObserverFactory, reconnectingWSFactory, screenSignalingSessionFactory, logger, providers, window) {
        var session = this.createSession(reconnectingWSFactory, logger, providers);
        var jpegDecoderController = this.createJPEGDecoderController(logger, providers);
        var deltaRenderer = this.createDeltaRenderer(jpegDecoderController, logger, window, resizeObserverAdapterFactory, dragObserverFactory, providers);
        var deltaSource = this.createDeltaSource(deltaRenderer, logger, providers);
        var viewer = this.createViewer(deltaRenderer, logger, providers);
        var messageHandler = this.createMessageHandler(session, deltaRenderer, deltaSource, viewer, logger, providers);
        var messageDispatcher = this.createMessageDispatcher(messageHandler, providers);
        var signalingSession = this.createSignalingSession(screenSignalingSessionFactory, providers);
        signalingSession.registerObserver({
            streamDidStart: function (_screenMessageDetail) {
                deltaRenderer.revealViewport();
            },
            streamDidStop: function (_screenMessageDetail) {
                deltaRenderer.hideViewport();
            },
        });
        this.viewingSession = session.withObserver(messageDispatcher);
        this.deltaRenderer = deltaRenderer;
        this.deltaSource = deltaSource;
        this.jpegDecoderController = jpegDecoderController;
        this.messageDispatcher = messageDispatcher;
        this.messageHandler = messageHandler;
        this.signalingSession = signalingSession;
        this.viewer = viewer;
    }
    DefaultScreenViewingComponentContext.prototype.createSession = function (reconnectingWSFactory, logger, providers) {
        var screenViewingSession = new DefaultScreenViewingSession_1.default(reconnectingWSFactory, logger);
        return ((providers && providers.sessionProvider && providers.sessionProvider(screenViewingSession)) ||
            screenViewingSession);
    };
    DefaultScreenViewingComponentContext.prototype.createDeltaRenderer = function (jpegDecoderController, logger, window, resizeObserverAdapterFactory, dragObserverFactory, providers) {
        var deltaRenderer = new DefaultScreenViewingDeltaRenderer_1.default(jpegDecoderController, logger, window, resizeObserverAdapterFactory, dragObserverFactory);
        return ((providers &&
            providers.deltaRendererProvider &&
            providers.deltaRendererProvider(deltaRenderer)) ||
            deltaRenderer);
    };
    DefaultScreenViewingComponentContext.prototype.createDeltaSource = function (deltaRenderer, logger, providers) {
        var deltaSource = new DefaultScreenViewingDeltaSource_1.default(deltaRenderer, logger);
        return ((providers && providers.deltaSourceProvider && providers.deltaSourceProvider(deltaSource)) ||
            deltaSource);
    };
    DefaultScreenViewingComponentContext.prototype.createJPEGDecoderController = function (logger, providers) {
        var jpegDecoderController = new DefaultJPEGDecoderController_1.default(logger, 65536);
        return ((providers &&
            providers.jpegDecoderControllerProvider &&
            providers.jpegDecoderControllerProvider(jpegDecoderController)) ||
            jpegDecoderController);
    };
    DefaultScreenViewingComponentContext.prototype.createMessageDispatcher = function (messageHandler, providers) {
        var messageDispatcher = new ScreenViewingMessageDispatcher_1.default(messageHandler);
        return ((providers &&
            providers.messageDispatcherProvider &&
            providers.messageDispatcherProvider(messageDispatcher)) ||
            messageDispatcher);
    };
    DefaultScreenViewingComponentContext.prototype.createMessageHandler = function (session, deltaRenderer, deltaSource, viewer, logger, providers) {
        var messageHandler = new DefaultScreenViewingMessageHandler_1.default(session, deltaRenderer, deltaSource, viewer, logger);
        return ((providers &&
            providers.messageHandlerProvider &&
            providers.messageHandlerProvider(messageHandler)) ||
            messageHandler);
    };
    DefaultScreenViewingComponentContext.prototype.createViewer = function (deltaRenderer, logger, providers) {
        var viewer = new DefaultScreenViewingViewer_1.default(deltaRenderer, logger);
        return (providers && providers.viewerProvider && providers.viewerProvider(viewer)) || viewer;
    };
    DefaultScreenViewingComponentContext.prototype.createSignalingSession = function (screenSignalingSessionFactory, providers) {
        var signalingSession = new DefaultSignalingSession_1.default(screenSignalingSessionFactory);
        return ((providers && providers.signalingSession && providers.signalingSession(signalingSession)) ||
            signalingSession);
    };
    return DefaultScreenViewingComponentContext;
}());
exports.default = DefaultScreenViewingComponentContext;
//# sourceMappingURL=DefaultScreenViewingComponentContext.js.map