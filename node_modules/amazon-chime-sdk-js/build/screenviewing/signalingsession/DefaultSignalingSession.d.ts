import ScreenSignalingSessionFactory from '../../screensignalingsession/ScreenSignalingSessionFactory';
import ScreenObserver from '../observer/ScreenObserver';
import ScreenViewingSessionConnectionRequest from '../session/ScreenViewingSessionConnectionRequest';
import SignalingSession from './SignalingSession';
export default class DefaultSignalingSession implements SignalingSession {
    private screenSignalingSessionFactory;
    private readonly DEFAULT_TIMEOUT_MS;
    private session;
    private observers;
    constructor(screenSignalingSessionFactory: ScreenSignalingSessionFactory);
    open(connectionRequest: ScreenViewingSessionConnectionRequest): Promise<void>;
    close(): Promise<void>;
    registerObserver(observer: ScreenObserver): void;
    unregisterObserver(observer: ScreenObserver): void;
}
