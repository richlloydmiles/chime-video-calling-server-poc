export default interface ScreenSignalingSession extends EventTarget {
    /**
     * Opens the screen sharing session
     */
    open(timeoutMs: number): Promise<Event>;
    /**
     * Closes the screen sharing session
     * @param {number} timeoutMs
     * @returns {Promise<Event>}
     */
    close(timeoutMs: number): Promise<Event>;
}
