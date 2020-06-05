import Logger from '../logger/Logger';
import ReconnectingPromisedWebSocketFactory from '../promisedwebsocket/ReconnectingPromisedWebSocketFactory';
import ScreenSignalingSessionFactory from './ScreenSignalingSessionFactory';
export default class ScreenSignalingSessionContainer {
    private webSocketFactory;
    private logger;
    private memo;
    constructor(webSocketFactory: ReconnectingPromisedWebSocketFactory, logger: Logger);
    screenSignalingSessionFactory(): ScreenSignalingSessionFactory;
    private screenSharingMessageSerialization;
}
