import JPEGDecoderModule from './JPEGDecoderModule';
export default class JPEGDecoderInput {
    private pointer;
    private module;
    constructor(module: JPEGDecoderModule, maxBytes: number);
    free(): void;
    inputPointer(): number;
}
