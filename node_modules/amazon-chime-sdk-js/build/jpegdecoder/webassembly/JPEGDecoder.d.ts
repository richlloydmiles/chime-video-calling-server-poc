import JPEGDecoderModule from './JPEGDecoderModule';
export default class JPEGDecoder {
    private pointer;
    private module;
    constructor(module: JPEGDecoderModule, width: number, height: number);
    free(): void;
    outputPointer(): number;
    decode(inputPointer: number, inputLength: number): boolean;
    width(): number;
    height(): number;
}
