"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
var SignalingProtocol_js_1 = require("../signalingprotocol/SignalingProtocol.js");
var DefaultVideoStreamIdSet_1 = require("../videostreamidset/DefaultVideoStreamIdSet");
/**
 * [[DefaultVideoStreamIndex]] implements [[VideoStreamIndex]] to facilitate video stream subscription
 * and includes query functions for stream id and attendee id.
 */
var DefaultVideoStreamIndex = /** @class */ (function () {
    function DefaultVideoStreamIndex(logger) {
        this.logger = logger;
        this.currentIndex = null;
        this.currentSubscribeAck = null;
        this.trackToStreamMap = null;
        this.streamToAttendeeMap = null;
        this.ssrcToStreamMap = null;
    }
    DefaultVideoStreamIndex.prototype.integrateIndexFrame = function (indexFrame) {
        this.currentIndex = indexFrame;
        this.streamToAttendeeMap = null;
        this.ssrcToStreamMap = null;
    };
    DefaultVideoStreamIndex.prototype.integrateSubscribeAckFrame = function (subscribeAck) {
        this.currentSubscribeAck = subscribeAck;
        this.trackToStreamMap = null;
    };
    DefaultVideoStreamIndex.prototype.allStreams = function () {
        var e_1, _a;
        var set = new DefaultVideoStreamIdSet_1.default();
        if (this.currentIndex) {
            try {
                for (var _b = __values(this.currentIndex.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var source = _c.value;
                    set.add(source.streamId);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return set;
    };
    DefaultVideoStreamIndex.prototype.allVideoSendingAttendeesExcludingSelf = function (selfAttendeeId) {
        var e_2, _a;
        var attendees = new Set();
        if (this.currentIndex) {
            if (this.currentIndex.sources.length) {
                try {
                    for (var _b = __values(this.currentIndex.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var stream = _c.value;
                        if (stream.attendeeId !== selfAttendeeId &&
                            stream.mediaType === SignalingProtocol_js_1.SdkStreamMediaType.VIDEO) {
                            attendees.add(stream.attendeeId);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        return attendees;
    };
    DefaultVideoStreamIndex.prototype.streamSelectionUnderBandwidthConstraint = function (selfAttendeeId, largeTileAttendeeIds, smallTileAttendeeIds, bandwidthKbps) {
        var e_3, _a, e_4, _b;
        var newAttendees = new Set();
        if (this.currentIndex) {
            try {
                for (var _c = __values(this.currentIndex.sources), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var stream = _d.value;
                    if (stream.attendeeId === selfAttendeeId || stream.mediaType !== SignalingProtocol_js_1.SdkStreamMediaType.VIDEO) {
                        continue;
                    }
                    if (!largeTileAttendeeIds.has(stream.attendeeId) &&
                        !smallTileAttendeeIds.has(stream.attendeeId)) {
                        newAttendees.add(stream.attendeeId);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var attendeeToStreamDescriptorMap = this.buildAttendeeToSortedStreamDescriptorMapExcludingSelf(selfAttendeeId);
        var selectionMap = new Map();
        var usage = 0;
        attendeeToStreamDescriptorMap.forEach(function (streams, attendeeId) {
            selectionMap.set(attendeeId, streams[0]);
            usage += streams[0].maxBitrateKbps;
        });
        usage = this.trySelectHighBitrateForAttendees(attendeeToStreamDescriptorMap, largeTileAttendeeIds, usage, bandwidthKbps, selectionMap);
        this.trySelectHighBitrateForAttendees(attendeeToStreamDescriptorMap, newAttendees, usage, bandwidthKbps, selectionMap);
        var streamSelectionSet = new DefaultVideoStreamIdSet_1.default();
        try {
            for (var _e = __values(selectionMap.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var source = _f.value;
                streamSelectionSet.add(source.streamId);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return streamSelectionSet;
    };
    DefaultVideoStreamIndex.prototype.highestQualityStreamFromEachGroupExcludingSelf = function (selfAttendeeId) {
        var e_5, _a, e_6, _b;
        var set = new DefaultVideoStreamIdSet_1.default();
        if (this.currentIndex) {
            var maxes = new Map();
            try {
                for (var _c = __values(this.currentIndex.sources), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var source = _d.value;
                    if (source.attendeeId === selfAttendeeId || source.mediaType !== SignalingProtocol_js_1.SdkStreamMediaType.VIDEO) {
                        continue;
                    }
                    if (!maxes.has(source.groupId) ||
                        source.maxBitrateKbps > maxes.get(source.groupId).maxBitrateKbps) {
                        maxes.set(source.groupId, source);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                for (var _e = __values(maxes.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var source = _f.value;
                    set.add(source.streamId);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        return set;
    };
    DefaultVideoStreamIndex.prototype.numberOfVideoPublishingParticipantsExcludingSelf = function (selfAttendeeId) {
        return this.highestQualityStreamFromEachGroupExcludingSelf(selfAttendeeId).array().length;
    };
    DefaultVideoStreamIndex.prototype.attendeeIdForTrack = function (trackId) {
        var streamId = this.streamIdForTrack(trackId);
        if (streamId === undefined) {
            this.logger.warn("track " + trackId + " does not correspond to a known stream");
            return '';
        }
        if (!this.streamToAttendeeMap) {
            if (this.currentIndex) {
                this.streamToAttendeeMap = this.buildStreamToAttendeeMap(this.currentIndex);
            }
            else {
                return '';
            }
        }
        var attendeeId = this.streamToAttendeeMap.get(streamId);
        if (!attendeeId) {
            this.logger.info("track " + trackId + " (stream " + streamId + ") does not correspond to a known attendee");
            return '';
        }
        return attendeeId;
    };
    DefaultVideoStreamIndex.prototype.attendeeIdForStreamId = function (streamId) {
        if (!this.streamToAttendeeMap) {
            if (this.currentIndex) {
                this.streamToAttendeeMap = this.buildStreamToAttendeeMap(this.currentIndex);
            }
            else {
                return '';
            }
        }
        var attendeeId = this.streamToAttendeeMap.get(streamId);
        if (!attendeeId) {
            this.logger.info("stream " + streamId + ") does not correspond to a known attendee");
            return '';
        }
        return attendeeId;
    };
    DefaultVideoStreamIndex.prototype.streamIdForTrack = function (trackId) {
        if (!this.trackToStreamMap) {
            if (this.currentSubscribeAck) {
                this.trackToStreamMap = this.buildTrackToStreamMap(this.currentSubscribeAck);
            }
            else {
                return undefined;
            }
        }
        return this.trackToStreamMap.get(trackId);
    };
    DefaultVideoStreamIndex.prototype.streamIdForSSRC = function (ssrcId) {
        if (!this.ssrcToStreamMap) {
            if (this.currentSubscribeAck) {
                this.ssrcToStreamMap = this.buildSSRCToStreamMap(this.currentSubscribeAck);
            }
            else {
                return undefined;
            }
        }
        return this.ssrcToStreamMap.get(ssrcId);
    };
    DefaultVideoStreamIndex.prototype.streamsPausedAtSource = function () {
        var e_7, _a;
        var paused = new DefaultVideoStreamIdSet_1.default();
        if (this.currentIndex) {
            try {
                for (var _b = __values(this.currentIndex.pausedAtSourceIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var streamId = _c.value;
                    paused.add(streamId);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        return paused;
    };
    DefaultVideoStreamIndex.prototype.buildTrackToStreamMap = function (subscribeAck) {
        var e_8, _a;
        var map = new Map();
        this.logger.debug(function () { return "trackMap " + JSON.stringify(subscribeAck.tracks); });
        try {
            for (var _b = __values(subscribeAck.tracks), _c = _b.next(); !_c.done; _c = _b.next()) {
                var trackMapping = _c.value;
                if (trackMapping.trackLabel.length > 0 && trackMapping.streamId > 0) {
                    map.set(trackMapping.trackLabel, trackMapping.streamId);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return map;
    };
    DefaultVideoStreamIndex.prototype.buildSSRCToStreamMap = function (subscribeAck) {
        var e_9, _a;
        var map = new Map();
        this.logger.debug(function () { return "ssrcMap " + JSON.stringify(subscribeAck.tracks); });
        try {
            for (var _b = __values(subscribeAck.tracks), _c = _b.next(); !_c.done; _c = _b.next()) {
                var trackMapping = _c.value;
                if (trackMapping.trackLabel.length > 0 && trackMapping.streamId > 0) {
                    map.set(trackMapping.ssrc, trackMapping.streamId);
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return map;
    };
    DefaultVideoStreamIndex.prototype.buildStreamToAttendeeMap = function (indexFrame) {
        var e_10, _a;
        var map = new Map();
        try {
            for (var _b = __values(indexFrame.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                var source = _c.value;
                map.set(source.streamId, source.attendeeId);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return map;
    };
    DefaultVideoStreamIndex.prototype.trySelectHighBitrateForAttendees = function (attendeeToStreamDescriptorMap, highAttendees, currentUsage, bandwidthKbps, currentSelectionRef) {
        var e_11, _a, e_12, _b;
        try {
            for (var highAttendees_1 = __values(highAttendees), highAttendees_1_1 = highAttendees_1.next(); !highAttendees_1_1.done; highAttendees_1_1 = highAttendees_1.next()) {
                var attendeeId = highAttendees_1_1.value;
                if (currentUsage >= bandwidthKbps) {
                    break;
                }
                if (attendeeToStreamDescriptorMap.has(attendeeId)) {
                    var streams = attendeeToStreamDescriptorMap.get(attendeeId);
                    try {
                        for (var _c = (e_12 = void 0, __values(streams.reverse())), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var l = _d.value;
                            if (currentUsage - currentSelectionRef.get(attendeeId).maxBitrateKbps + l.maxBitrateKbps <
                                bandwidthKbps) {
                                currentUsage =
                                    currentUsage - currentSelectionRef.get(attendeeId).maxBitrateKbps + l.maxBitrateKbps;
                                currentSelectionRef.set(attendeeId, l);
                                break;
                            }
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (highAttendees_1_1 && !highAttendees_1_1.done && (_a = highAttendees_1.return)) _a.call(highAttendees_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return currentUsage;
    };
    DefaultVideoStreamIndex.prototype.buildAttendeeToSortedStreamDescriptorMapExcludingSelf = function (selfAttendeeId) {
        var e_13, _a;
        var attendeeToStreamDescriptorMap = new Map();
        if (this.currentIndex) {
            try {
                for (var _b = __values(this.currentIndex.sources), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var source = _c.value;
                    if (source.attendeeId === selfAttendeeId || source.mediaType !== SignalingProtocol_js_1.SdkStreamMediaType.VIDEO) {
                        continue;
                    }
                    if (attendeeToStreamDescriptorMap.has(source.attendeeId)) {
                        attendeeToStreamDescriptorMap.get(source.attendeeId).push(source);
                    }
                    else {
                        attendeeToStreamDescriptorMap.set(source.attendeeId, [source]);
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        attendeeToStreamDescriptorMap.forEach(function (streams, _attendeeId) {
            streams.sort(function (stream1, stream2) {
                if (stream1.maxBitrateKbps > stream2.maxBitrateKbps) {
                    return 1;
                }
                else if (stream1.maxBitrateKbps < stream2.maxBitrateKbps) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        });
        return attendeeToStreamDescriptorMap;
    };
    return DefaultVideoStreamIndex;
}());
exports.default = DefaultVideoStreamIndex;
//# sourceMappingURL=DefaultVideoStreamIndex.js.map