import Logger from '../../logger/Logger';
import ScreenViewingDeltaRenderer from '../deltarenderer/ScreenViewingDeltaRenderer';
import ScreenViewingViewer from './ScreenViewingViewer';
export default class DefaultScreenViewingViewer implements ScreenViewingViewer {
    private deltaRenderer;
    private logger;
    constructor(deltaRenderer: ScreenViewingDeltaRenderer, logger: Logger);
    start(viewport: HTMLDivElement): void;
    stop(): void;
    resizeAndSync(): void;
}
