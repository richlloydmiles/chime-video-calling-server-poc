/// <reference types="dom-mediacapture-record" />
import DefaultBrowserBehavior from '../browserbehavior/DefaultBrowserBehavior';
import MediaRecording from './MediaRecording';
import MediaRecordingOptions from './MediaRecordingOptions';
export default class WebMMediaRecording implements MediaRecording {
    private mediaStream;
    private browser;
    private static readonly browser;
    private static readonly options;
    private delegate;
    readonly options: MediaRecorderOptions;
    private timeSliceMs;
    private listeners;
    constructor(mediaStream: MediaStream, options?: MediaRecordingOptions, browser?: DefaultBrowserBehavior);
    key(): void;
    start(timeSliceMs?: number): void;
    stop(): Promise<void>;
    pause(): Promise<void>;
    unpause(): Promise<void>;
    get recordingState(): RecordingState;
    addEventListener(type: string, listener: EventListener): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(type: string, listener: EventListener): void;
}
