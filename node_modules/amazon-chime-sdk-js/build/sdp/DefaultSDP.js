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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SDPCandidateType_1 = require("./SDPCandidateType");
/**
 * Implements [[SDP]]. [[SDP]] also includes a few helper functions for parsing string.
 */
var DefaultSDP = /** @class */ (function () {
    function DefaultSDP(sdp) {
        this.sdp = sdp;
    }
    DefaultSDP.prototype.clone = function () {
        return new DefaultSDP(this.sdp);
    };
    DefaultSDP.isRTPCandidate = function (candidate) {
        var match = /candidate[:](\S+) (\d+)/g.exec(candidate);
        if (match === null || match[2] !== '1') {
            return false;
        }
        return true;
    };
    DefaultSDP.linesToSDP = function (lines) {
        return new DefaultSDP(lines.join(DefaultSDP.CRLF));
    };
    DefaultSDP.candidateTypeFromString = function (candidateType) {
        switch (candidateType) {
            case SDPCandidateType_1.default.Host:
                return SDPCandidateType_1.default.Host;
            case SDPCandidateType_1.default.ServerReflexive:
                return SDPCandidateType_1.default.ServerReflexive;
            case SDPCandidateType_1.default.PeerReflexive:
                return SDPCandidateType_1.default.PeerReflexive;
            case SDPCandidateType_1.default.Relay:
                return SDPCandidateType_1.default.Relay;
        }
        return null;
    };
    DefaultSDP.candidateType = function (sdpLine) {
        var match = /a[=]candidate[:].* typ ([a-z]+) /g.exec(sdpLine);
        if (match === null) {
            return null;
        }
        return DefaultSDP.candidateTypeFromString(match[1]);
    };
    DefaultSDP.splitLines = function (blob) {
        return blob
            .trim()
            .split('\n')
            .map(function (line) {
            return line.trim();
        });
    };
    DefaultSDP.splitSections = function (sdp) {
        // each section starts with "m="
        var sections = sdp.split('\nm=');
        return sections.map(function (section, index) {
            return (index > 0 ? 'm=' + section : section).trim() + DefaultSDP.CRLF;
        });
    };
    DefaultSDP.findActiveCameraSection = function (sections) {
        var e_1, _a;
        var cameraLineIndex = 0;
        var hasCamera = false;
        try {
            for (var sections_1 = __values(sections), sections_1_1 = sections_1.next(); !sections_1_1.done; sections_1_1 = sections_1.next()) {
                var sec = sections_1_1.value;
                if (/^m=video/.test(sec)) {
                    if (sec.indexOf('sendrecv') > -1) {
                        hasCamera = true;
                        break;
                    }
                }
                cameraLineIndex++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sections_1_1 && !sections_1_1.done && (_a = sections_1.return)) _a.call(sections_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (hasCamera === false) {
            cameraLineIndex = -1;
        }
        return cameraLineIndex;
    };
    DefaultSDP.parseSSRCMedia = function (ssrcMediaAttributeLine) {
        var separator = ssrcMediaAttributeLine.indexOf(' ');
        var ssrc = 0;
        var attribute = '';
        var value = '';
        ssrc = DefaultSDP.extractSSRCFromAttributeLine(ssrcMediaAttributeLine);
        var secondColon = ssrcMediaAttributeLine.indexOf(':', separator);
        if (secondColon > -1) {
            attribute = ssrcMediaAttributeLine.substr(separator + 1, secondColon - separator - 1);
            value = ssrcMediaAttributeLine.substr(secondColon + 1);
        }
        else {
            attribute = ssrcMediaAttributeLine.substr(separator + 1);
        }
        return [ssrc, attribute, value];
    };
    // a=ssrc-group:<semantics> <ssrc-id> ...
    DefaultSDP.extractSSRCsFromFIDGroupLine = function (figGroupLine) {
        var ssrcStringMatch = /^a=ssrc-group:FID\s(.+)/.exec(figGroupLine);
        return ssrcStringMatch[1];
    };
    // a=ssrc:<ssrc-id> <attribute> or a=ssrc:<ssrc-id> <attribute>:<value>, ssrc-id is a 32bit integer
    DefaultSDP.extractSSRCFromAttributeLine = function (ssrcMediaAttributeLine) {
        var ssrcStringMatch = /^a=ssrc:([0-9]+)\s/.exec(ssrcMediaAttributeLine);
        if (ssrcStringMatch === null) {
            return 0;
        }
        return parseInt(ssrcStringMatch[1], 10);
    };
    DefaultSDP.matchPrefix = function (blob, prefix) {
        return DefaultSDP.splitLines(blob).filter(function (line) {
            return line.indexOf(prefix) === 0;
        });
    };
    DefaultSDP.prototype.lines = function () {
        return this.sdp.split(DefaultSDP.CRLF);
    };
    DefaultSDP.prototype.hasVideo = function () {
        return /^m=video/gm.exec(this.sdp) !== null;
    };
    DefaultSDP.prototype.hasCandidates = function () {
        var match = /a[=]candidate[:]/g.exec(this.sdp);
        if (match === null) {
            return false;
        }
        return true;
    };
    DefaultSDP.prototype.hasCandidatesForAllMLines = function () {
        var isAnyCLineUsingLocalHost = this.sdp.indexOf('c=IN IP4 0.0.0.0') > -1;
        var mLinesHaveCandidates = !isAnyCLineUsingLocalHost;
        return mLinesHaveCandidates;
    };
    DefaultSDP.prototype.withBundleAudioVideo = function () {
        var e_2, _a;
        var srcLines = this.lines();
        var dstLines = [];
        try {
            for (var srcLines_1 = __values(srcLines), srcLines_1_1 = srcLines_1.next(); !srcLines_1_1.done; srcLines_1_1 = srcLines_1.next()) {
                var line = srcLines_1_1.value;
                var mod = line.replace(/^a=group:BUNDLE audio$/, 'a=group:BUNDLE audio video');
                if (mod !== line) {
                    dstLines.push(mod);
                    continue;
                }
                dstLines.push(line);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (srcLines_1_1 && !srcLines_1_1.done && (_a = srcLines_1.return)) _a.call(srcLines_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return DefaultSDP.linesToSDP(dstLines);
    };
    DefaultSDP.prototype.copyVideo = function (otherSDP) {
        var e_3, _a;
        var otherLines = otherSDP.split(DefaultSDP.CRLF);
        var dstLines = DefaultSDP.splitLines(this.sdp);
        var inVideoMedia = false;
        try {
            for (var otherLines_1 = __values(otherLines), otherLines_1_1 = otherLines_1.next(); !otherLines_1_1.done; otherLines_1_1 = otherLines_1.next()) {
                var line = otherLines_1_1.value;
                if (/^m=video/.test(line)) {
                    inVideoMedia = true;
                }
                else if (/^m=/.test(line)) {
                    inVideoMedia = false;
                }
                if (inVideoMedia) {
                    dstLines.push(line);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (otherLines_1_1 && !otherLines_1_1.done && (_a = otherLines_1.return)) _a.call(otherLines_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return DefaultSDP.linesToSDP(dstLines);
    };
    DefaultSDP.prototype.withoutCandidateType = function (candidateTypeToExclude) {
        return DefaultSDP.linesToSDP(this.lines().filter(function (line) { return DefaultSDP.candidateType(line) !== candidateTypeToExclude; }));
    };
    DefaultSDP.prototype.withoutServerReflexiveCandidates = function () {
        return this.withoutCandidateType(SDPCandidateType_1.default.ServerReflexive);
    };
    DefaultSDP.prototype.withBandwidthRestriction = function (maxBitrateKbps, isUnifiedPlan) {
        var e_4, _a;
        var srcLines = this.lines();
        var dstLines = [];
        try {
            for (var srcLines_2 = __values(srcLines), srcLines_2_1 = srcLines_2.next(); !srcLines_2_1.done; srcLines_2_1 = srcLines_2.next()) {
                var line = srcLines_2_1.value;
                dstLines.push(line);
                if (/^m=video/.test(line)) {
                    if (isUnifiedPlan) {
                        dstLines.push("b=TIAS:" + maxBitrateKbps * 1000);
                    }
                    else {
                        dstLines.push("b=AS:" + maxBitrateKbps);
                    }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (srcLines_2_1 && !srcLines_2_1.done && (_a = srcLines_2.return)) _a.call(srcLines_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return DefaultSDP.linesToSDP(dstLines);
    };
    // TODO: will remove this soon.
    DefaultSDP.prototype.withUnifiedPlanFormat = function () {
        var originalSdp = this.sdp;
        if (originalSdp.includes('mozilla')) {
            return this.clone();
        }
        else {
            originalSdp = originalSdp.replace('o=-', 'o=mozilla-chrome');
        }
        return new DefaultSDP(originalSdp);
    };
    DefaultSDP.prototype.withPlanBSimulcast = function (videoSimulcastLayerCount) {
        if (videoSimulcastLayerCount < 2) {
            return this.clone();
        }
        var srcSDP = this.sdp;
        var sections = DefaultSDP.splitSections(srcSDP);
        if (sections.length < 2) {
            return new DefaultSDP(this.sdp);
        }
        var cameraLineIndex = DefaultSDP.findActiveCameraSection(sections);
        if (cameraLineIndex === -1) {
            return new DefaultSDP(this.sdp);
        }
        var cname = '';
        var msid = '';
        DefaultSDP.matchPrefix(sections[cameraLineIndex], 'a=ssrc:').forEach(function (line) {
            var ssrcAttrTuple = DefaultSDP.parseSSRCMedia(line);
            if (ssrcAttrTuple[1] === 'cname') {
                cname = ssrcAttrTuple[2];
            }
            else if (ssrcAttrTuple[1] === 'msid') {
                msid = ssrcAttrTuple[2];
            }
        });
        var fidGroupMatch = DefaultSDP.matchPrefix(sections[cameraLineIndex], 'a=ssrc-group:FID ');
        if (cname === '' || msid === '' || fidGroupMatch.length < 1) {
            return new DefaultSDP(this.sdp);
        }
        var fidGroup = DefaultSDP.extractSSRCsFromFIDGroupLine(fidGroupMatch[0]);
        var cameraSectionLines = sections[cameraLineIndex]
            .trim()
            .split(DefaultSDP.CRLF)
            .filter(function (line) {
            return line.indexOf('a=ssrc:') !== 0 && line.indexOf('a=ssrc-group:') !== 0;
        });
        var simulcastSSRCs = [];
        var _a = __read(fidGroup.split(' ').map(function (ssrc) { return parseInt(ssrc, 10); }), 2), videoSSRC1 = _a[0], rtxSSRC1 = _a[1];
        var videoSSRC = videoSSRC1;
        var rtxSSRC = rtxSSRC1;
        for (var i = 0; i < videoSimulcastLayerCount; i++) {
            cameraSectionLines.push('a=ssrc:' + videoSSRC + ' cname:' + cname);
            cameraSectionLines.push('a=ssrc:' + videoSSRC + ' msid:' + msid);
            cameraSectionLines.push('a=ssrc:' + rtxSSRC + ' cname:' + cname);
            cameraSectionLines.push('a=ssrc:' + rtxSSRC + ' msid:' + msid);
            cameraSectionLines.push('a=ssrc-group:FID ' + videoSSRC + ' ' + rtxSSRC);
            simulcastSSRCs.push(videoSSRC);
            videoSSRC = videoSSRC + 1;
            rtxSSRC = videoSSRC + 1;
        }
        cameraSectionLines.push('a=ssrc-group:SIM ' + simulcastSSRCs.join(' '));
        sections[cameraLineIndex] = cameraSectionLines.join(DefaultSDP.CRLF) + DefaultSDP.CRLF;
        var newSDP = sections.join('');
        return new DefaultSDP(newSDP);
    };
    DefaultSDP.prototype.ssrcForVideoSendingSection = function () {
        var srcSDP = this.sdp;
        var sections = DefaultSDP.splitSections(srcSDP);
        if (sections.length < 2) {
            return '';
        }
        var cameraLineIndex = DefaultSDP.findActiveCameraSection(sections);
        if (cameraLineIndex === -1) {
            return '';
        }
        // TODO: match for Firefox. Currently all failures are not Firefox induced.
        var fidGroupMatch = DefaultSDP.matchPrefix(sections[cameraLineIndex], 'a=ssrc-group:FID ');
        if (fidGroupMatch.length < 1) {
            return '';
        }
        var fidGroup = DefaultSDP.extractSSRCsFromFIDGroupLine(fidGroupMatch[0]);
        var _a = __read(fidGroup.split(' ').map(function (ssrc) { return parseInt(ssrc, 10); }), 1), videoSSRC1 = _a[0];
        return videoSSRC1.toString();
    };
    DefaultSDP.prototype.videoSendSectionHasDifferentSSRC = function (prevSdp) {
        var ssrc1 = this.ssrcForVideoSendingSection();
        var ssrc2 = prevSdp.ssrcForVideoSendingSection();
        if (ssrc1 === '' || ssrc2 === '') {
            return false;
        }
        var ssrc1InNumber = parseInt(ssrc1, 10);
        var ssrc2InNumber = parseInt(ssrc2, 10);
        if (ssrc1InNumber === ssrc2InNumber) {
            return false;
        }
        return true;
    };
    DefaultSDP.CRLF = '\r\n';
    return DefaultSDP;
}());
exports.default = DefaultSDP;
//# sourceMappingURL=DefaultSDP.js.map