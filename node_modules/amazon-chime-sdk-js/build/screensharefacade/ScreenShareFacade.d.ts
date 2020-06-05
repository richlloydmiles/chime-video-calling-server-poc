import ScreenShareFacadeObserver from './ScreenShareFacadeObserver';
export default interface ScreenShareFacade {
    /**
     * Starts the screen share connection.
     */
    open(): Promise<void>;
    /**
     * Stops the screen share connection.
     */
    close(): Promise<void>;
    /**
     * Starts screen sharing.
     */
    start(sourceId?: string): Promise<void>;
    /**
     * Stops screen sharing.
     */
    stop(): Promise<void>;
    /**
     * Pauses screen sharing
     */
    pause(): Promise<void>;
    /**
     * Unpause screen sharing
     */
    unpause(): Promise<void>;
    /**
     * Register the provided observer
     * @param {ScreenShareFacadeObserver} observer
     */
    registerObserver(observer: ScreenShareFacadeObserver): void;
    /**
     * Unregister the provided observer
     * @param {ScreenShareFacadeObserver} observer
     */
    unregisterObserver(observer: ScreenShareFacadeObserver): void;
}
