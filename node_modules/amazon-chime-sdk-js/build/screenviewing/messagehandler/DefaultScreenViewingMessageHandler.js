"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenViewingPacketType_1 = require("../session/ScreenViewingPacketType");
var DefaultScreenViewingMessageHandler = /** @class */ (function () {
    function DefaultScreenViewingMessageHandler(client, deltaRenderer, deltaSource, viewer, logger) {
        this.client = client;
        this.deltaRenderer = deltaRenderer;
        this.deltaSource = deltaSource;
        this.viewer = viewer;
        this.logger = logger;
    }
    DefaultScreenViewingMessageHandler.prototype.handleEchoRequest = function (dataView) {
        this.logger.info('DefaultScreenViewingMessageHandler: Handling echo request message');
        dataView.setUint8(0, ScreenViewingPacketType_1.default.ECHO_RESPONSE);
        try {
            this.client.send(new Uint8Array(dataView.buffer));
        }
        catch (e) {
            this.logger.warn('DefaultScreenViewingMessageHandler: Error sending echo response');
            this.logger.warn(e);
        }
    };
    DefaultScreenViewingMessageHandler.prototype.handleSetup = function (dataView) {
        var width = dataView.getInt32(1);
        var height = dataView.getInt32(5);
        var macroBlock = dataView.getInt32(9);
        this.logger.info("DefaultScreenViewingMessageHandler: Handling setup message, received width = " + width + ", height = " + height + ", and macro block = " + macroBlock);
        var imageDimensions = DefaultScreenViewingMessageHandler.calculateImageDimensions(width, height, macroBlock);
        this.deltaRenderer.buildViewer(imageDimensions);
    };
    // TODO: Move into a component
    DefaultScreenViewingMessageHandler.calculateImageDimensions = function (width, height, macroBlock) {
        var widthRemainder = width % macroBlock;
        var heightRemainder = height % macroBlock;
        return {
            imageWidthPixels: width,
            imageHeightPixels: height,
            macroBlock: macroBlock,
            screenWidth: Math.floor(width / macroBlock) + (widthRemainder === 0 ? 0 : 1),
            screenHeight: Math.floor(height / macroBlock) + (heightRemainder === 0 ? 0 : 1),
            edgeWidth: widthRemainder === 0 ? macroBlock : widthRemainder,
            edgeHeight: heightRemainder === 0 ? macroBlock : heightRemainder,
            tileWidth: macroBlock,
            tileHeight: macroBlock,
        };
    };
    DefaultScreenViewingMessageHandler.prototype.handleDelta = function (dataView) {
        this.logger.debug(function () { return 'DefaultScreenViewingMessageHandler: Handling delta'; });
        var x = dataView.getUint8(1);
        var y = dataView.getUint8(2);
        this.deltaSource.pendingDx = x;
        this.deltaSource.pendingDy = y;
    };
    DefaultScreenViewingMessageHandler.prototype.handleSync = function (_dataView) {
        this.logger.debug(function () { return 'DefaultScreenViewingMessageHandler: Handling sync'; });
        this.deltaSource.flushSyncBuffer();
        this.viewer.resizeAndSync();
        if (this.deltaSource.notShared) {
            this.deltaSource.notShared = false;
        }
    };
    DefaultScreenViewingMessageHandler.prototype.handleNoScreen = function (_dataView) {
        this.logger.info('DefaultScreenViewingMessageHandler: Handling no screen');
        this.deltaSource.notShared = true;
    };
    DefaultScreenViewingMessageHandler.prototype.handleEndScreen = function (_dataView) {
        this.logger.info('DefaultScreenViewingMessageHandler: Handling end screen');
        this.viewer.stop();
    };
    // TODO: Move into a component
    DefaultScreenViewingMessageHandler.prototype.handleDefault = function (dataView) {
        this.logger.debug(function () { return 'DefaultScreenViewingMessageHandler: Handling default'; });
        var b0 = dataView.getUint8(0);
        var b1 = dataView.getUint8(1);
        if (!DefaultScreenViewingMessageHandler.shouldHandle(b0, b1)) {
            return;
        }
        var dx = this.deltaSource.pendingDx;
        var dy = this.deltaSource.pendingDy;
        this.deltaRenderer.syncBuffer[dy][dx] = new Uint8Array(dataView.buffer);
    };
    DefaultScreenViewingMessageHandler.shouldHandle = function (b0, b1) {
        return (b0 === ScreenViewingPacketType_1.default.JPEG_HEADER_BYTE_0 &&
            b1 === ScreenViewingPacketType_1.default.JPEG_HEADER_BYTE_1);
    };
    return DefaultScreenViewingMessageHandler;
}());
exports.default = DefaultScreenViewingMessageHandler;
//# sourceMappingURL=DefaultScreenViewingMessageHandler.js.map