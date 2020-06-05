export declare enum DevicePermission {
    /**
     * Permission was granted to use the device, likely by the user.
     */
    PermissionGrantedByUser = 0,
    /**
     * Permission was granted to use the device, likely by the browser.
     */
    PermissionGrantedByBrowser = 1,
    /**
     * Permission to use the device was denied, likely by the user.
     */
    PermissionDeniedByUser = 2,
    /**
     * Permission to use the device was denied, likely by the browser.
     */
    PermissionDeniedByBrowser = 3,
    /**
     * Permission was granted to use the device because it is already in use.
     */
    PermissionGrantedPreviously = 4
}
export default DevicePermission;
