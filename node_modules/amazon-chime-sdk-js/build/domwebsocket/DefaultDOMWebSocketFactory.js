"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var Versioning_1 = require("../versioning/Versioning");
var DefaultDOMWebSocket_1 = require("./DefaultDOMWebSocket");
var DefaultDOMWebSocketFactory = /** @class */ (function () {
    function DefaultDOMWebSocketFactory() {
    }
    DefaultDOMWebSocketFactory.prototype.create = function (url, protocols, binaryType) {
        var webSocket = new WebSocket(Versioning_1.default.urlWithVersion(url), protocols);
        if (binaryType !== undefined) {
            webSocket.binaryType = binaryType;
        }
        return new DefaultDOMWebSocket_1.default(webSocket);
    };
    return DefaultDOMWebSocketFactory;
}());
exports.default = DefaultDOMWebSocketFactory;
//# sourceMappingURL=DefaultDOMWebSocketFactory.js.map