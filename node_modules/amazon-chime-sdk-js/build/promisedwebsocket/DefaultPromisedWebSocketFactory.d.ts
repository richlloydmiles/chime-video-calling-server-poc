import DOMWebSocketFactory from '../domwebsocket/DOMWebSocketFactory';
import PromisedWebSocket from './PromisedWebSocket';
import PromisedWebSocketFactory from './PromisedWebSocketFactory';
export default class DefaultPromisedWebSocketFactory implements PromisedWebSocketFactory {
    private webSocketFactory;
    constructor(webSocketFactory: DOMWebSocketFactory);
    create(url: string, protocols?: string | string[] | null, binaryType?: BinaryType): PromisedWebSocket;
}
