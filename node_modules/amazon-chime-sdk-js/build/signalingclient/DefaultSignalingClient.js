"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var WebSocketReadyState_1 = require("../websocketadapter/WebSocketReadyState");
var SignalingClientEvent_1 = require("./SignalingClientEvent");
var SignalingClientEventType_1 = require("./SignalingClientEventType");
/**
 * [[DefaultSignalingClient]] implements the SignalingClient interface.
 */
var DefaultSignalingClient = /** @class */ (function () {
    function DefaultSignalingClient(webSocket, logger) {
        this.webSocket = webSocket;
        this.logger = logger;
        this.unloadHandler = null;
        this.observerQueue = new Set();
        this.connectionRequestQueue = [];
        this.resetConnection();
        this.logger.debug(function () { return 'signaling client init'; });
    }
    DefaultSignalingClient.prototype.registerObserver = function (observer) {
        this.logger.debug(function () { return 'registering signaling client observer'; });
        this.observerQueue.add(observer);
    };
    DefaultSignalingClient.prototype.removeObserver = function (observer) {
        this.logger.debug(function () { return 'removing signaling client observer'; });
        this.observerQueue.delete(observer);
    };
    DefaultSignalingClient.prototype.openConnection = function (request) {
        this.logger.info('adding connection request to queue: ' + request.url());
        this.connectionRequestQueue.push(request);
        this.closeConnection();
    };
    DefaultSignalingClient.prototype.pingPong = function (pingPongFrame) {
        this.logger.debug(function () { return 'sending ping'; });
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.PING_PONG;
        message.pingPong = pingPongFrame;
        this.sendMessage(message);
        return message.timestampMs;
    };
    DefaultSignalingClient.prototype.join = function (settings) {
        this.logger.info('sending join');
        var joinFrame = SignalingProtocol_js_1.SdkJoinFrame.create();
        joinFrame.protocolVersion = 2;
        joinFrame.maxNumOfVideos = settings.maxVideos;
        joinFrame.flags = SignalingProtocol_js_1.SdkJoinFlags.HAS_STREAM_UPDATE;
        // Only Chrome currently supports the new send side bandwidth estimation
        var browserBehavior = new DefaultBrowserBehavior_1.default();
        if (browserBehavior.hasChromiumWebRTC()) {
            joinFrame.flags |= SignalingProtocol_js_1.SdkJoinFlags.USE_SEND_SIDE_BWE;
        }
        joinFrame.flags |= settings.sendBitrates ? SignalingProtocol_js_1.SdkJoinFlags.SEND_BITRATES : 0;
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.JOIN;
        message.join = joinFrame;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.subscribe = function (settings) {
        var subscribeFrame = SignalingProtocol_js_1.SdkSubscribeFrame.create();
        subscribeFrame.sendStreams = [];
        subscribeFrame.sdpOffer = settings.sdpOffer;
        subscribeFrame.audioCheckin = settings.audioCheckin;
        subscribeFrame.audioHost = settings.audioHost;
        subscribeFrame.audioMuted = settings.audioMuted;
        if (settings.connectionTypeHasVideo) {
            subscribeFrame.receiveStreamIds = settings.receiveStreamIds;
        }
        subscribeFrame.duplex = SignalingProtocol_js_1.SdkStreamServiceType.RX;
        if (!settings.audioCheckin) {
            var audioStream = SignalingProtocol_js_1.SdkStreamDescriptor.create();
            audioStream.mediaType = SignalingProtocol_js_1.SdkStreamMediaType.AUDIO;
            audioStream.trackLabel = 'AmazonChimeExpressAudio';
            audioStream.attendeeId = settings.attendeeId;
            audioStream.streamId = 1;
            audioStream.groupId = 1;
            audioStream.framerate = 15;
            audioStream.maxBitrateKbps = 600;
            audioStream.avgBitrateBps = 400000;
            subscribeFrame.sendStreams.push(audioStream);
        }
        if (settings.localVideoEnabled) {
            subscribeFrame.duplex = SignalingProtocol_js_1.SdkStreamServiceType.DUPLEX;
            var videoStream = SignalingProtocol_js_1.SdkStreamDescriptor.create();
            videoStream.mediaType = SignalingProtocol_js_1.SdkStreamMediaType.VIDEO;
            videoStream.trackLabel = 'AmazonChimeExpressVideo';
            videoStream.attendeeId = settings.attendeeId;
            videoStream.streamId = 2;
            videoStream.groupId = 2;
            videoStream.framerate = settings.videoInputFrameRate;
            videoStream.maxBitrateKbps = settings.videoInputMaxBitrateKbps;
            subscribeFrame.sendStreams.push(videoStream);
        }
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.SUBSCRIBE;
        message.sub = subscribeFrame;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.leave = function () {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.LEAVE;
        message.leave = SignalingProtocol_js_1.SdkLeaveFrame.create();
        this.sendMessage(message);
        this.logger.debug(function () {
            return 'sent leave';
        });
    };
    DefaultSignalingClient.prototype.sendClientMetrics = function (clientMetricFrame) {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.CLIENT_METRIC;
        message.clientMetric = clientMetricFrame;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.sendDataMessage = function (messageFrame) {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.DATA_MESSAGE;
        message.dataMessage = messageFrame;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.closeConnection = function () {
        if (this.webSocket.readyState() !== WebSocketReadyState_1.default.None &&
            this.webSocket.readyState() !== WebSocketReadyState_1.default.Closed) {
            this.isClosing = true;
            this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.WebSocketClosing, null));
            this.webSocket.close();
            this.deactivatePageUnloadHandler();
        }
        else {
            this.logger.info('no existing connection needs closing');
            this.serviceConnectionRequestQueue();
        }
    };
    DefaultSignalingClient.prototype.ready = function () {
        return (this.webSocket.readyState() === WebSocketReadyState_1.default.Open && !this.isClosing && this.wasOpened);
    };
    DefaultSignalingClient.prototype.mute = function (muted) {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.AUDIO_CONTROL;
        var audioControl = SignalingProtocol_js_1.SdkAudioControlFrame.create();
        audioControl.muted = muted;
        message.audioControl = audioControl;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.pause = function (streamIds) {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.PAUSE;
        message.pause = SignalingProtocol_js_1.SdkPauseResumeFrame.create();
        message.pause.streamIds = streamIds;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.resume = function (streamIds) {
        var message = SignalingProtocol_js_1.SdkSignalFrame.create();
        message.type = SignalingProtocol_js_1.SdkSignalFrame.Type.RESUME;
        message.pause = SignalingProtocol_js_1.SdkPauseResumeFrame.create();
        message.pause.streamIds = streamIds;
        this.sendMessage(message);
    };
    DefaultSignalingClient.prototype.resetConnection = function () {
        this.webSocket.destroy();
        this.wasOpened = false;
    };
    DefaultSignalingClient.prototype.sendMessage = function (message) {
        message.timestampMs = Date.now();
        this.logger.debug(function () { return "sending: " + JSON.stringify(message); });
        var buffer = this.prependWithFrameTypeRTC(SignalingProtocol_js_1.SdkSignalFrame.encode(message).finish());
        if (this.ready()) {
            if (!this.webSocket.send(buffer)) {
                this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.WebSocketSendMessageFailure, null));
                return;
            }
            this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.WebSocketSentMessage, null));
        }
        else {
            this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.WebSocketSkippedMessage, null));
        }
    };
    DefaultSignalingClient.prototype.receiveMessage = function (inBuffer) {
        var message;
        try {
            message = SignalingProtocol_js_1.SdkSignalFrame.decode(inBuffer);
        }
        catch (e) {
            this.logger.info("failed to decode: " + inBuffer);
            this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.ProtocolDecodeFailure, null));
            return;
        }
        this.logger.debug(function () { return "received: " + JSON.stringify(message); });
        if (this.webSocket.readyState() === WebSocketReadyState_1.default.Open) {
            this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.ReceivedSignalFrame, message));
        }
        else {
            this.logger.info("skipping notification of message since WebSocket is not open: " + JSON.stringify(message));
        }
    };
    DefaultSignalingClient.prototype.stripFrameTypeRTC = function (inBuffer) {
        var frameType = inBuffer[0];
        // TODO: change server frame type to send 0x05
        if (frameType !== DefaultSignalingClient.FRAME_TYPE_RTC && frameType !== 0x02) {
            this.logger.warn("expected FrameTypeRTC for message but got " + frameType);
        }
        return inBuffer.slice(1);
    };
    DefaultSignalingClient.prototype.prependWithFrameTypeRTC = function (inBuffer) {
        var outBuffer = new Uint8Array(inBuffer.length + 1);
        outBuffer[0] = DefaultSignalingClient.FRAME_TYPE_RTC;
        outBuffer.set(inBuffer, 1);
        return outBuffer;
    };
    DefaultSignalingClient.prototype.serviceConnectionRequestQueue = function () {
        if (this.connectionRequestQueue.length === 0) {
            this.logger.info('no connection requests to service');
            return;
        }
        var request = this.connectionRequestQueue.shift();
        this.logger.info("opening connection to " + request.url());
        this.isClosing = false;
        this.webSocket.create(request.url(), request.protocols());
        this.setUpEventListeners();
        this.sendEvent(new SignalingClientEvent_1.default(this, SignalingClientEventType_1.default.WebSocketConnecting, null));
    };
    DefaultSignalingClient.prototype.sendEvent = function (event) {
        var e_1, _a;
        var _this = this;
        switch (event.type) {
            case SignalingClientEventType_1.default.WebSocketMessage:
            case SignalingClientEventType_1.default.ReceivedSignalFrame:
            case SignalingClientEventType_1.default.WebSocketSentMessage:
                this.logger.debug(function () { return "notifying event: " + SignalingClientEventType_1.default[event.type]; });
                break;
            case SignalingClientEventType_1.default.WebSocketSkippedMessage:
                this.logger.debug(function () {
                    return "notifying event: " + SignalingClientEventType_1.default[event.type] + ", websocket state=" + WebSocketReadyState_1.default[_this.webSocket.readyState()];
                });
                break;
            default:
                this.logger.info("notifying event: " + SignalingClientEventType_1.default[event.type]);
                break;
        }
        try {
            for (var _b = __values(this.observerQueue), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                observer.handleSignalingClientEvent(event);
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
    DefaultSignalingClient.prototype.setUpEventListeners = function () {
        var _this = this;
        this.webSocket.addEventListener('open', function () {
            _this.activatePageUnloadHandler();
            _this.wasOpened = true;
            _this.sendEvent(new SignalingClientEvent_1.default(_this, SignalingClientEventType_1.default.WebSocketOpen, null));
        });
        this.webSocket.addEventListener('message', function (event) {
            _this.sendEvent(new SignalingClientEvent_1.default(_this, SignalingClientEventType_1.default.WebSocketMessage, null));
            _this.receiveMessage(_this.stripFrameTypeRTC(new Uint8Array(event.data)));
        });
        this.webSocket.addEventListener('close', function () {
            _this.deactivatePageUnloadHandler();
            _this.resetConnection();
            _this.sendEvent(new SignalingClientEvent_1.default(_this, SignalingClientEventType_1.default.WebSocketClosed, null));
            _this.serviceConnectionRequestQueue();
        });
        this.webSocket.addEventListener('error', function () {
            if (_this.isClosing && !_this.wasOpened) {
                _this.logger.info('ignoring error closing signaling while connecting');
                return;
            }
            if (_this.wasOpened) {
                _this.logger.error('received error while connected');
                _this.sendEvent(new SignalingClientEvent_1.default(_this, SignalingClientEventType_1.default.WebSocketError, null));
            }
            else {
                _this.logger.error('failed to connect');
                _this.sendEvent(new SignalingClientEvent_1.default(_this, SignalingClientEventType_1.default.WebSocketFailed, null));
            }
        });
    };
    DefaultSignalingClient.prototype.activatePageUnloadHandler = function () {
        var _this = this;
        this.unloadHandler = function () {
            _this.leave();
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var GlobalAny = global;
        GlobalAny['window'] &&
            GlobalAny['window']['addEventListener'] &&
            window.addEventListener('unload', this.unloadHandler);
    };
    DefaultSignalingClient.prototype.deactivatePageUnloadHandler = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var GlobalAny = global;
        GlobalAny['window'] &&
            GlobalAny['window']['addEventListener'] &&
            window.removeEventListener('unload', this.unloadHandler);
        this.unloadHandler = null;
    };
    DefaultSignalingClient.FRAME_TYPE_RTC = 0x5;
    return DefaultSignalingClient;
}());
exports.default = DefaultSignalingClient;
//# sourceMappingURL=DefaultSignalingClient.js.map