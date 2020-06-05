export default interface DOMWebSocket extends EventTarget {
    readonly url: string;
    onopen: EventListener | null;
    onerror: EventListener | null;
    onclose: EventListener | null;
    onmessage: EventListener | null;
    /**
     * Send (enqueue) data
     * @param {string | ArrayBuffer | Blob | ArrayBufferView} data
     */
    send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;
    /**
     * Closes the connection
     * @param {number} code
     * @param {string} reason
     */
    close(code?: number, reason?: string): void;
}
