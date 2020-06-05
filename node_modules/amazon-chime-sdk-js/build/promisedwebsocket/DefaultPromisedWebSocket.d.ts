import DOMWebSocket from '../domwebsocket/DOMWebSocket';
import PromisedWebSocket from './PromisedWebSocket';
export default class DefaultPromisedWebSocket implements PromisedWebSocket {
    private webSocket;
    private callbacks;
    constructor(webSocket: DOMWebSocket);
    get url(): string;
    open(timeoutMs: number): Promise<Event>;
    close(timeoutMs: number, code?: number, reason?: string): Promise<Event>;
    send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;
    onMessage(fn: (event: MessageEvent) => void): PromisedWebSocket;
    onClose(fn: (event: CloseEvent) => void): PromisedWebSocket;
    dispatchEvent(event: Event): boolean;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    private withTimeout;
}
