import DOMWebSocket from './DOMWebSocket';
export default interface DOMWebSocketFactory {
    /**
     * Factory method that creates DOMWebSocket instance
     * @param {string} url
     * @param {string | string[] | null} protocols
     * @param {BinaryType} binaryType
     * @returns {DOMWebSocket}
     */
    create(url: string, protocols?: string | string[] | null, binaryType?: BinaryType): DOMWebSocket;
}
