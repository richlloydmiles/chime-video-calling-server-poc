import Logger from '../logger/Logger';
import MediaRecordingFactory from '../mediarecording/MediaRecordingFactory';
import MediaStreamBroker from '../mediastreambroker/MediaStreamBroker';
import PromisedWebSocketFactory from '../promisedwebsocket/PromisedWebSocketFactory';
import ScreenShareStreamingFactory from '../screensharestreaming/ScreenShareStreamingFactory';
import ScreenSharingMessageSerialization from '../screensharingmessageserialization/ScreenSharingMessageSerialization';
import ScreenSharingSession from './ScreenSharingSession';
import ScreenSharingSessionFactory from './ScreenSharingSessionFactory';
export default class DefaultScreenSharingSessionFactory implements ScreenSharingSessionFactory {
    private mediaConstraintsProvider;
    private webSocketFactory;
    private messageSerialization;
    private mediaStreamBroker;
    private screenShareStreamFactory;
    private mediaRecordingFactory;
    private logger;
    private timeSliceMs;
    private static SessionKey;
    private static BinaryType;
    constructor(mediaConstraintsProvider: () => MediaStreamConstraints, webSocketFactory: PromisedWebSocketFactory, messageSerialization: ScreenSharingMessageSerialization, mediaStreamBroker: MediaStreamBroker, screenShareStreamFactory: ScreenShareStreamingFactory, mediaRecordingFactory: MediaRecordingFactory, logger: Logger, timeSliceMs?: number);
    create(url: string, sessionToken: string): ScreenSharingSession;
}
