export default interface ResizeObserverAdapter {
    /**
     * Observe
     * @param target
     */
    observe(target: Element): void;
    /**
     * Unobserve
     * @param target
     */
    unobserve(target: Element): void;
}
