import Logger from '../logger/Logger';
import JPEGDecoderController from './controller/JPEGDecoderController';
import JPEGDecoderComponentFactory from './JPEGDecoderComponentFactory';
export default class DefaultJPEGDecoderComponentFactory implements JPEGDecoderComponentFactory {
    private logger;
    private maxInputBytes;
    constructor(logger: Logger, maxInputBytes: number);
    newController(): Promise<JPEGDecoderController>;
}
