"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[NoOpDeviceBroker]] rejects requests to acquire a [[MediaStream]].
 */
var NoOpMediaStreamBroker = /** @class */ (function () {
    function NoOpMediaStreamBroker() {
    }
    NoOpMediaStreamBroker.prototype.acquireAudioInputStream = function () {
        return Promise.reject();
    };
    NoOpMediaStreamBroker.prototype.acquireVideoInputStream = function () {
        return Promise.reject();
    };
    NoOpMediaStreamBroker.prototype.acquireDisplayInputStream = function (_streamConstraints) {
        return Promise.reject();
    };
    NoOpMediaStreamBroker.prototype.releaseMediaStream = function (_mediaStreamToRelease) { };
    NoOpMediaStreamBroker.prototype.bindToAudioVideoController = function (_audioVideoController) { };
    return NoOpMediaStreamBroker;
}());
exports.default = NoOpMediaStreamBroker;
//# sourceMappingURL=NoOpMediaStreamBroker.js.map