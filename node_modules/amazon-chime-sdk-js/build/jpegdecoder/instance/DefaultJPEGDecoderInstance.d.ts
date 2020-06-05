import DefaultJPEGDecoderController from '../controller/DefaultJPEGDecoderController';
import JPEGDecoderModule from '../webassembly/JPEGDecoderModule';
export default class DefaultJPEGDecoderInstance {
    private decoder;
    private controller;
    constructor(module: JPEGDecoderModule, controller: DefaultJPEGDecoderController, width: number, height: number);
    free(): void;
    decodeToImageData(inputArray: Uint8Array): ImageData;
}
