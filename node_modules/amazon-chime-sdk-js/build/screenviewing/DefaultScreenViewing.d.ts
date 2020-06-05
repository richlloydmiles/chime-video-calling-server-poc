import ScreenViewingComponentContext from './context/ScreenViewingComponentContext';
import ScreenObserver from './observer/ScreenObserver';
import ScreenViewing from './ScreenViewing';
import ScreenViewingSessionConnectionRequest from './session/ScreenViewingSessionConnectionRequest';
export default class DefaultScreenViewing implements ScreenViewing {
    private componentContext;
    private request?;
    constructor(componentContext: ScreenViewingComponentContext);
    /**
     * Opens the screen signaling connection
     * @param request
     */
    open(request: ScreenViewingSessionConnectionRequest): Promise<void>;
    /**
     * Stops screen viewing and closes the screen signaling connection
     */
    close(): Promise<void>;
    /**
     * Initializes the viewport and opens the screen viewing data connection
     * @param canvasContainer
     */
    start(canvasContainer: HTMLDivElement): Promise<void>;
    /**
     * Tears down the viewport and closes the screen viewing data connection
     */
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
