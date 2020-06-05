"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DevicePermission;
(function (DevicePermission) {
    /**
     * Permission was granted to use the device, likely by the user.
     */
    DevicePermission[DevicePermission["PermissionGrantedByUser"] = 0] = "PermissionGrantedByUser";
    /**
     * Permission was granted to use the device, likely by the browser.
     */
    DevicePermission[DevicePermission["PermissionGrantedByBrowser"] = 1] = "PermissionGrantedByBrowser";
    /**
     * Permission to use the device was denied, likely by the user.
     */
    DevicePermission[DevicePermission["PermissionDeniedByUser"] = 2] = "PermissionDeniedByUser";
    /**
     * Permission to use the device was denied, likely by the browser.
     */
    DevicePermission[DevicePermission["PermissionDeniedByBrowser"] = 3] = "PermissionDeniedByBrowser";
    /**
     * Permission was granted to use the device because it is already in use.
     */
    DevicePermission[DevicePermission["PermissionGrantedPreviously"] = 4] = "PermissionGrantedPreviously";
})(DevicePermission = exports.DevicePermission || (exports.DevicePermission = {}));
exports.default = DevicePermission;
//# sourceMappingURL=DevicePermission.js.map