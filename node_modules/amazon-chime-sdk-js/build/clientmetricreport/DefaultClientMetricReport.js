"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var ClientMetricReportDirection_1 = require("./ClientMetricReportDirection");
var ClientMetricReportMediaType_1 = require("./ClientMetricReportMediaType");
var GlobalMetricReport_1 = require("./GlobalMetricReport");
var DefaultClientMetricReport = /** @class */ (function () {
    function DefaultClientMetricReport(logger) {
        var _this = this;
        this.logger = logger;
        this.globalMetricReport = new GlobalMetricReport_1.default();
        this.streamMetricReports = {};
        this.currentTimestampMs = 0;
        this.previousTimestampMs = 0;
        this.currentSsrcs = {};
        /**
         *  Metric transform functions
         */
        this.identityValue = function (metricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            return Number(metricReport.currentMetrics[metricName]);
        };
        this.decoderLossPercent = function (metricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            var decoderNormal = metricReport.currentMetrics['googDecodingNormal'] -
                (metricReport.previousMetrics['googDecodingNormal'] || 0);
            var decoderCalls = metricReport.currentMetrics['googDecodingCTN'] -
                (metricReport.previousMetrics['googDecodingCTN'] || 0);
            if (decoderCalls <= 0) {
                return 0;
            }
            var decoderAbnormal = decoderCalls - decoderNormal;
            if (decoderAbnormal <= 0) {
                return 0;
            }
            return (decoderAbnormal * 100) / decoderCalls;
        };
        this.packetLossPercent = function (sourceMetricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            var sentOrReceived = metricReport.currentMetrics[sourceMetricName] -
                (metricReport.previousMetrics[sourceMetricName] || 0);
            var lost = metricReport.currentMetrics['packetsLost'] -
                (metricReport.previousMetrics['packetsLost'] || 0);
            var total = sentOrReceived + lost;
            if (total <= 0 || lost <= 0) {
                return 0;
            }
            return (lost * 100) / total;
        };
        this.countPerSecond = function (metricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            var intervalSeconds = (_this.currentTimestampMs - _this.previousTimestampMs) / 1000;
            if (intervalSeconds <= 0) {
                return 0;
            }
            if (_this.previousTimestampMs <= 0) {
                intervalSeconds = 1;
            }
            var diff = metricReport.currentMetrics[metricName] - (metricReport.previousMetrics[metricName] || 0);
            if (diff <= 0) {
                return 0;
            }
            return Math.trunc(diff / intervalSeconds);
        };
        this.bitsPerSecond = function (metricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            var intervalSeconds = (_this.currentTimestampMs - _this.previousTimestampMs) / 1000;
            if (intervalSeconds <= 0) {
                return 0;
            }
            if (_this.previousTimestampMs <= 0) {
                intervalSeconds = 1;
            }
            var diff = (metricReport.currentMetrics[metricName] - (metricReport.previousMetrics[metricName] || 0)) *
                8;
            if (diff <= 0) {
                return 0;
            }
            return Math.trunc(diff / intervalSeconds);
        };
        this.secondsToMilliseconds = function (metricName, ssrc) {
            var metricReport = ssrc ? _this.streamMetricReports[ssrc] : _this.globalMetricReport;
            return Number(metricReport.currentMetrics[metricName] * 1000);
        };
        /**
         *  Canonical and derived metric maps
         */
        this.globalMetricMap = {
            googActualEncBitrate: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_ACTUAL_ENCODER_BITRATE,
            },
            googAvailableSendBandwidth: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_AVAILABLE_SEND_BANDWIDTH,
            },
            googRetransmitBitrate: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RETRANSMIT_BITRATE,
            },
            googAvailableReceiveBandwidth: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_AVAILABLE_RECEIVE_BANDWIDTH,
            },
            googTargetEncBitrate: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_TARGET_ENCODER_BITRATE,
            },
            googBucketDelay: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_BUCKET_DELAY_MS },
            googRtt: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.STUN_RTT_MS },
            packetsDiscardedOnSend: {
                transform: this.countPerSecond,
                type: SignalingProtocol_js_1.SdkMetric.Type.SOCKET_DISCARDED_PPS,
            },
            availableIncomingBitrate: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_AVAILABLE_RECEIVE_BANDWIDTH,
            },
            availableOutgoingBitrate: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_AVAILABLE_SEND_BANDWIDTH,
            },
            currentRoundTripTime: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.STUN_RTT_MS },
        };
        this.audioUpstreamMetricMap = {
            googJitterReceived: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_JITTER_MS },
            jitter: { transform: this.secondsToMilliseconds, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_JITTER_MS },
            packetsSent: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_PPS },
            bytesSent: { transform: this.bitsPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_BITRATE },
            googRtt: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_RTT_MS },
            packetsLost: {
                transform: this.packetLossPercent,
                type: SignalingProtocol_js_1.SdkMetric.Type.RTC_MIC_FRACTION_PACKET_LOST_PERCENT,
                source: 'packetsSent',
            },
        };
        this.audioDownstreamMetricMap = {
            packetsReceived: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_PPS },
            packetsLost: {
                transform: this.packetLossPercent,
                type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_FRACTION_PACKET_LOST_PERCENT,
                source: 'packetsReceived',
            },
            googJitterReceived: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_JITTER_MS },
            jitter: { transform: this.secondsToMilliseconds, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_JITTER_MS },
            googDecodingCTN: { transform: this.countPerSecond },
            googDecodingNormal: {
                transform: this.decoderLossPercent,
                type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_FRACTION_DECODER_LOSS_PERCENT,
                source: 'googDecodingCTN',
            },
            bytesReceived: { transform: this.bitsPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_BITRATE },
            googCurrentDelayMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_CURRENT_DELAY_MS,
            },
            googJitterBufferMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.RTC_SPK_JITTER_BUFFER_MS,
            },
        };
        this.videoUpstreamMetricMap = {
            googRtt: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_RTT_MS },
            googEncodeUsagePercent: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_ENCODE_USAGE_PERCENT,
            },
            googNacksReceived: {
                transform: this.countPerSecond,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_NACKS_RECEIVED,
            },
            nackCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_NACKS_RECEIVED },
            googPlisReceived: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_PLIS_RECEIVED },
            pliCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_PLIS_RECEIVED },
            googFirsReceived: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_FIRS_RECEIVED },
            firCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_FIRS_RECEIVED },
            googAvgEncodeMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_AVERAGE_ENCODE_MS,
            },
            googFrameRateInput: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_INPUT_FPS },
            framesEncoded: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_ENCODE_FPS },
            googFrameRateSent: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_FPS },
            framerateMean: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_FPS },
            packetsSent: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_PPS },
            packetsLost: {
                transform: this.packetLossPercent,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_FRACTION_PACKET_LOST_PERCENT,
                source: 'packetsSent',
            },
            bytesSent: { transform: this.bitsPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_SENT_BITRATE },
            droppedFrames: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_DROPPED_FPS },
        };
        this.videoDownstreamMetricMap = {
            googTargetDelayMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_TARGET_DELAY_MS,
            },
            googDecodeMs: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_DECODE_MS },
            googFrameRateOutput: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_OUTPUT_FPS },
            packetsReceived: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_PPS },
            packetsLost: {
                transform: this.packetLossPercent,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_FRACTION_PACKET_LOST_PERCENT,
                source: 'packetsReceived',
            },
            googRenderDelayMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RENDER_DELAY_MS,
            },
            googFrameRateReceived: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_FPS,
            },
            framerateMean: { transform: this.identityValue, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_FPS },
            framesDecoded: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_DECODE_FPS },
            googNacksSent: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_NACKS_SENT },
            nackCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_NACKS_SENT },
            googFirsSent: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_FIRS_SENT },
            firCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_FIRS_SENT },
            googPlisSent: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_PLIS_SENT },
            pliCount: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_PLIS_SENT },
            bytesReceived: { transform: this.bitsPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_BITRATE },
            googCurrentDelayMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_CURRENT_DELAY_MS,
            },
            googJitterBufferMs: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_JITTER_BUFFER_MS,
            },
            discardedPackets: { transform: this.countPerSecond, type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_DISCARDED_PPS },
            googJitterReceived: {
                transform: this.identityValue,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_JITTER_MS,
            },
            jitter: {
                transform: this.secondsToMilliseconds,
                type: SignalingProtocol_js_1.SdkMetric.Type.VIDEO_RECEIVED_JITTER_MS,
            },
        };
        /**
         * Observable metrics and related APIs
         */
        this.observableMetricSpec = {
            audioPacketsReceived: {
                source: 'packetsReceived',
                media: ClientMetricReportMediaType_1.default.AUDIO,
                dir: ClientMetricReportDirection_1.default.DOWNSTREAM,
            },
            audioPacketsReceivedFractionLoss: {
                source: 'packetsLost',
                media: ClientMetricReportMediaType_1.default.AUDIO,
                dir: ClientMetricReportDirection_1.default.DOWNSTREAM,
            },
            audioDecoderLoss: {
                source: 'googDecodingNormal',
                media: ClientMetricReportMediaType_1.default.AUDIO,
                dir: ClientMetricReportDirection_1.default.DOWNSTREAM,
            },
            videoUpstreamBitrate: { source: 'bytesSent', media: ClientMetricReportMediaType_1.default.VIDEO, dir: ClientMetricReportDirection_1.default.UPSTREAM },
            videoPacketSentPerSecond: {
                source: 'packetsSent',
                media: ClientMetricReportMediaType_1.default.VIDEO,
                dir: ClientMetricReportDirection_1.default.UPSTREAM,
            },
            availableSendBandwidth: { source: 'googAvailableSendBandwidth' },
            availableReceiveBandwidth: { source: 'googAvailableReceiveBandwidth' },
            audioSpeakerDelayMs: {
                source: 'googCurrentDelayMs',
                media: ClientMetricReportMediaType_1.default.AUDIO,
                dir: ClientMetricReportDirection_1.default.DOWNSTREAM,
            },
            // new getStats() API
            availableIncomingBitrate: { source: 'availableIncomingBitrate' },
            availableOutgoingBitrate: { source: 'availableOutgoingBitrate' },
        };
    }
    DefaultClientMetricReport.prototype.getMetricMap = function (mediaType, direction) {
        switch (mediaType) {
            case ClientMetricReportMediaType_1.default.AUDIO:
                switch (direction) {
                    case ClientMetricReportDirection_1.default.UPSTREAM:
                        return this.audioUpstreamMetricMap;
                    case ClientMetricReportDirection_1.default.DOWNSTREAM:
                        return this.audioDownstreamMetricMap;
                }
            case ClientMetricReportMediaType_1.default.VIDEO:
                switch (direction) {
                    case ClientMetricReportDirection_1.default.UPSTREAM:
                        return this.videoUpstreamMetricMap;
                    case ClientMetricReportDirection_1.default.DOWNSTREAM:
                        return this.videoDownstreamMetricMap;
                }
            default:
                return this.globalMetricMap;
        }
    };
    DefaultClientMetricReport.prototype.getObservableMetricValue = function (metricName) {
        var observableMetricSpec = this.observableMetricSpec[metricName];
        var metricMap = this.getMetricMap(observableMetricSpec.media, observableMetricSpec.dir);
        var metricSpec = metricMap[observableMetricSpec.source];
        var transform = metricSpec.transform;
        var source = metricSpec.source;
        if (observableMetricSpec.hasOwnProperty('media')) {
            for (var ssrc in this.streamMetricReports) {
                var streamMetricReport = this.streamMetricReports[ssrc];
                if (observableMetricSpec.source in streamMetricReport.currentMetrics &&
                    streamMetricReport.direction === observableMetricSpec.dir &&
                    streamMetricReport.mediaType === observableMetricSpec.media) {
                    return source
                        ? transform(source, Number(ssrc))
                        : transform(observableMetricSpec.source, Number(ssrc));
                }
            }
        }
        else {
            return source ? transform(source) : transform(observableMetricSpec.source);
        }
        return 0;
    };
    DefaultClientMetricReport.prototype.getObservableMetrics = function () {
        var metric = {};
        for (var metricName in this.observableMetricSpec) {
            metric[metricName] = this.getObservableMetricValue(metricName);
        }
        return metric;
    };
    /**
     * Utilities
     */
    DefaultClientMetricReport.prototype.clone = function () {
        var cloned = new DefaultClientMetricReport(this.logger);
        cloned.globalMetricReport = this.globalMetricReport;
        cloned.streamMetricReports = this.streamMetricReports;
        cloned.currentTimestampMs = this.currentTimestampMs;
        cloned.previousTimestampMs = this.previousTimestampMs;
        return cloned;
    };
    DefaultClientMetricReport.prototype.print = function () {
        var clientMetricReport = {
            globalMetricReport: this.globalMetricReport,
            streamMetricReports: this.streamMetricReports,
            currentTimestampMs: this.currentTimestampMs,
            previousTimestampMs: this.previousTimestampMs,
        };
        this.logger.debug(function () {
            return "Client Metric Report: " + JSON.stringify(clientMetricReport);
        });
    };
    DefaultClientMetricReport.prototype.removeDestroyedSsrcs = function () {
        for (var ssrc in this.streamMetricReports) {
            if (!this.currentSsrcs[ssrc]) {
                delete this.streamMetricReports[ssrc];
            }
        }
    };
    return DefaultClientMetricReport;
}());
exports.default = DefaultClientMetricReport;
//# sourceMappingURL=DefaultClientMetricReport.js.map