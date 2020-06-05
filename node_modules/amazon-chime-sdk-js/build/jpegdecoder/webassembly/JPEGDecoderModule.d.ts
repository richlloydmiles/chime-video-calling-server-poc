import Logger from '../../logger/Logger';
export default class JPEGDecoderModule {
    private logger;
    constructor(logger: Logger);
    module(): Uint8Array;
    init(): Promise<void>;
    wasm(): any;
    free(): void;
    private wasmInternal;
}
