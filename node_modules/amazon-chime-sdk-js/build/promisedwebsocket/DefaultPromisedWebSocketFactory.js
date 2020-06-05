"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultPromisedWebSocket_1 = require("./DefaultPromisedWebSocket");
var DefaultPromisedWebSocketFactory = /** @class */ (function () {
    function DefaultPromisedWebSocketFactory(webSocketFactory) {
        this.webSocketFactory = webSocketFactory;
    }
    DefaultPromisedWebSocketFactory.prototype.create = function (url, protocols, binaryType) {
        return new DefaultPromisedWebSocket_1.default(this.webSocketFactory.create(url, protocols, binaryType));
    };
    return DefaultPromisedWebSocketFactory;
}());
exports.default = DefaultPromisedWebSocketFactory;
//# sourceMappingURL=DefaultPromisedWebSocketFactory.js.map