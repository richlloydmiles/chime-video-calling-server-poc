export default interface ScreenShareFacadeObserver {
    didOpen?(event: Event): void;
    didClose?(event: CloseEvent): void;
    didStartScreenSharing?(): void;
    didStopScreenSharing?(): void;
    didPauseScreenSharing?(): void;
    didUnpauseScreenSharing?(): void;
    willReconnect?(): void;
}
