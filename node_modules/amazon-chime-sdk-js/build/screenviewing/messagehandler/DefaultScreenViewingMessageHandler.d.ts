import Logger from '../../logger/Logger';
import ScreenViewingDeltaRenderer from '../deltarenderer/ScreenViewingDeltaRenderer';
import ScreenViewingDeltaSource from '../deltasource/ScreenViewingDeltaSource';
import ScreenViewingSession from '../session/ScreenViewingSession';
import ScreenViewingViewer from '../viewer/ScreenViewingViewer';
import ScreenViewingMessageHandler from './ScreenViewingMessageHandler';
export default class DefaultScreenViewingMessageHandler implements ScreenViewingMessageHandler {
    private client;
    private deltaRenderer;
    private deltaSource;
    private viewer;
    private logger;
    constructor(client: ScreenViewingSession, deltaRenderer: ScreenViewingDeltaRenderer, deltaSource: ScreenViewingDeltaSource, viewer: ScreenViewingViewer, logger: Logger);
    handleEchoRequest(dataView: DataView): void;
    handleSetup(dataView: DataView): void;
    private static calculateImageDimensions;
    handleDelta(dataView: DataView): void;
    handleSync(_dataView: DataView): void;
    handleNoScreen(_dataView: DataView): void;
    handleEndScreen(_dataView: DataView): void;
    handleDefault(dataView: DataView): void;
    private static shouldHandle;
}
