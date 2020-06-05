import { ResizeObserverCallback } from 'resize-observer/lib/ResizeObserverCallback';
import ResizeObserverAdapter from './ResizeObserverAdapter';
export default class ResizeObserverAdapterFactory {
    private provider?;
    constructor(provider?: () => ResizeObserverAdapter);
    create(callback: ResizeObserverCallback): ResizeObserverAdapter;
}
