export default interface ScreenShareStreaming extends EventTarget {
    /**
     * Start the stream
     * @param {number} timeSliceMs
     * @returns {Promise<void>}
     */
    start(timeSliceMs?: number): void;
    /**
     * Stop the stream
     * @returns {Promise<void>}
     */
    stop(): Promise<void>;
    /**
     * Pause the stream
     * @returns {Promise<void>}
     */
    pause(): Promise<void>;
    /**
     * Unpause the stream
     * @returns {Promise<void>}
     */
    unpause(): Promise<void>;
    /**
     * Key the stream
     */
    key(): void;
}
