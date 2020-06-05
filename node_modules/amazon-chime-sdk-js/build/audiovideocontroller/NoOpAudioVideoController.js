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
Object.defineProperty(exports, "__esModule", { value: true });
var FullJitterBackoff_1 = require("../backoff/FullJitterBackoff");
var NoOpDebugLogger_1 = require("../logger/NoOpDebugLogger");
var NoOpMediaStreamBroker_1 = require("../mediastreambroker/NoOpMediaStreamBroker");
var MeetingSessionConfiguration_1 = require("../meetingsession/MeetingSessionConfiguration");
var MeetingSessionCredentials_1 = require("../meetingsession/MeetingSessionCredentials");
var MeetingSessionURLs_1 = require("../meetingsession/MeetingSessionURLs");
var DefaultReconnectController_1 = require("../reconnectcontroller/DefaultReconnectController");
var DefaultWebSocketAdapter_1 = require("../websocketadapter/DefaultWebSocketAdapter");
var DefaultAudioVideoController_1 = require("./DefaultAudioVideoController");
var NoOpAudioVideoController = /** @class */ (function (_super) {
    __extends(NoOpAudioVideoController, _super);
    function NoOpAudioVideoController(configuration) {
        var _this = this;
        var emptyConfiguration = new MeetingSessionConfiguration_1.default();
        emptyConfiguration.meetingId = '';
        emptyConfiguration.credentials = new MeetingSessionCredentials_1.default();
        emptyConfiguration.credentials.attendeeId = '';
        emptyConfiguration.credentials.joinToken = '';
        emptyConfiguration.urls = new MeetingSessionURLs_1.default();
        emptyConfiguration.urls.turnControlURL = '';
        emptyConfiguration.urls.audioHostURL = '';
        emptyConfiguration.urls.screenViewingURL = '';
        emptyConfiguration.urls.screenDataURL = '';
        emptyConfiguration.urls.screenSharingURL = 'wss://localhost/';
        emptyConfiguration.urls.signalingURL = 'wss://localhost/';
        _this = _super.call(this, configuration ? configuration : emptyConfiguration, new NoOpDebugLogger_1.default(), new DefaultWebSocketAdapter_1.default(new NoOpDebugLogger_1.default()), new NoOpMediaStreamBroker_1.default(), new DefaultReconnectController_1.default(0, new FullJitterBackoff_1.default(0, 0, 0))) || this;
        return _this;
    }
    NoOpAudioVideoController.prototype.start = function () { };
    NoOpAudioVideoController.prototype.stop = function () { };
    return NoOpAudioVideoController;
}(DefaultAudioVideoController_1.default));
exports.default = NoOpAudioVideoController;
//# sourceMappingURL=NoOpAudioVideoController.js.map