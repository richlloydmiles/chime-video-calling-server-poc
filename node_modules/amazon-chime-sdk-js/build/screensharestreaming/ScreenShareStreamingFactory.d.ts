import MediaRecording from '../mediarecording/MediaRecording';
import ScreenShareStreaming from './ScreenShareStreaming';
export default interface ScreenShareStreamingFactory {
    create(mediaRecorder: MediaRecording): ScreenShareStreaming;
}
