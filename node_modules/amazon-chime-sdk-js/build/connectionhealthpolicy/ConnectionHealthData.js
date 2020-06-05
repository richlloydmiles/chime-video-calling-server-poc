"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionHealthData = /** @class */ (function () {
    function ConnectionHealthData() {
        this.connectionStartTimestampMs = 0;
        this.consecutiveStatsWithNoPackets = 0;
        this.lastPacketLossInboundTimestampMs = 0;
        this.lastGoodSignalTimestampMs = 0;
        this.lastWeakSignalTimestampMs = 0;
        this.lastNoSignalTimestampMs = 0;
        this.consecutiveMissedPongs = 0;
        this.packetsReceivedInLastMinute = [];
        this.fractionPacketsLostInboundInLastMinute = [];
        this.audioSpeakerDelayMs = 0;
        this.connectionStartTimestampMs = Date.now();
        this.lastGoodSignalTimestampMs = Date.now();
    }
    ConnectionHealthData.isTimestampRecent = function (timestampMs, recentDurationMs) {
        return Date.now() < timestampMs + recentDurationMs;
    };
    ConnectionHealthData.prototype.setConnectionStartTime = function () {
        this.connectionStartTimestampMs = Date.now();
        this.lastGoodSignalTimestampMs = Date.now();
    };
    ConnectionHealthData.prototype.reset = function () {
        this.connectionStartTimestampMs = 0;
        this.consecutiveStatsWithNoPackets = 0;
        this.lastPacketLossInboundTimestampMs = 0;
        this.lastGoodSignalTimestampMs = 0;
        this.lastWeakSignalTimestampMs = 0;
        this.lastNoSignalTimestampMs = 0;
        this.consecutiveMissedPongs = 0;
        this.packetsReceivedInLastMinute = [];
        this.fractionPacketsLostInboundInLastMinute = [];
        this.audioSpeakerDelayMs = 0;
        this.connectionStartTimestampMs = Date.now();
        this.lastGoodSignalTimestampMs = Date.now();
    };
    ConnectionHealthData.prototype.isConnectionStartRecent = function (recentDurationMs) {
        return ConnectionHealthData.isTimestampRecent(this.connectionStartTimestampMs, recentDurationMs);
    };
    ConnectionHealthData.prototype.isLastPacketLossRecent = function (recentDurationMs) {
        return ConnectionHealthData.isTimestampRecent(this.lastPacketLossInboundTimestampMs, recentDurationMs);
    };
    ConnectionHealthData.prototype.isGoodSignalRecent = function (recentDurationMs) {
        return ConnectionHealthData.isTimestampRecent(this.lastGoodSignalTimestampMs, recentDurationMs);
    };
    ConnectionHealthData.prototype.isWeakSignalRecent = function (recentDurationMs) {
        return ConnectionHealthData.isTimestampRecent(this.lastWeakSignalTimestampMs, recentDurationMs);
    };
    ConnectionHealthData.prototype.isNoSignalRecent = function (recentDurationMs) {
        return ConnectionHealthData.isTimestampRecent(this.lastNoSignalTimestampMs, recentDurationMs);
    };
    ConnectionHealthData.prototype.clone = function () {
        var cloned = new ConnectionHealthData();
        cloned.connectionStartTimestampMs = this.connectionStartTimestampMs;
        cloned.consecutiveStatsWithNoPackets = this.consecutiveStatsWithNoPackets;
        cloned.lastPacketLossInboundTimestampMs = this.lastPacketLossInboundTimestampMs;
        cloned.lastGoodSignalTimestampMs = this.lastGoodSignalTimestampMs;
        cloned.lastWeakSignalTimestampMs = this.lastWeakSignalTimestampMs;
        cloned.lastNoSignalTimestampMs = this.lastNoSignalTimestampMs;
        cloned.consecutiveMissedPongs = this.consecutiveMissedPongs;
        cloned.packetsReceivedInLastMinute = this.packetsReceivedInLastMinute.slice(0);
        cloned.fractionPacketsLostInboundInLastMinute = this.fractionPacketsLostInboundInLastMinute.slice(0);
        cloned.audioSpeakerDelayMs = this.audioSpeakerDelayMs;
        return cloned;
    };
    ConnectionHealthData.prototype.setConsecutiveMissedPongs = function (pongs) {
        this.consecutiveMissedPongs = pongs;
    };
    ConnectionHealthData.prototype.setConsecutiveStatsWithNoPackets = function (stats) {
        this.consecutiveStatsWithNoPackets = stats;
    };
    ConnectionHealthData.prototype.setLastPacketLossInboundTimestampMs = function (timeStamp) {
        this.lastPacketLossInboundTimestampMs = timeStamp;
    };
    ConnectionHealthData.prototype.setLastNoSignalTimestampMs = function (timeStamp) {
        this.lastNoSignalTimestampMs = timeStamp;
    };
    ConnectionHealthData.prototype.setLastWeakSignalTimestampMs = function (timeStamp) {
        this.lastWeakSignalTimestampMs = timeStamp;
    };
    ConnectionHealthData.prototype.setLastGoodSignalTimestampMs = function (timeStamp) {
        this.lastGoodSignalTimestampMs = timeStamp;
    };
    ConnectionHealthData.prototype.setAudioSpeakerDelayMs = function (delayMs) {
        this.audioSpeakerDelayMs = delayMs;
    };
    return ConnectionHealthData;
}());
exports.default = ConnectionHealthData;
//# sourceMappingURL=ConnectionHealthData.js.map