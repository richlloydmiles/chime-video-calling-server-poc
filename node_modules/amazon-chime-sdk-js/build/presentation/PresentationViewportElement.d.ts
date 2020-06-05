export default interface PresentationViewportElement {
    getDimensions(): [number, number];
    setPosition(position: string): void;
    setOverflow(overflow: string): void;
}
