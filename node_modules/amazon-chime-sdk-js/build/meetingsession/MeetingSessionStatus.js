"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var MeetingSessionStatusCode_1 = require("./MeetingSessionStatusCode");
/**
 * [[MeetingSessionStatus]] indicates a status received regarding the session.
 */
var MeetingSessionStatus = /** @class */ (function () {
    function MeetingSessionStatus(_statusCode) {
        this._statusCode = _statusCode;
    }
    MeetingSessionStatus.prototype.statusCode = function () {
        return this._statusCode;
    };
    MeetingSessionStatus.prototype.isFailure = function () {
        switch (this._statusCode) {
            case MeetingSessionStatusCode_1.default.AudioAuthenticationRejected:
            case MeetingSessionStatusCode_1.default.AudioCallAtCapacity:
            case MeetingSessionStatusCode_1.default.AudioInternalServerError:
            case MeetingSessionStatusCode_1.default.AudioServiceUnavailable:
            case MeetingSessionStatusCode_1.default.AudioDisconnected:
            case MeetingSessionStatusCode_1.default.VideoCallAtSourceCapacity:
            case MeetingSessionStatusCode_1.default.SignalingBadRequest:
            case MeetingSessionStatusCode_1.default.SignalingInternalServerError:
            case MeetingSessionStatusCode_1.default.SignalingRequestFailed:
            case MeetingSessionStatusCode_1.default.StateMachineTransitionFailed:
            case MeetingSessionStatusCode_1.default.ICEGatheringTimeoutWorkaround:
            case MeetingSessionStatusCode_1.default.ConnectionHealthReconnect:
            case MeetingSessionStatusCode_1.default.RealtimeApiFailed:
            case MeetingSessionStatusCode_1.default.TaskFailed:
                return true;
            default:
                return false;
        }
    };
    MeetingSessionStatus.prototype.isTerminal = function () {
        switch (this._statusCode) {
            case MeetingSessionStatusCode_1.default.Left:
            case MeetingSessionStatusCode_1.default.AudioJoinedFromAnotherDevice:
            case MeetingSessionStatusCode_1.default.AudioAuthenticationRejected:
            case MeetingSessionStatusCode_1.default.AudioCallAtCapacity:
            case MeetingSessionStatusCode_1.default.AudioCallEnded:
            case MeetingSessionStatusCode_1.default.AudioInternalServerError:
            case MeetingSessionStatusCode_1.default.AudioDisconnected:
            case MeetingSessionStatusCode_1.default.SignalingBadRequest:
            case MeetingSessionStatusCode_1.default.SignalingInternalServerError:
            case MeetingSessionStatusCode_1.default.SignalingRequestFailed:
            case MeetingSessionStatusCode_1.default.VideoCallAtSourceCapacity:
            case MeetingSessionStatusCode_1.default.RealtimeApiFailed:
                return true;
            default:
                return false;
        }
    };
    MeetingSessionStatus.prototype.isAudioConnectionFailure = function () {
        switch (this._statusCode) {
            case MeetingSessionStatusCode_1.default.AudioAuthenticationRejected:
            case MeetingSessionStatusCode_1.default.AudioInternalServerError:
            case MeetingSessionStatusCode_1.default.AudioServiceUnavailable:
            case MeetingSessionStatusCode_1.default.StateMachineTransitionFailed:
            case MeetingSessionStatusCode_1.default.ICEGatheringTimeoutWorkaround:
            case MeetingSessionStatusCode_1.default.SignalingBadRequest:
            case MeetingSessionStatusCode_1.default.SignalingInternalServerError:
            case MeetingSessionStatusCode_1.default.SignalingRequestFailed:
            case MeetingSessionStatusCode_1.default.RealtimeApiFailed:
                return true;
            default:
                return false;
        }
    };
    MeetingSessionStatus.fromSignalFrame = function (frame) {
        if (frame.error && frame.error.status) {
            return this.fromSignalingStatus(frame.error.status);
        }
        else if (frame.type === SignalingProtocol_js_1.SdkSignalFrame.Type.AUDIO_STATUS) {
            if (frame.audioStatus) {
                return this.fromAudioStatus(frame.audioStatus.audioStatus);
            }
            return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.SignalingRequestFailed);
        }
        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.OK);
    };
    MeetingSessionStatus.fromAudioStatus = function (status) {
        // TODO: Add these numbers to proto definition and reference them here.
        switch (status) {
            case 200:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.OK);
            case 301:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioJoinedFromAnotherDevice);
            case 302:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioDisconnectAudio);
            case 403:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioAuthenticationRejected);
            case 409:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioCallAtCapacity);
            case 410:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioCallEnded);
            case 500:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioInternalServerError);
            case 503:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioServiceUnavailable);
            default:
                switch (Math.floor(status / 100)) {
                    case 2:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.OK);
                    default:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.AudioDisconnected);
                }
        }
    };
    MeetingSessionStatus.fromSignalingStatus = function (status) {
        // TODO: Add these numbers to proto definition and reference them here.
        switch (status) {
            case 206:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.VideoCallSwitchToViewOnly);
            case 509:
                return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.VideoCallAtSourceCapacity);
            default:
                switch (Math.floor(status / 100)) {
                    case 2:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.OK);
                    case 4:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.SignalingBadRequest);
                    case 5:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.SignalingInternalServerError);
                    default:
                        return new MeetingSessionStatus(MeetingSessionStatusCode_1.default.SignalingRequestFailed);
                }
        }
    };
    return MeetingSessionStatus;
}());
exports.default = MeetingSessionStatus;
//# sourceMappingURL=MeetingSessionStatus.js.map