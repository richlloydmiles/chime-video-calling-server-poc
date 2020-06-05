import BackoffFactory from '../backoff/BackoffFactory';
import PromisedWebSocket from './PromisedWebSocket';
import PromisedWebSocketFactory from './PromisedWebSocketFactory';
export default class ReconnectingPromisedWebSocketFactory implements PromisedWebSocketFactory {
    private promisedWebSocketFactory;
    private backoffFactory;
    private reconnectRetryLimit;
    constructor(promisedWebSocketFactory: PromisedWebSocketFactory, backoffFactory: BackoffFactory, reconnectRetryLimit: number);
    create(url: string, protocols?: string | string[] | null, binaryType?: BinaryType): PromisedWebSocket;
}
