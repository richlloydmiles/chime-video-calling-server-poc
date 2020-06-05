import DOMWebSocket from './DOMWebSocket';
import DOMWebSocketFactory from './DOMWebSocketFactory';
export default class DefaultDOMWebSocketFactory implements DOMWebSocketFactory {
    create(url: string, protocols?: string | string[] | null, binaryType?: BinaryType): DOMWebSocket;
}
