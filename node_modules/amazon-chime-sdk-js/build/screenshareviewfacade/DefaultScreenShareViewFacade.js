"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var FullJitterBackoffFactory_1 = require("../backoff/FullJitterBackoffFactory");
var DefaultDOMWebSocketFactory_1 = require("../domwebsocket/DefaultDOMWebSocketFactory");
var DefaultDragObserver_1 = require("../dragobserver/DefaultDragObserver");
var Maybe_1 = require("../maybe/Maybe");
var DefaultPromisedWebSocketFactory_1 = require("../promisedwebsocket/DefaultPromisedWebSocketFactory");
var ReconnectingPromisedWebSocketFactory_1 = require("../promisedwebsocket/ReconnectingPromisedWebSocketFactory");
var ResizeObserverAdapterFactory_1 = require("../resizeobserveradapter/ResizeObserverAdapterFactory");
var ScreenSignalingSessionContainer_1 = require("../screensignalingsession/ScreenSignalingSessionContainer");
var DefaultScreenViewingComponentContext_1 = require("../screenviewing/context/DefaultScreenViewingComponentContext");
var DefaultScreenViewing_1 = require("../screenviewing/DefaultScreenViewing");
var ScreenViewingSessionConnectionRequest_1 = require("../screenviewing/session/ScreenViewingSessionConnectionRequest");
var DefaultScreenShareViewFacade = /** @class */ (function () {
    function DefaultScreenShareViewFacade(configuration, logger) {
        this.configuration = configuration;
        this.logger = logger;
        var reconnectingWSFactory = new ReconnectingPromisedWebSocketFactory_1.default(new DefaultPromisedWebSocketFactory_1.default(new DefaultDOMWebSocketFactory_1.default()), new FullJitterBackoffFactory_1.default(1000, 100, 300), Maybe_1.default.of(configuration.screenSharingSessionOptions.reconnectRetryLimit).getOrElse(5));
        this.screenViewing = new DefaultScreenViewing_1.default(new DefaultScreenViewingComponentContext_1.default(new ResizeObserverAdapterFactory_1.default(), function (window, callback, element) {
            return new DefaultDragObserver_1.default(window, element, callback);
        }, reconnectingWSFactory, new ScreenSignalingSessionContainer_1.default(reconnectingWSFactory, logger).screenSignalingSessionFactory(), this.logger, {}, window));
    }
    DefaultScreenShareViewFacade.prototype.open = function () {
        var connectionRequest = new ScreenViewingSessionConnectionRequest_1.default(this.configuration.urls.screenViewingURL, this.configuration.urls.screenDataURL, this.configuration.credentials.joinToken, this.configuration.screenViewingTimeoutMs);
        return this.screenViewing.open(connectionRequest);
    };
    DefaultScreenShareViewFacade.prototype.close = function () {
        return this.screenViewing.close();
    };
    DefaultScreenShareViewFacade.prototype.start = function (element) {
        this.logger.warn('ScreenShareViewFacade has been deprecated and will be removed ' +
            'beginning with version 2.0.0. Instead use the ' +
            'startContentShareFromScreenCapture() and stopContentShare() methods ' +
            'on the AudioVideoFacade.');
        return this.screenViewing.start(element);
    };
    DefaultScreenShareViewFacade.prototype.stop = function () {
        return this.screenViewing.stop();
    };
    DefaultScreenShareViewFacade.prototype.presentScaleToFit = function () {
        this.screenViewing.presentScaleToFit();
    };
    DefaultScreenShareViewFacade.prototype.presentDragAndZoom = function () {
        this.screenViewing.presentDragAndZoom();
    };
    DefaultScreenShareViewFacade.prototype.zoomIn = function (relativeZoomFactor) {
        this.screenViewing.zoomIn(relativeZoomFactor);
    };
    DefaultScreenShareViewFacade.prototype.zoomOut = function (relativeZoomFactor) {
        this.screenViewing.zoomOut(relativeZoomFactor);
    };
    DefaultScreenShareViewFacade.prototype.zoom = function (absoluteZoomFactor) {
        this.screenViewing.zoom(absoluteZoomFactor);
    };
    DefaultScreenShareViewFacade.prototype.zoomReset = function () {
        this.screenViewing.zoomReset();
    };
    DefaultScreenShareViewFacade.prototype.registerObserver = function (observer) {
        this.screenViewing.registerObserver(observer);
    };
    DefaultScreenShareViewFacade.prototype.unregisterObserver = function (observer) {
        this.screenViewing.unregisterObserver(observer);
    };
    return DefaultScreenShareViewFacade;
}());
exports.default = DefaultScreenShareViewFacade;
//# sourceMappingURL=DefaultScreenShareViewFacade.js.map