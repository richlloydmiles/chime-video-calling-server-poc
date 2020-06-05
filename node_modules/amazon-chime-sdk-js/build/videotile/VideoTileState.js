"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[VideoTileState]] encapsulates the state of a [[VideoTile]]
 */
var VideoTileState = /** @class */ (function () {
    function VideoTileState() {
        this.tileId = null;
        this.localTile = false;
        this.localTileStarted = false;
        this.isContent = false;
        this.active = false;
        this.paused = false;
        this.poorConnection = false;
        this.boundAttendeeId = null;
        this.boundExternalUserId = null;
        this.boundVideoStream = null;
        this.boundVideoElement = null;
        this.nameplate = null;
        this.videoStreamContentWidth = null;
        this.videoStreamContentHeight = null;
        this.videoElementCSSWidthPixels = null;
        this.videoElementCSSHeightPixels = null;
        this.devicePixelRatio = 0;
        this.videoElementPhysicalWidthPixels = null;
        this.videoElementPhysicalHeightPixels = null;
        this.streamId = null;
    }
    VideoTileState.prototype.clone = function () {
        var cloned = new VideoTileState();
        cloned.tileId = this.tileId;
        cloned.localTile = this.localTile;
        cloned.isContent = this.isContent;
        cloned.active = this.active;
        cloned.paused = this.paused;
        cloned.poorConnection = this.poorConnection;
        cloned.boundAttendeeId = this.boundAttendeeId;
        cloned.boundExternalUserId = this.boundExternalUserId;
        cloned.boundVideoStream = this.boundVideoStream;
        cloned.boundVideoElement = this.boundVideoElement;
        cloned.nameplate = this.nameplate;
        cloned.videoStreamContentWidth = this.videoStreamContentWidth;
        cloned.videoStreamContentHeight = this.videoStreamContentHeight;
        cloned.videoElementCSSWidthPixels = this.videoElementCSSWidthPixels;
        cloned.videoElementCSSHeightPixels = this.videoElementCSSHeightPixels;
        cloned.devicePixelRatio = this.devicePixelRatio;
        cloned.videoElementPhysicalWidthPixels = this.videoElementPhysicalWidthPixels;
        cloned.videoElementPhysicalHeightPixels = this.videoElementPhysicalHeightPixels;
        cloned.streamId = this.streamId;
        return cloned;
    };
    return VideoTileState;
}());
exports.default = VideoTileState;
//# sourceMappingURL=VideoTileState.js.map