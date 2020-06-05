import Logger from '../logger/Logger';
import MediaStreamBroker from '../mediastreambroker/MediaStreamBroker';
import ScreenSharingSessionFactory from './ScreenSharingSessionFactory';
import ScreenSharingSessionOptions from './ScreenSharingSessionOptions';
export default class ScreenSharingSessionContainer {
    private mediaStreamBroker;
    private logger;
    private options;
    private screenSharingSessionFactoryMemo;
    private backoffFactoryMemo;
    constructor(mediaStreamBroker: MediaStreamBroker, logger: Logger, options?: ScreenSharingSessionOptions);
    screenSharingSessionFactory(): ScreenSharingSessionFactory;
    displayMediaConstraints(sourceId?: string): MediaStreamConstraints;
    private screenSharingStreamFactory;
    private mediaRecordingFactory;
    private reconnectingPromisedWebSocketFactory;
    private backOffFactory;
    private promisedWebSocketFactory;
    private domWebSocketFactory;
    private messageSerialization;
    private typeSerialization;
    private flagSerialization;
    private screenSignalingSerialization;
}
