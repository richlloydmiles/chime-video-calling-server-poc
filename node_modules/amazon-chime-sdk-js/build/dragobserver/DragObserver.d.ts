import DragEvent from './DragEvent';
export declare type DragObserverFactory = (window: Window, callback: (dragEvent: DragEvent) => void, element: HTMLElement) => DragObserver;
export default interface DragObserver {
    /**
     * Removes any state associated with the observer
     */
    unobserve(): void;
}
