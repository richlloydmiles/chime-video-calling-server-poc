"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var DefaultSDP_1 = require("../sdp/DefaultSDP");
var SignalingClientEventType_1 = require("../signalingclient/SignalingClientEventType");
var SignalingClientSubscribe_1 = require("../signalingclient/SignalingClientSubscribe");
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var BaseTask_1 = require("./BaseTask");
/**
 * [[SubscribeAndReceiveSubscribeAckTask]] sends a subscribe frame with the given settings
 * and receives SdkSubscribeAckFrame.
 */
var SubscribeAndReceiveSubscribeAckTask = /** @class */ (function (_super) {
    __extends(SubscribeAndReceiveSubscribeAckTask, _super);
    function SubscribeAndReceiveSubscribeAckTask(context) {
        var _this = _super.call(this, context.logger) || this;
        _this.context = context;
        _this.taskName = 'SubscribeAndReceiveSubscribeAckTask';
        _this.taskCanceler = null;
        return _this;
    }
    SubscribeAndReceiveSubscribeAckTask.prototype.cancel = function () {
        if (this.taskCanceler) {
            this.taskCanceler.cancel();
            this.taskCanceler = null;
        }
    };
    SubscribeAndReceiveSubscribeAckTask.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localSdp, frameRate, maxEncodeBitrateKbps, isSendingStreams, subscribe, subscribeAckFrame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localSdp = '';
                        if (this.context.peer && this.context.peer.localDescription) {
                            if (this.context.browserBehavior.requiresUnifiedPlanMunging()) {
                                localSdp = new DefaultSDP_1.default(this.context.peer.localDescription.sdp).withUnifiedPlanFormat()
                                    .sdp;
                            }
                            else {
                                localSdp = this.context.peer.localDescription.sdp;
                            }
                        }
                        frameRate = 0;
                        maxEncodeBitrateKbps = 0;
                        if (this.context.videoCaptureAndEncodeParameter) {
                            frameRate = this.context.videoCaptureAndEncodeParameter.captureFrameRate();
                            maxEncodeBitrateKbps = this.context.videoCaptureAndEncodeParameter.encodeBitrates()[0];
                        }
                        isSendingStreams = this.context.videoDuplexMode === SignalingProtocol_js_1.SdkStreamServiceType.TX ||
                            this.context.videoDuplexMode === SignalingProtocol_js_1.SdkStreamServiceType.DUPLEX;
                        this.context.previousSdpOffer = new DefaultSDP_1.default(localSdp);
                        subscribe = new SignalingClientSubscribe_1.default(this.context.meetingSessionConfiguration.credentials.attendeeId, localSdp, this.context.meetingSessionConfiguration.urls.audioHostURL, this.context.realtimeController.realtimeIsLocalAudioMuted(), false, this.context.videoSubscriptions, isSendingStreams, frameRate, maxEncodeBitrateKbps, 
                        // TODO: handle check-in mode, or remove this param
                        true);
                        this.context.logger.info("sending subscribe: " + JSON.stringify(subscribe));
                        this.context.signalingClient.subscribe(subscribe);
                        return [4 /*yield*/, this.receiveSubscribeAck()];
                    case 1:
                        subscribeAckFrame = _a.sent();
                        this.context.logger.info("got subscribe ack: " + JSON.stringify(subscribeAckFrame));
                        this.context.sdpAnswer = subscribeAckFrame.sdpAnswer;
                        this.context.videoStreamIndex.integrateSubscribeAckFrame(subscribeAckFrame);
                        return [2 /*return*/];
                }
            });
        });
    };
    SubscribeAndReceiveSubscribeAckTask.prototype.receiveSubscribeAck = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var Interceptor = /** @class */ (function () {
                function Interceptor(signalingClient) {
                    this.signalingClient = signalingClient;
                }
                Interceptor.prototype.cancel = function () {
                    this.signalingClient.removeObserver(this);
                    reject(new Error("SubscribeAndReceiveSubscribeAckTask got canceled while waiting for SdkSubscribeAckFrame"));
                };
                Interceptor.prototype.handleSignalingClientEvent = function (event) {
                    if (event.type !== SignalingClientEventType_1.default.ReceivedSignalFrame ||
                        event.message.type !== SignalingProtocol_js_1.SdkSignalFrame.Type.SUBSCRIBE_ACK) {
                        return;
                    }
                    this.signalingClient.removeObserver(this);
                    // @ts-ignore: force cast to SdkSubscribeAckFrame
                    var subackFrame = event.message.suback;
                    resolve(subackFrame);
                };
                return Interceptor;
            }());
            var interceptor = new Interceptor(_this.context.signalingClient);
            _this.context.signalingClient.registerObserver(interceptor);
            _this.taskCanceler = interceptor;
        });
    };
    return SubscribeAndReceiveSubscribeAckTask;
}(BaseTask_1.default));
exports.default = SubscribeAndReceiveSubscribeAckTask;
//# sourceMappingURL=SubscribeAndReceiveSubscribeAckTask.js.map