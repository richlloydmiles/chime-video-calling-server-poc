import AudioVideoController from '../audiovideocontroller/AudioVideoController';
import AudioVideoObserver from '../audiovideoobserver/AudioVideoObserver';
import ContentShareObserver from '../contentshareobserver/ContentShareObserver';
import MeetingSessionConfiguration from '../meetingsession/MeetingSessionConfiguration';
import MeetingSessionStatus from '../meetingsession/MeetingSessionStatus';
import ContentShareController from './ContentShareController';
import ContentShareMediaStreamBroker from './ContentShareMediaStreamBroker';
export default class DefaultContentShareController implements ContentShareController, AudioVideoObserver {
    private mediaStreamBroker;
    private audioVideo;
    static createContentShareMeetingSessionConfigure(configuration: MeetingSessionConfiguration): MeetingSessionConfiguration;
    private observerQueue;
    constructor(mediaStreamBroker: ContentShareMediaStreamBroker, audioVideo: AudioVideoController);
    startContentShare(stream: MediaStream): Promise<void>;
    startContentShareFromScreenCapture(sourceId?: string, frameRate?: number): Promise<void>;
    pauseContentShare(): void;
    unpauseContentShare(): void;
    stopContentShare(): void;
    addContentShareObserver(observer: ContentShareObserver): void;
    removeContentShareObserver(observer: ContentShareObserver): void;
    forEachContentShareObserver(observerFunc: (observer: ContentShareObserver) => void): void;
    audioVideoDidStart(): void;
    audioVideoDidStop(_sessionStatus: MeetingSessionStatus): void;
}
