"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultVideoTile_1 = require("../videotile/DefaultVideoTile");
var DefaultVideoTileFactory = /** @class */ (function () {
    function DefaultVideoTileFactory() {
    }
    DefaultVideoTileFactory.prototype.makeTile = function (tileId, localTile, tileController, devicePixelRatioMonitor) {
        return new DefaultVideoTile_1.default(tileId, localTile, tileController, devicePixelRatioMonitor);
    };
    return DefaultVideoTileFactory;
}());
exports.default = DefaultVideoTileFactory;
//# sourceMappingURL=DefaultVideoTileFactory.js.map