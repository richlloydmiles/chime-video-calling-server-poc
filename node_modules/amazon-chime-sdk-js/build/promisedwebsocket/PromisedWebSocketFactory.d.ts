import PromisedWebSocket from './PromisedWebSocket';
export default interface PromisedWebSocketFactory {
    create(url: string, protocols?: string | string[] | null, binaryType?: BinaryType): PromisedWebSocket;
}
