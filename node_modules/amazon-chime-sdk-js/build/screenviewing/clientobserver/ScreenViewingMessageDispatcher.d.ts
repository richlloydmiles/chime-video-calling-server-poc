import ScreenViewingMessageHandler from '../messagehandler/ScreenViewingMessageHandler';
import ScreenViewingSessionObserver from './ScreenViewingSessionObserver';
export default class ScreenViewingMessageDispatcher implements ScreenViewingSessionObserver {
    private messageHandler;
    constructor(messageHandler: ScreenViewingMessageHandler);
    didCloseWebSocket(_event: CloseEvent): void;
    didReceiveWebSocketMessage(event: MessageEvent): void;
}
