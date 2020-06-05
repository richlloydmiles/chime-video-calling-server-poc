import DefaultJPEGDecoderController from '../jpegdecoder/controller/DefaultJPEGDecoderController';
import Logger from '../logger/Logger';
import BaseTask from './BaseTask';
export default class InitializeDefaultJPEGDecoderControllerTask extends BaseTask {
    private defaultJPEGDecoderController;
    protected logger: Logger;
    constructor(defaultJPEGDecoderController: DefaultJPEGDecoderController, logger: Logger);
    run(): Promise<void>;
}
