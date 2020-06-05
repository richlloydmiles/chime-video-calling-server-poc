"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var ClientMetricReportDirection_1 = require("../clientmetricreport/ClientMetricReportDirection");
var ClientMetricReportMediaType_1 = require("../clientmetricreport/ClientMetricReportMediaType");
var DefaultClientMetricReport_1 = require("../clientmetricreport/DefaultClientMetricReport");
var StreamMetricReport_1 = require("../clientmetricreport/StreamMetricReport");
var Maybe_1 = require("../maybe/Maybe");
var MeetingSessionLifecycleEvent_1 = require("../meetingsession/MeetingSessionLifecycleEvent");
var MeetingSessionLifecycleEventCondition_1 = require("../meetingsession/MeetingSessionLifecycleEventCondition");
var IntervalScheduler_1 = require("../scheduler/IntervalScheduler");
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var AudioLogEvent_1 = require("./AudioLogEvent");
var VideoLogEvent_1 = require("./VideoLogEvent");
var DefaultStatsCollector = /** @class */ (function () {
    function DefaultStatsCollector(audioVideoController, logger, browserBehavior, interval) {
        if (interval === void 0) { interval = DefaultStatsCollector.INTERVAL_MS; }
        this.audioVideoController = audioVideoController;
        this.logger = logger;
        this.browserBehavior = browserBehavior;
        this.interval = interval;
        this.intervalScheduler = null;
        // TODO: Implement metricsAddTime() and metricsLogEvent().
        this.metricsAddTime = function (_name, _duration, _attributes) { };
        this.metricsLogEvent = function (_name, _attributes) { };
    }
    // TODO: Update toAttribute() and toSuffix() methods to convert raw data to a required type.
    DefaultStatsCollector.prototype.toAttribute = function (str) {
        return this.toSuffix(str).substring(1);
    };
    DefaultStatsCollector.prototype.toSuffix = function (str) {
        if (str.toLowerCase() === str) {
            // e.g. lower_case -> _lower_case
            return "_" + str;
        }
        else if (str.toUpperCase() === str) {
            // e.g. UPPER_CASE -> _upper_case
            return "_" + str.toLowerCase();
        }
        else {
            // e.g. CamelCaseWithCAPS -> _camel_case_with_caps
            return str
                .replace(/([A-Z][a-z]+)/g, function ($1) {
                return "_" + $1;
            })
                .replace(/([A-Z][A-Z]+)/g, function ($1) {
                return "_" + $1;
            })
                .toLowerCase();
        }
    };
    DefaultStatsCollector.prototype.logLatency = function (eventName, timeMs, attributes) {
        var event = this.toSuffix(eventName);
        this.logEventTime('meeting' + event, timeMs, attributes);
    };
    DefaultStatsCollector.prototype.logStateTimeout = function (stateName, attributes) {
        var state = this.toSuffix(stateName);
        this.logEvent('meeting_session_state_timeout', __assign(__assign({}, attributes), { state: "state" + state }));
    };
    DefaultStatsCollector.prototype.logAudioEvent = function (eventName, attributes) {
        var event = 'audio' + this.toSuffix(AudioLogEvent_1.default[eventName]);
        this.logEvent(event, attributes);
    };
    DefaultStatsCollector.prototype.logVideoEvent = function (eventName, attributes) {
        var event = 'video' + this.toSuffix(VideoLogEvent_1.default[eventName]);
        this.logEvent(event, attributes);
    };
    DefaultStatsCollector.prototype.logEventTime = function (eventName, timeMs, attributes) {
        if (attributes === void 0) { attributes = {}; }
        var finalAttributes = __assign(__assign({}, attributes), { call_id: this.audioVideoController.configuration.meetingId, client_type: DefaultStatsCollector.CLIENT_TYPE, metric_type: 'latency' });
        this.logger.debug(function () {
            return "[DefaultStatsCollector] " + eventName + ": " + JSON.stringify(finalAttributes);
        });
        this.metricsAddTime(eventName, timeMs, finalAttributes);
    };
    DefaultStatsCollector.prototype.logMeetingSessionStatus = function (status) {
        // TODO: Generate the status event name given the status code.
        var statusEventName = "" + status.statusCode();
        this.logEvent(statusEventName);
        var statusAttribute = {
            status: statusEventName,
            status_code: "" + status.statusCode(),
        };
        this.logEvent('meeting_session_status', statusAttribute);
        if (status.isTerminal()) {
            this.logEvent('meeting_session_stopped', statusAttribute);
        }
        if (status.isAudioConnectionFailure()) {
            this.logEvent('meeting_session_audio_failed', statusAttribute);
        }
        if (status.isFailure()) {
            this.logEvent('meeting_session_failed', statusAttribute);
        }
    };
    DefaultStatsCollector.prototype.logLifecycleEvent = function (lifecycleEvent, condition) {
        var attributes = {
            lifecycle_event: "lifecycle" + this.toSuffix(MeetingSessionLifecycleEvent_1.default[lifecycleEvent]),
            lifecycle_event_code: "" + lifecycleEvent,
            lifecycle_event_condition: "condition" + this.toSuffix(MeetingSessionLifecycleEventCondition_1.default[condition]),
            lifecycle_event_condition_code: "" + condition,
        };
        this.logEvent('meeting_session_lifecycle', attributes);
    };
    DefaultStatsCollector.prototype.logEvent = function (eventName, attributes) {
        if (attributes === void 0) { attributes = {}; }
        var finalAttributes = __assign(__assign({}, attributes), { call_id: this.audioVideoController.configuration.meetingId, client_type: DefaultStatsCollector.CLIENT_TYPE });
        this.logger.debug(function () {
            return "[DefaultStatsCollector] " + eventName + ": " + JSON.stringify(finalAttributes);
        });
        this.metricsLogEvent(eventName, finalAttributes);
    };
    /**
     * WEBRTC METRICS COLLECTION.
     */
    DefaultStatsCollector.prototype.start = function (signalingClient, videoStreamIndex, clientMetricReport) {
        var _this = this;
        if (this.intervalScheduler) {
            return false;
        }
        this.logger.info('Starting DefaultStatsCollector');
        this.signalingClient = signalingClient;
        this.videoStreamIndex = videoStreamIndex;
        if (clientMetricReport) {
            this.clientMetricReport = clientMetricReport;
        }
        else {
            this.clientMetricReport = new DefaultClientMetricReport_1.default(this.logger);
        }
        this.intervalScheduler = new IntervalScheduler_1.default(this.interval);
        this.intervalScheduler.start(function () {
            _this.getStatsWrapper();
        });
        return true;
    };
    DefaultStatsCollector.prototype.stop = function () {
        this.logger.info('Stopping DefaultStatsCollector');
        if (this.intervalScheduler) {
            this.intervalScheduler.stop();
        }
        this.intervalScheduler = null;
    };
    /**
     * Convert raw metrics to client metric report.
     */
    DefaultStatsCollector.prototype.updateMetricValues = function (rawMetricReport, isStream) {
        var metricReport = isStream
            ? this.clientMetricReport.streamMetricReports[Number(rawMetricReport.ssrc)]
            : this.clientMetricReport.globalMetricReport;
        var metricMap;
        if (isStream) {
            metricMap = this.clientMetricReport.getMetricMap(metricReport.mediaType, metricReport.direction);
        }
        else {
            metricMap = this.clientMetricReport.getMetricMap();
        }
        for (var rawMetric in rawMetricReport) {
            if (rawMetric in metricMap) {
                metricReport.previousMetrics[rawMetric] = metricReport.currentMetrics[rawMetric];
                metricReport.currentMetrics[rawMetric] = rawMetricReport[rawMetric];
            }
        }
    };
    DefaultStatsCollector.prototype.processRawMetricReports = function (rawMetricReports) {
        var e_1, _a;
        this.clientMetricReport.currentSsrcs = {};
        var timeStamp = Date.now();
        try {
            for (var rawMetricReports_1 = __values(rawMetricReports), rawMetricReports_1_1 = rawMetricReports_1.next(); !rawMetricReports_1_1.done; rawMetricReports_1_1 = rawMetricReports_1.next()) {
                var rawMetricReport = rawMetricReports_1_1.value;
                var isStream = this.isStreamRawMetricReport(rawMetricReport.type);
                if (isStream) {
                    if (!this.clientMetricReport.streamMetricReports[Number(rawMetricReport.ssrc)]) {
                        var streamMetricReport = new StreamMetricReport_1.default();
                        streamMetricReport.mediaType = this.getMediaType(rawMetricReport);
                        streamMetricReport.direction = this.getDirectionType(rawMetricReport);
                        if (!this.videoStreamIndex.allStreams().empty()) {
                            streamMetricReport.streamId = this.videoStreamIndex.streamIdForSSRC(Number(rawMetricReport.ssrc));
                        }
                        this.clientMetricReport.streamMetricReports[Number(rawMetricReport.ssrc)] = streamMetricReport;
                    }
                    this.clientMetricReport.currentSsrcs[Number(rawMetricReport.ssrc)] = 1;
                }
                this.updateMetricValues(rawMetricReport, isStream);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rawMetricReports_1_1 && !rawMetricReports_1_1.done && (_a = rawMetricReports_1.return)) _a.call(rawMetricReports_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.clientMetricReport.removeDestroyedSsrcs();
        this.clientMetricReport.previousTimestampMs = this.clientMetricReport.currentTimestampMs;
        this.clientMetricReport.currentTimestampMs = timeStamp;
        this.clientMetricReport.print();
    };
    /**
     * Protobuf packaging.
     */
    DefaultStatsCollector.prototype.addMetricFrame = function (metricName, clientMetricFrame, metricSpec, ssrc) {
        var type = metricSpec.type;
        var transform = metricSpec.transform;
        var sourceMetric = metricSpec.source;
        var streamMetricFramesLength = clientMetricFrame.streamMetricFrames.length;
        var latestStreamMetricFrame = clientMetricFrame.streamMetricFrames[streamMetricFramesLength - 1];
        if (type) {
            var metricFrame = SignalingProtocol_js_1.SdkMetric.create();
            metricFrame.type = type;
            metricFrame.value = sourceMetric
                ? transform(sourceMetric, ssrc)
                : transform(metricName, ssrc);
            ssrc
                ? latestStreamMetricFrame.metrics.push(metricFrame)
                : clientMetricFrame.globalMetrics.push(metricFrame);
        }
    };
    DefaultStatsCollector.prototype.addGlobalMetricsToProtobuf = function (clientMetricFrame) {
        var metricMap = this.clientMetricReport.getMetricMap();
        for (var metricName in this.clientMetricReport.globalMetricReport.currentMetrics) {
            this.addMetricFrame(metricName, clientMetricFrame, metricMap[metricName]);
        }
    };
    DefaultStatsCollector.prototype.addStreamMetricsToProtobuf = function (clientMetricFrame) {
        for (var ssrc in this.clientMetricReport.streamMetricReports) {
            var streamMetricReport = this.clientMetricReport.streamMetricReports[ssrc];
            var streamMetricFrame = SignalingProtocol_js_1.SdkStreamMetricFrame.create();
            streamMetricFrame.streamId = streamMetricReport.streamId;
            streamMetricFrame.metrics = [];
            clientMetricFrame.streamMetricFrames.push(streamMetricFrame);
            var metricMap = this.clientMetricReport.getMetricMap(streamMetricReport.mediaType, streamMetricReport.direction);
            for (var metricName in streamMetricReport.currentMetrics) {
                this.addMetricFrame(metricName, clientMetricFrame, metricMap[metricName], Number(ssrc));
            }
        }
    };
    DefaultStatsCollector.prototype.makeClientMetricProtobuf = function () {
        var clientMetricFrame = SignalingProtocol_js_1.SdkClientMetricFrame.create();
        clientMetricFrame.globalMetrics = [];
        clientMetricFrame.streamMetricFrames = [];
        this.addGlobalMetricsToProtobuf(clientMetricFrame);
        this.addStreamMetricsToProtobuf(clientMetricFrame);
        return clientMetricFrame;
    };
    DefaultStatsCollector.prototype.sendClientMetricProtobuf = function (clientMetricFrame) {
        this.signalingClient.sendClientMetrics(clientMetricFrame);
    };
    /**
     * Helper functions.
     */
    DefaultStatsCollector.prototype.isStreamRawMetricReport = function (type) {
        return type === 'ssrc' || type === 'inbound-rtp' || type === 'outbound-rtp';
    };
    DefaultStatsCollector.prototype.getMediaType = function (rawMetricReport) {
        return rawMetricReport.mediaType === 'audio' ? ClientMetricReportMediaType_1.default.AUDIO : ClientMetricReportMediaType_1.default.VIDEO;
    };
    DefaultStatsCollector.prototype.getDirectionType = function (rawMetricReport) {
        return rawMetricReport.id.toLowerCase().indexOf('send') !== -1 ||
            rawMetricReport.id.toLowerCase().indexOf('outbound') !== -1
            ? ClientMetricReportDirection_1.default.UPSTREAM
            : ClientMetricReportDirection_1.default.DOWNSTREAM;
    };
    /**
     * Metric report filter.
     */
    DefaultStatsCollector.prototype.isValidChromeRawMetric = function (rawMetricReport) {
        return (this.browserBehavior.hasChromiumWebRTC() &&
            (rawMetricReport.type === 'ssrc' ||
                rawMetricReport.type === 'VideoBwe' ||
                (rawMetricReport.type === 'googCandidatePair' &&
                    rawMetricReport.googWritable === 'true' &&
                    rawMetricReport.googReadable === 'true')));
    };
    DefaultStatsCollector.prototype.isValidStandardRawMetric = function (rawMetricReport) {
        var valid = rawMetricReport.type === 'inbound-rtp' ||
            rawMetricReport.type === 'outbound-rtp' ||
            (rawMetricReport.type === 'candidate-pair' && rawMetricReport.state === 'succeeded');
        if (this.browserBehavior.hasFirefoxWebRTC()) {
            if (this.compareMajorVersion(DefaultStatsCollector.FIREFOX_UPDATED_GET_STATS_VERSION) === -1) {
                return valid;
            }
            else {
                return valid && rawMetricReport.isRemote === false;
            }
        }
        return valid;
    };
    DefaultStatsCollector.prototype.isValidSsrc = function (rawMetricReport) {
        var validSsrc = true;
        if (this.isStreamRawMetricReport(rawMetricReport.type) &&
            this.getDirectionType(rawMetricReport) === ClientMetricReportDirection_1.default.DOWNSTREAM &&
            this.getMediaType(rawMetricReport) === ClientMetricReportMediaType_1.default.VIDEO) {
            validSsrc = this.videoStreamIndex.streamIdForSSRC(Number(rawMetricReport.ssrc)) > 0;
        }
        return validSsrc;
    };
    DefaultStatsCollector.prototype.isValidRawMetricReport = function (rawMetricReport) {
        return ((this.isValidChromeRawMetric(rawMetricReport) ||
            this.isValidStandardRawMetric(rawMetricReport)) &&
            this.isValidSsrc(rawMetricReport));
    };
    DefaultStatsCollector.prototype.filterRawMetricReports = function (rawMetricReports) {
        var e_2, _a;
        var filteredRawMetricReports = [];
        try {
            for (var rawMetricReports_2 = __values(rawMetricReports), rawMetricReports_2_1 = rawMetricReports_2.next(); !rawMetricReports_2_1.done; rawMetricReports_2_1 = rawMetricReports_2.next()) {
                var rawMetricReport = rawMetricReports_2_1.value;
                if (this.isValidRawMetricReport(rawMetricReport)) {
                    filteredRawMetricReports.push(rawMetricReport);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (rawMetricReports_2_1 && !rawMetricReports_2_1.done && (_a = rawMetricReports_2.return)) _a.call(rawMetricReports_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return filteredRawMetricReports;
    };
    DefaultStatsCollector.prototype.handleRawMetricReports = function (rawMetricReports) {
        var _this = this;
        var filteredRawMetricReports = this.filterRawMetricReports(rawMetricReports);
        this.logger.debug(function () {
            return "Filtered raw metrics : " + JSON.stringify(filteredRawMetricReports);
        });
        this.processRawMetricReports(filteredRawMetricReports);
        var clientMetricFrame = this.makeClientMetricProtobuf();
        this.sendClientMetricProtobuf(clientMetricFrame);
        this.audioVideoController.forEachObserver(function (observer) {
            Maybe_1.default.of(observer.metricsDidReceive).map(function (f) {
                return f.bind(observer)(_this.clientMetricReport.clone());
            });
        });
    };
    /**
     * Get raw webrtc metrics.
     */
    DefaultStatsCollector.prototype.getStatsWrapper = function () {
        var _this = this;
        if (!this.audioVideoController.rtcPeerConnection) {
            return;
        }
        var rawMetricReports = [];
        if (!this.browserBehavior.requiresPromiseBasedWebRTCGetStats()) {
            // @ts-ignore
            this.audioVideoController.rtcPeerConnection.getStats(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function (res) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                res.result().forEach(function (report) {
                    var item = {};
                    report.names().forEach(function (name) {
                        item[name] = report.stat(name);
                    });
                    item.id = report.id;
                    item.type = report.type;
                    item.timestamp = report.timestamp;
                    rawMetricReports.push(item);
                });
                _this.handleRawMetricReports(rawMetricReports);
            }, 
            // @ts-ignore
            function (error) {
                _this.logger.error(error.message);
            });
        }
        else {
            // @ts-ignore
            this.audioVideoController.rtcPeerConnection
                .getStats()
                .then(function (report) {
                report.forEach(function (item) {
                    rawMetricReports.push(item);
                });
                _this.handleRawMetricReports(rawMetricReports);
            })
                .catch(function (error) {
                _this.logger.error(error.message);
            });
        }
    };
    DefaultStatsCollector.prototype.compareMajorVersion = function (version) {
        var currentMajorVersion = parseInt(this.browserBehavior.version().split('.')[0]);
        var expectedMajorVersion = parseInt(version.split('.')[0]);
        if (expectedMajorVersion === currentMajorVersion) {
            return 0;
        }
        if (expectedMajorVersion > currentMajorVersion) {
            return 1;
        }
        return -1;
    };
    DefaultStatsCollector.INTERVAL_MS = 1000;
    DefaultStatsCollector.FIREFOX_UPDATED_GET_STATS_VERSION = '66.0.0';
    DefaultStatsCollector.CLIENT_TYPE = 'amazon-chime-sdk-js';
    return DefaultStatsCollector;
}());
exports.default = DefaultStatsCollector;
//# sourceMappingURL=DefaultStatsCollector.js.map