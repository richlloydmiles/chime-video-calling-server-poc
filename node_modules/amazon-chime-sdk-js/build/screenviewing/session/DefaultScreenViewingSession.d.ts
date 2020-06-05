import Logger from '../../logger/Logger';
import ReconnectingPromisedWebSocketFactory from '../../promisedwebsocket/ReconnectingPromisedWebSocketFactory';
import ScreenViewingSessionObserver from '../clientobserver/ScreenViewingSessionObserver';
import ScreenViewingSession from './ScreenViewingSession';
import ScreenViewingSessionConnectionRequest from './ScreenViewingSessionConnectionRequest';
/**
 * [[DefaultScreenViewingSession]] is a default impl of the interface.
 */
export default class DefaultScreenViewingSession implements ScreenViewingSession {
    private webSocketFactory;
    private logger;
    private static readonly DEFAULT_TIMEOUT;
    private webSocket;
    private observer?;
    constructor(webSocketFactory: ReconnectingPromisedWebSocketFactory, logger: Logger);
    withObserver(observer: ScreenViewingSessionObserver): ScreenViewingSession;
    openConnection(request: ScreenViewingSessionConnectionRequest): Promise<Event>;
    closeConnection(): Promise<void>;
    send(data: Uint8Array): void;
}
