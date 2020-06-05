import Logger from '../logger/Logger';
import PromisedWebSocket from '../promisedwebsocket/PromisedWebSocket';
import ScreenSharingMessageSerialization from '../screensharingmessageserialization/ScreenSharingMessageSerialization';
import ScreenSignalingSession from './ScreenSignalingSession';
import ScreenSignalingSessionEventType from './ScreenSignalingSessionEventType';
export default class DefaultScreenSignalingSession implements ScreenSignalingSession {
    private webSocket;
    private messageSerialization;
    private logger;
    static SessionKey: string;
    private listeners;
    constructor(webSocket: PromisedWebSocket, messageSerialization: ScreenSharingMessageSerialization, logger: Logger);
    open(timeoutMs: number): Promise<Event>;
    close(timeoutMs: number): Promise<Event>;
    addEventListener(type: ScreenSignalingSessionEventType, listener: EventListener): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(type: ScreenSignalingSessionEventType, listener: EventListener): void;
    private onMessageHandler;
}
