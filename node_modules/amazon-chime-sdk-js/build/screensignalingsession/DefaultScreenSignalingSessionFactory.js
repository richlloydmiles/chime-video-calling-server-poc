"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultScreenSignalingSession_1 = require("./DefaultScreenSignalingSession");
var DefaultScreenSignalingSessionFactory = /** @class */ (function () {
    function DefaultScreenSignalingSessionFactory(webSocketFactory, messageSerialization, logger) {
        this.webSocketFactory = webSocketFactory;
        this.messageSerialization = messageSerialization;
        this.logger = logger;
    }
    DefaultScreenSignalingSessionFactory.prototype.create = function (url, sessionToken) {
        var protocols = [DefaultScreenSignalingSession_1.default.SessionKey, sessionToken];
        return new DefaultScreenSignalingSession_1.default(this.webSocketFactory.create(url, protocols, 'arraybuffer'), this.messageSerialization, this.logger);
    };
    return DefaultScreenSignalingSessionFactory;
}());
exports.default = DefaultScreenSignalingSessionFactory;
//# sourceMappingURL=DefaultScreenSignalingSessionFactory.js.map