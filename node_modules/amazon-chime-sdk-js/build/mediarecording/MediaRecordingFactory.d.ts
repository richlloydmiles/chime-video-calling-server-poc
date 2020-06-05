import MediaRecording from './MediaRecording';
export default interface MediaRecordingFactory {
    /**
     * MediaRecording factory method
     * @param {MediaRecorder} mediaRecorder
     * @returns {MediaRecording}
     */
    create(mediaStream: MediaStream): MediaRecording;
}
