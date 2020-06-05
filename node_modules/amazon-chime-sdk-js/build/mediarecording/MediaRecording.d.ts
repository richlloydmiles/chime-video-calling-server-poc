/// <reference types="dom-mediacapture-record" />
export default interface MediaRecording extends EventTarget {
    /**
     * Start the media recorder instance
     * @param {number} timeSliceMs
     */
    start(timeSliceMs?: number): void;
    /**
     * Key the recording
     */
    key(): void;
    /**
     * Stop the media recorder instance
     */
    stop(): Promise<void>;
    /**
     * Pause the media recorder instance
     */
    pause(): Promise<void>;
    /**
     * Unpause the media recorder instance
     */
    unpause(): Promise<void>;
    /**
     * Get current state of media recording
     */
    recordingState: RecordingState;
}
