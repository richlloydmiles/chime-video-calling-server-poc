import MediaRecording from '../mediarecording/MediaRecording';
import ScreenShareStreaming from './ScreenShareStreaming';
import ScreenShareStreamingFactory from './ScreenShareStreamingFactory';
export default class ScreenShareStreamFactory implements ScreenShareStreamingFactory {
    create(mediaRecording: MediaRecording): ScreenShareStreaming;
}
