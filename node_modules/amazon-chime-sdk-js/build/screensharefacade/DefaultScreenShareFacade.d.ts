import Logger from '../logger/Logger';
import MediaStreamBroker from '../mediastreambroker/MediaStreamBroker';
import MeetingSessionConfiguration from '../meetingsession/MeetingSessionConfiguration';
import ScreenShareFacade from './ScreenShareFacade';
import ScreenShareFacadeObserver from './ScreenShareFacadeObserver';
export default class DefaultScreenShareFacade implements ScreenShareFacade {
    private configuration;
    private logger;
    private mediaStreamBroker;
    private screenSharingSession;
    constructor(configuration: MeetingSessionConfiguration, logger: Logger, mediaStreamBroker: MediaStreamBroker);
    open(): Promise<void>;
    close(): Promise<void>;
    start(sourceId?: string): Promise<void>;
    stop(): Promise<void>;
    pause(): Promise<void>;
    unpause(): Promise<void>;
    registerObserver(observer: ScreenShareFacadeObserver): void;
    unregisterObserver(observer: ScreenShareFacadeObserver): void;
}
