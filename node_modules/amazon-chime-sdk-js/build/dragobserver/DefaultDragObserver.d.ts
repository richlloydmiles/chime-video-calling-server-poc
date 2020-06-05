import DragContext from './DragContext';
import DragEvent from './DragEvent';
import DragObserver from './DragObserver';
export default class DefaultDragObserver implements DragObserver {
    private window;
    private element;
    private readonly mouseDownEventListener;
    private readonly mouseMoveEventListener;
    private readonly mouseUpEventListener;
    constructor(window: Window, element: HTMLElement, callback: (dragEvent: DragEvent) => void);
    unobserve(): void;
    static elementRelativeCoords: (event: MouseEvent, element: HTMLElement) => [number, number];
    static mouseDownEventListener: (context: DragContext, callback: (dragEvent: DragEvent) => void, element: HTMLElement) => EventListener;
    static mouseMoveEventListener: (context: DragContext, callback: (dragEvent: DragEvent) => void, element: HTMLElement) => EventListener;
    static mouseUpEventListener: (context: DragContext, callback: (dragEvent: DragEvent) => void, element: HTMLElement) => EventListener;
}
