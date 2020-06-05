import Logger from '../logger/Logger';
import PromisedWebSocketFactory from '../promisedwebsocket/PromisedWebSocketFactory';
import ScreenSharingMessageSerialization from '../screensharingmessageserialization/ScreenSharingMessageSerialization';
import ScreenSignalingSession from './ScreenSignalingSession';
import ScreenSignalingSessionFactory from './ScreenSignalingSessionFactory';
export default class DefaultScreenSignalingSessionFactory implements ScreenSignalingSessionFactory {
    private webSocketFactory;
    private messageSerialization;
    private logger;
    constructor(webSocketFactory: PromisedWebSocketFactory, messageSerialization: ScreenSharingMessageSerialization, logger: Logger);
    create(url: string, sessionToken: string): ScreenSignalingSession;
}
