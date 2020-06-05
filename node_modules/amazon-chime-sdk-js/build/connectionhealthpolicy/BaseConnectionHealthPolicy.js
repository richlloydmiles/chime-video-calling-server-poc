"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var BaseConnectionHealthPolicy = /** @class */ (function () {
    function BaseConnectionHealthPolicy(configuration, data) {
        this.minHealth = configuration.minHealth;
        this.maxHealth = configuration.maxHealth;
        this.currentHealth = configuration.initialHealth;
        this.currentData = data.clone();
    }
    BaseConnectionHealthPolicy.prototype.minimumHealth = function () {
        return this.minHealth;
    };
    BaseConnectionHealthPolicy.prototype.maximumHealth = function () {
        return this.maxHealth;
    };
    BaseConnectionHealthPolicy.prototype.health = function () {
        return this.maximumHealth();
    };
    BaseConnectionHealthPolicy.prototype.update = function (connectionHealthData) {
        this.currentData = connectionHealthData;
    };
    BaseConnectionHealthPolicy.prototype.getConnectionHealthData = function () {
        return this.currentData.clone();
    };
    BaseConnectionHealthPolicy.prototype.healthy = function () {
        return this.health() > this.minimumHealth();
    };
    BaseConnectionHealthPolicy.prototype.healthIfChanged = function () {
        var newHealth = this.health();
        if (newHealth !== this.currentHealth) {
            this.currentHealth = newHealth;
            return newHealth;
        }
        return null;
    };
    return BaseConnectionHealthPolicy;
}());
exports.default = BaseConnectionHealthPolicy;
//# sourceMappingURL=BaseConnectionHealthPolicy.js.map