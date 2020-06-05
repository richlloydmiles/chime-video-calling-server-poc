import Logger from '../../logger/Logger';
import ScreenViewingDeltaRenderer from '../deltarenderer/ScreenViewingDeltaRenderer';
import ScreenViewingDeltaSource from './ScreenViewingDeltaSource';
export default class DefaultScreenViewingDeltaSource implements ScreenViewingDeltaSource {
    private deltaRenderer;
    private logger;
    notShared: boolean;
    pendingDx: number;
    pendingDy: number;
    constructor(deltaRenderer: ScreenViewingDeltaRenderer, logger: Logger);
    flushSyncBuffer(): void;
}
