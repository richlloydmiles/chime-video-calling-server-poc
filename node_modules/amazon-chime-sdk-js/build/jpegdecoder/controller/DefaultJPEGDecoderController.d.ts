import Logger from '../../logger/Logger';
import JPEGDecoderInstance from '../instance/JPEGDecoderInstance';
import JPEGDecoderController from './JPEGDecoderController';
export default class DefaultJPEGDecoderController implements JPEGDecoderController {
    private logger;
    private maxInputSize;
    private decoderInput;
    private jpegDecoderModule;
    constructor(logger: Logger, maxInputSize: number);
    init(): Promise<void>;
    free(): void;
    createInstance(width: number, height: number): JPEGDecoderInstance;
    newInternalInputView(): Uint8Array;
    newInternalOutputView(pointer: number, length: number): Uint8ClampedArray;
    inputPointer(): number;
    isInputTooLarge(inputLength: number): boolean;
}
