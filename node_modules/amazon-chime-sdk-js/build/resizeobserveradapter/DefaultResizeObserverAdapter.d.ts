import { ResizeObserver } from 'resize-observer';
import ResizeObserverAdapter from './ResizeObserverAdapter';
export default class DefaultResizeObserverAdapter implements ResizeObserverAdapter {
    private resizeObserver;
    constructor(resizeObserver: ResizeObserver);
    observe(target: Element): void;
    unobserve(target: Element): void;
}
