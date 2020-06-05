import DOMWebSocket from './DOMWebSocket';
export default class DefaultDOMWebSocket implements DOMWebSocket {
    private webSocket;
    constructor(webSocket: WebSocket);
    get url(): string;
    get onopen(): EventListener;
    set onopen(listener: EventListener);
    get onerror(): EventListener;
    set onerror(listener: EventListener);
    get onclose(): EventListener;
    set onclose(listener: EventListener);
    get onmessage(): EventListener;
    set onmessage(listener: EventListener);
    addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListener, options?: EventListenerOptions | boolean): void;
    dispatchEvent(event: Event): boolean;
    send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
}
