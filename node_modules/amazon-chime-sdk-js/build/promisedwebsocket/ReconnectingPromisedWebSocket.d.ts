import Backoff from '../backoff/Backoff';
import PromisedWebSocket from './PromisedWebSocket';
import PromisedWebSocketFactory from './PromisedWebSocketFactory';
export default class ReconnectingPromisedWebSocket implements PromisedWebSocket {
    readonly url: string;
    private protocols;
    private binaryType;
    private webSocketFactory;
    private backoff;
    private static normalClosureCodes;
    private callbacks;
    private timeoutScheduler;
    private webSocket;
    constructor(url: string, protocols: string | string[], binaryType: BinaryType, webSocketFactory: PromisedWebSocketFactory, backoff: Backoff);
    close(timeoutMs: number, code?: number, reason?: string): Promise<Event>;
    open(timeoutMs: number): Promise<Event>;
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    dispatchEvent(event: Event): boolean;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    private didOpenWebSocket;
    private willCloseWebSocket;
}
