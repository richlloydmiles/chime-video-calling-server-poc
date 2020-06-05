"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [[DefaultVideoStreamIdSet]] implements [[VideoStreamIdSet]].
 */
var DefaultVideoStreamIdSet = /** @class */ (function () {
    function DefaultVideoStreamIdSet(ids) {
        this.ids = new Set(ids);
    }
    DefaultVideoStreamIdSet.prototype.add = function (streamId) {
        this.ids.add(streamId);
    };
    DefaultVideoStreamIdSet.prototype.array = function () {
        var values = Array.from(this.ids.values());
        return values.sort(function (a, b) { return a - b; });
    };
    DefaultVideoStreamIdSet.prototype.contain = function (streamId) {
        return this.ids.has(streamId);
    };
    DefaultVideoStreamIdSet.prototype.empty = function () {
        return this.ids.size === 0;
    };
    DefaultVideoStreamIdSet.prototype.size = function () {
        return this.ids.size;
    };
    DefaultVideoStreamIdSet.prototype.equal = function (other) {
        if (!other) {
            return this.ids.size === 0;
        }
        var x = this.array();
        var y = other.array();
        if (x.length !== y.length) {
            return false;
        }
        for (var i = 0; i < x.length; i++) {
            if (x[i] !== y[i]) {
                return false;
            }
        }
        return true;
    };
    DefaultVideoStreamIdSet.prototype.clone = function () {
        return new DefaultVideoStreamIdSet(this.array());
    };
    DefaultVideoStreamIdSet.prototype.remove = function (streamId) {
        this.ids.delete(streamId);
    };
    DefaultVideoStreamIdSet.prototype.toJSON = function () {
        return this.array();
    };
    return DefaultVideoStreamIdSet;
}());
exports.default = DefaultVideoStreamIdSet;
//# sourceMappingURL=DefaultVideoStreamIdSet.js.map