"use strict";
// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ContentShareConstants_1 = require("../contentsharecontroller/ContentShareConstants");
var DefaultModality = /** @class */ (function () {
    function DefaultModality(_id) {
        this._id = _id;
    }
    DefaultModality.prototype.id = function () {
        return this._id;
    };
    DefaultModality.prototype.base = function () {
        if (this._id === '') {
            return '';
        }
        return this._id.split(DefaultModality.MODALITY_SEPARATOR)[0];
    };
    DefaultModality.prototype.modality = function () {
        if (!this._id) {
            return '';
        }
        var components = this._id.split(DefaultModality.MODALITY_SEPARATOR);
        if (components.length === 2) {
            return components[1];
        }
        return '';
    };
    DefaultModality.prototype.hasModality = function (modality) {
        return modality !== '' && this.modality() === modality;
    };
    DefaultModality.prototype.withModality = function (modality) {
        var m = new DefaultModality(this.base() + DefaultModality.MODALITY_SEPARATOR + modality);
        if (modality === '' ||
            this.base() === '' ||
            new DefaultModality(m._id).modality() !== modality) {
            return new DefaultModality(this.base());
        }
        return m;
    };
    DefaultModality.MODALITY_SEPARATOR = ContentShareConstants_1.default.Modality[0];
    DefaultModality.MODALITY_CONTENT = ContentShareConstants_1.default.Modality.substr(1);
    return DefaultModality;
}());
exports.default = DefaultModality;
//# sourceMappingURL=DefaultModality.js.map