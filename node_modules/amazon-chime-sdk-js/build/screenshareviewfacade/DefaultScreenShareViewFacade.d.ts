import Logger from '../logger/Logger';
import MeetingSessionConfiguration from '../meetingsession/MeetingSessionConfiguration';
import ScreenObserver from '../screenviewing/observer/ScreenObserver';
import ScreenShareViewFacade from './ScreenShareViewFacade';
export default class DefaultScreenShareViewFacade implements ScreenShareViewFacade {
    private configuration;
    private logger;
    private screenViewing;
    constructor(configuration: MeetingSessionConfiguration, logger: Logger);
    open(): Promise<void>;
    close(): Promise<void>;
    start(element: HTMLDivElement): Promise<void>;
    stop(): Promise<void>;
    presentScaleToFit(): void;
    presentDragAndZoom(): void;
    zoomIn(relativeZoomFactor?: number): void;
    zoomOut(relativeZoomFactor?: number): void;
    zoom(absoluteZoomFactor: number): void;
    zoomReset(): void;
    registerObserver(observer: ScreenObserver): void;
    unregisterObserver(observer: ScreenObserver): void;
}
