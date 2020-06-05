import MediaRecording from './MediaRecording';
import MediaRecordingFactory from './MediaRecordingFactory';
import MediaRecordingOptions from './MediaRecordingOptions';
export default class WebMMediaRecordingFactory implements MediaRecordingFactory {
    private mediaRecordingOptions;
    constructor(mediaRecordingOptions?: MediaRecordingOptions);
    create(mediaStream: MediaStream): MediaRecording;
}
