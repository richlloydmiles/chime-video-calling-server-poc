"use strict";
// Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var detect_browser_1 = require("detect-browser");
var DefaultBrowserBehavior = /** @class */ (function () {
    function DefaultBrowserBehavior(_a) {
        var _b = (_a === void 0 ? {} : _a).enableUnifiedPlanForChromiumBasedBrowsers, enableUnifiedPlanForChromiumBasedBrowsers = _b === void 0 ? false : _b;
        this.browser = detect_browser_1.detect();
        this.browserSupport = {
            chrome: 78,
            'edge-chromium': 79,
            electron: 7,
            firefox: 60,
            ios: 12,
            safari: 12,
            opera: 66,
        };
        this.browserName = {
            chrome: 'Google Chrome',
            'edge-chromium': 'Microsoft Edge',
            electron: 'Electron',
            firefox: 'Mozilla Firefox',
            ios: 'Safari iOS',
            safari: 'Safari',
            opera: 'Opera',
        };
        this.chromeLike = ['chrome', 'edge-chromium', 'chromium-webview', 'opera'];
        this.enableUnifiedPlanForChromiumBasedBrowsers = enableUnifiedPlanForChromiumBasedBrowsers;
    }
    DefaultBrowserBehavior.prototype.version = function () {
        return this.browser.version;
    };
    DefaultBrowserBehavior.prototype.majorVersion = function () {
        return parseInt(this.version().split('.')[0]);
    };
    DefaultBrowserBehavior.prototype.name = function () {
        return this.browser.name;
    };
    DefaultBrowserBehavior.prototype.hasChromiumWebRTC = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.chromeLike), _c = _b.next(); !_c.done; _c = _b.next()) {
                var browser = _c.value;
                if (browser === this.browser.name) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    DefaultBrowserBehavior.prototype.hasFirefoxWebRTC = function () {
        return this.isFirefox();
    };
    DefaultBrowserBehavior.prototype.screenShareSendsOnlyKeyframes = function () {
        return this.isFirefox();
    };
    DefaultBrowserBehavior.prototype.requiresUnifiedPlan = function () {
        var shouldEnable = this.isSafari() || this.isFirefox();
        if (this.enableUnifiedPlanForChromiumBasedBrowsers) {
            shouldEnable = shouldEnable || this.hasChromiumWebRTC();
        }
        return shouldEnable;
    };
    DefaultBrowserBehavior.prototype.requiresCheckForSdpConnectionAttributes = function () {
        return !this.isIOSSafari();
    };
    DefaultBrowserBehavior.prototype.requiresIceCandidateGatheringTimeoutWorkaround = function () {
        return this.hasChromiumWebRTC();
    };
    DefaultBrowserBehavior.prototype.requiresUnifiedPlanMunging = function () {
        var shouldRequire = this.isSafari();
        if (this.enableUnifiedPlanForChromiumBasedBrowsers) {
            shouldRequire = shouldRequire || this.hasChromiumWebRTC();
        }
        return shouldRequire;
    };
    DefaultBrowserBehavior.prototype.requiresBundlePolicy = function () {
        return 'max-bundle';
    };
    DefaultBrowserBehavior.prototype.requiresPromiseBasedWebRTCGetStats = function () {
        return !this.hasChromiumWebRTC();
    };
    DefaultBrowserBehavior.prototype.requiresVideoElementWorkaround = function () {
        return this.isSafari();
    };
    DefaultBrowserBehavior.prototype.getDisplayMediaAudioCaptureSupport = function () {
        return this.isChrome() || this.isEdge();
    };
    DefaultBrowserBehavior.prototype.screenShareUnsupported = function () {
        if (this.isSafari()) {
            return true;
        }
        return false;
    };
    DefaultBrowserBehavior.prototype.isSupported = function () {
        return this.majorVersion() >= this.browserSupport[this.browser.name];
    };
    DefaultBrowserBehavior.prototype.supportString = function () {
        var s = [];
        for (var k in this.browserSupport) {
            s.push(this.browserName[k] + " " + this.browserSupport[k] + "+");
        }
        return s.join(', ');
    };
    DefaultBrowserBehavior.prototype.supportedVideoCodecs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pc = new RTCPeerConnection();
                        pc.addTransceiver('video', { direction: 'inactive', streams: [] });
                        return [4 /*yield*/, pc.createOffer({ offerToReceiveVideo: true })];
                    case 1: return [2 /*return*/, (_a.sent()).sdp
                            .split('\r\n')
                            .filter(function (x) {
                            return x.includes('a=rtpmap:');
                        })
                            .map(function (x) {
                            return x.replace(/.* /, '').replace(/\/.*/, '');
                        })
                            .filter(function (v, i, a) {
                            return a.indexOf(v) === i;
                        })
                            .filter(function (x) {
                            return x !== 'rtx' && x !== 'red' && x !== 'ulpfec';
                        })];
                }
            });
        });
    };
    // These helpers should be kept private to encourage
    // feature detection instead of browser detection.
    DefaultBrowserBehavior.prototype.isIOSSafari = function () {
        return this.browser.name === 'ios';
    };
    DefaultBrowserBehavior.prototype.isSafari = function () {
        return this.browser.name === 'safari' || this.browser.name === 'ios';
    };
    DefaultBrowserBehavior.prototype.isFirefox = function () {
        return this.browser.name === 'firefox';
    };
    DefaultBrowserBehavior.prototype.isChrome = function () {
        return this.browser.name === 'chrome';
    };
    DefaultBrowserBehavior.prototype.isEdge = function () {
        return this.browser.name === 'edge-chromium';
    };
    return DefaultBrowserBehavior;
}());
exports.default = DefaultBrowserBehavior;
//# sourceMappingURL=DefaultBrowserBehavior.js.map