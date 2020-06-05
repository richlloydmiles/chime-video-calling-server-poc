"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Maybe_1 = require("../maybe/Maybe");
var SignalingAndMetricsConnectionMonitor = /** @class */ (function () {
    function SignalingAndMetricsConnectionMonitor(audioVideoController, realtimeController, videoTileController, connectionHealthData, pingPong, statsCollector) {
        var _this = this;
        this.audioVideoController = audioVideoController;
        this.realtimeController = realtimeController;
        this.videoTileController = videoTileController;
        this.connectionHealthData = connectionHealthData;
        this.pingPong = pingPong;
        this.statsCollector = statsCollector;
        this.isActive = false;
        this.hasSeenValidPacketMetricsBefore = false;
        this.lastAvailableSendBandwidthKbps = 0;
        this.lastAvailableRecvBandwidthKbps = 0;
        this.realtimeController.realtimeSubscribeToLocalSignalStrengthChange(function (signalStrength) {
            if (_this.isActive) {
                _this.receiveSignalStrengthChange(signalStrength);
            }
        });
    }
    SignalingAndMetricsConnectionMonitor.prototype.start = function () {
        this.isActive = true;
        this.pingPong.addObserver(this);
        this.pingPong.start();
        this.audioVideoController.addObserver(this);
    };
    SignalingAndMetricsConnectionMonitor.prototype.stop = function () {
        this.isActive = false;
        this.pingPong.removeObserver(this);
        this.pingPong.stop();
        this.audioVideoController.removeObserver(this);
    };
    SignalingAndMetricsConnectionMonitor.prototype.receiveSignalStrengthChange = function (signalStrength) {
        if (signalStrength === 0) {
            this.connectionHealthData.setLastNoSignalTimestampMs(Date.now());
        }
        else if (signalStrength <= 0.5) {
            this.connectionHealthData.setLastWeakSignalTimestampMs(Date.now());
        }
        else {
            this.connectionHealthData.setLastGoodSignalTimestampMs(Date.now());
        }
        this.updateConnectionHealth();
    };
    SignalingAndMetricsConnectionMonitor.prototype.didReceivePong = function (_id, latencyMs, clockSkewMs) {
        this.connectionHealthData.setConsecutiveMissedPongs(0);
        this.statsCollector.logLatency('ping_pong', latencyMs);
        this.statsCollector.logLatency('ping_pong_clock_skew', clockSkewMs);
        this.updateConnectionHealth();
    };
    SignalingAndMetricsConnectionMonitor.prototype.didMissPongs = function () {
        this.connectionHealthData.setConsecutiveMissedPongs(this.connectionHealthData.consecutiveMissedPongs + 1);
        this.updateConnectionHealth();
    };
    SignalingAndMetricsConnectionMonitor.prototype.metricsDidReceive = function (clientMetricReport) {
        var packetsReceived = 0;
        var fractionPacketsLostInbound = 0;
        var metricReport = clientMetricReport.getObservableMetrics();
        var potentialPacketsReceived = metricReport.audioPacketsReceived;
        var potentialFractionPacketsLostInbound = metricReport.audioPacketsReceivedFractionLoss;
        var videoUpstreamBitrateKbps = 0;
        var videoUpstreamPacketPerSecond = metricReport.videoPacketSentPerSecond;
        var videoUpstreamBitrate = metricReport.videoUpstreamBitrate;
        var availableSendBandwidth = metricReport.availableSendBandwidth || metricReport.availableOutgoingBitrate;
        var availableRecvBandwidth = metricReport.availableReceiveBandwidth || metricReport.availableIncomingBitrate;
        var audioSpeakerDelayMs = metricReport.audioSpeakerDelayMs;
        // Firefox does not presently have aggregated bandwidth estimation
        if (typeof availableSendBandwidth === 'number' && !isNaN(availableSendBandwidth)) {
            this.updateAvailableSendBandwidth(availableSendBandwidth / 1000);
        }
        if (typeof availableRecvBandwidth === 'number' && !isNaN(availableRecvBandwidth)) {
            this.updateAvailableReceiveBandwidth(availableRecvBandwidth / 1000);
        }
        if (typeof videoUpstreamBitrate === 'number' && !isNaN(videoUpstreamBitrate)) {
            videoUpstreamBitrateKbps = videoUpstreamBitrate / 1000;
        }
        if (typeof audioSpeakerDelayMs === 'number' && !isNaN(audioSpeakerDelayMs)) {
            this.connectionHealthData.setAudioSpeakerDelayMs(audioSpeakerDelayMs);
        }
        this.monitorVideoUplinkHealth(videoUpstreamBitrateKbps, videoUpstreamPacketPerSecond);
        if (typeof potentialPacketsReceived === 'number' &&
            typeof potentialFractionPacketsLostInbound === 'number') {
            packetsReceived = potentialPacketsReceived;
            fractionPacketsLostInbound = potentialFractionPacketsLostInbound;
            if (packetsReceived < 0 || fractionPacketsLostInbound < 0) {
                // TODO: getting negative numbers on this metric after reconnect sometimes
                // For now, just skip the metric if it looks weird.
                return;
            }
        }
        else {
            return;
        }
        this.addToMinuteWindow(this.connectionHealthData.packetsReceivedInLastMinute, packetsReceived);
        this.addToMinuteWindow(this.connectionHealthData.fractionPacketsLostInboundInLastMinute, fractionPacketsLostInbound);
        if (packetsReceived > 0) {
            this.hasSeenValidPacketMetricsBefore = true;
            this.connectionHealthData.setConsecutiveStatsWithNoPackets(0);
        }
        else if (this.hasSeenValidPacketMetricsBefore) {
            this.connectionHealthData.setConsecutiveStatsWithNoPackets(this.connectionHealthData.consecutiveStatsWithNoPackets + 1);
        }
        if (packetsReceived === 0 || fractionPacketsLostInbound > 0) {
            this.connectionHealthData.setLastPacketLossInboundTimestampMs(Date.now());
        }
        this.updateConnectionHealth();
    };
    SignalingAndMetricsConnectionMonitor.prototype.addToMinuteWindow = function (array, value) {
        array.unshift(value);
        if (array.length > 60) {
            array.pop();
        }
    };
    SignalingAndMetricsConnectionMonitor.prototype.updateAvailableSendBandwidth = function (sendBandwidthKbps) {
        if (sendBandwidthKbps !== this.lastAvailableSendBandwidthKbps) {
            if (this.lastAvailableSendBandwidthKbps === 0) {
                this.lastAvailableSendBandwidthKbps = sendBandwidthKbps;
                return;
            }
            var prevSendBandwidthKbps_1 = this.lastAvailableSendBandwidthKbps;
            this.lastAvailableSendBandwidthKbps = sendBandwidthKbps;
            this.audioVideoController.forEachObserver(function (observer) {
                Maybe_1.default.of(observer.videoSendBandwidthDidChange).map(function (f) {
                    return f.bind(observer)(sendBandwidthKbps, prevSendBandwidthKbps_1);
                });
            });
        }
    };
    SignalingAndMetricsConnectionMonitor.prototype.updateAvailableReceiveBandwidth = function (recvBandwidthKbps) {
        if (recvBandwidthKbps !== this.lastAvailableRecvBandwidthKbps) {
            if (this.lastAvailableRecvBandwidthKbps === 0) {
                this.lastAvailableRecvBandwidthKbps = recvBandwidthKbps;
                return;
            }
            var prevRecvBandwidthKbps_1 = this.lastAvailableRecvBandwidthKbps;
            this.lastAvailableRecvBandwidthKbps = recvBandwidthKbps;
            this.audioVideoController.forEachObserver(function (observer) {
                Maybe_1.default.of(observer.videoReceiveBandwidthDidChange).map(function (f) {
                    return f.bind(observer)(recvBandwidthKbps, prevRecvBandwidthKbps_1);
                });
            });
        }
    };
    SignalingAndMetricsConnectionMonitor.prototype.updateConnectionHealth = function () {
        var _this = this;
        this.audioVideoController.forEachObserver(function (observer) {
            Maybe_1.default.of(observer.connectionHealthDidChange).map(function (f) {
                return f.bind(observer)(_this.connectionHealthData.clone());
            });
        });
    };
    SignalingAndMetricsConnectionMonitor.prototype.monitorVideoUplinkHealth = function (videoUpstreamBitrateKbps, videoUpstreamPacketsPerSecond) {
        if (!this.videoTileController.hasStartedLocalVideoTile()) {
            return;
        }
        this.audioVideoController.forEachObserver(function (observer) {
            Maybe_1.default.of(observer.videoSendHealthDidChange).map(function (f) {
                return f.bind(observer)(videoUpstreamBitrateKbps, videoUpstreamPacketsPerSecond);
            });
        });
    };
    return SignalingAndMetricsConnectionMonitor;
}());
exports.default = SignalingAndMetricsConnectionMonitor;
//# sourceMappingURL=SignalingAndMetricsConnectionMonitor.js.map