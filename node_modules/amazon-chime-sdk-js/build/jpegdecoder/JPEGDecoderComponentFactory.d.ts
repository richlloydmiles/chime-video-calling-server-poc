import JPEGDecoderController from './controller/JPEGDecoderController';
/**
 * Creates JPEGDecoder controllers.
 */
export default interface JPEGDecoderComponentFactory {
    /**
     * Initializes a new controller for the JPEGDecoder module and returns a
     * promise that resolves when the WebAssembly has loaded.
     */
    newController(): Promise<JPEGDecoderController>;
}
