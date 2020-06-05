"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var ProtocolScreenMessageDetailSerialization_1 = require("../screenmessagedetailserialization/ProtocolScreenMessageDetailSerialization");
var ScreenSharingMessageFlagSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageFlagSerializer");
var ScreenSharingMessageSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageSerializer");
var ScreenSharingMessageTypeSerializer_1 = require("../screensharingmessageserialization/ScreenSharingMessageTypeSerializer");
var DefaultScreenSignalingSessionFactory_1 = require("./DefaultScreenSignalingSessionFactory");
var ScreenSignalingSessionContainer = /** @class */ (function () {
    function ScreenSignalingSessionContainer(webSocketFactory, logger) {
        this.webSocketFactory = webSocketFactory;
        this.logger = logger;
        this.memo = null;
    }
    ScreenSignalingSessionContainer.prototype.screenSignalingSessionFactory = function () {
        this.memo =
            this.memo ||
                new DefaultScreenSignalingSessionFactory_1.default(this.webSocketFactory, this.screenSharingMessageSerialization(), this.logger);
        return this.memo;
    };
    ScreenSignalingSessionContainer.prototype.screenSharingMessageSerialization = function () {
        return new ScreenSharingMessageSerializer_1.default(new ScreenSharingMessageTypeSerializer_1.default(), new ScreenSharingMessageFlagSerializer_1.default(), new ProtocolScreenMessageDetailSerialization_1.default());
    };
    return ScreenSignalingSessionContainer;
}());
exports.default = ScreenSignalingSessionContainer;
//# sourceMappingURL=ScreenSignalingSessionContainer.js.map