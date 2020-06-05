"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenViewingPacketType_1 = require("../session/ScreenViewingPacketType");
var ScreenViewingMessageDispatcher = /** @class */ (function () {
    function ScreenViewingMessageDispatcher(messageHandler) {
        this.messageHandler = messageHandler;
    }
    ScreenViewingMessageDispatcher.prototype.didCloseWebSocket = function (_event) { };
    ScreenViewingMessageDispatcher.prototype.didReceiveWebSocketMessage = function (event) {
        var dataView = new DataView(event.data);
        var type = dataView.getUint8(0);
        switch (type) {
            case ScreenViewingPacketType_1.default.ECHO_REQUEST:
                this.messageHandler.handleEchoRequest(dataView);
                return;
            case ScreenViewingPacketType_1.default.SETUP:
                this.messageHandler.handleSetup(dataView);
                return;
            case ScreenViewingPacketType_1.default.DELTA:
                this.messageHandler.handleDelta(dataView);
                return;
            case ScreenViewingPacketType_1.default.SYNC:
                this.messageHandler.handleSync(dataView);
                return;
            case ScreenViewingPacketType_1.default.NOSCREEN:
                this.messageHandler.handleNoScreen(dataView);
                return;
            case ScreenViewingPacketType_1.default.ENDSCREEN:
                this.messageHandler.handleEndScreen(dataView);
                return;
            default:
                this.messageHandler.handleDefault(dataView);
        }
    };
    return ScreenViewingMessageDispatcher;
}());
exports.default = ScreenViewingMessageDispatcher;
//# sourceMappingURL=ScreenViewingMessageDispatcher.js.map