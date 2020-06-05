"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var NoOpMediaStreamBroker_1 = require("../mediastreambroker/NoOpMediaStreamBroker");
var NoOpDeviceController = /** @class */ (function (_super) {
    __extends(NoOpDeviceController, _super);
    function NoOpDeviceController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoOpDeviceController.prototype.listAudioInputDevices = function () {
        return Promise.resolve([]);
    };
    NoOpDeviceController.prototype.listVideoInputDevices = function () {
        return Promise.resolve([]);
    };
    NoOpDeviceController.prototype.listAudioOutputDevices = function () {
        return Promise.resolve([]);
    };
    NoOpDeviceController.prototype.chooseAudioInputDevice = function (_device) {
        return Promise.reject();
    };
    NoOpDeviceController.prototype.chooseVideoInputDevice = function (_device) {
        return Promise.reject();
    };
    NoOpDeviceController.prototype.chooseAudioOutputDevice = function (_deviceId) {
        return Promise.reject();
    };
    NoOpDeviceController.prototype.addDeviceChangeObserver = function (_observer) { };
    NoOpDeviceController.prototype.removeDeviceChangeObserver = function (_observer) { };
    NoOpDeviceController.prototype.createAnalyserNodeForAudioInput = function () {
        return null;
    };
    NoOpDeviceController.prototype.startVideoPreviewForVideoInput = function (_element) { };
    NoOpDeviceController.prototype.stopVideoPreviewForVideoInput = function (_element) { };
    NoOpDeviceController.prototype.setDeviceLabelTrigger = function (_trigger) { };
    NoOpDeviceController.prototype.mixIntoAudioInput = function (_stream) {
        return null;
    };
    NoOpDeviceController.prototype.chooseVideoInputQuality = function (_width, _height, _frameRate, _maxBandwidthKbps) { };
    NoOpDeviceController.prototype.enableWebAudio = function (_flag) { };
    return NoOpDeviceController;
}(NoOpMediaStreamBroker_1.default));
exports.default = NoOpDeviceController;
//# sourceMappingURL=NoOpDeviceController.js.map