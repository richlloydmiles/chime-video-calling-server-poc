export default interface PresentationContentElement {
    getPosition(): string;
    setPosition(position: string): void;
    getTranslations(): [number, number];
    setTranslations(translations: [number, number]): void;
    getDimensions(): [number, number];
    setDimensions(dimensions: [number, number]): void;
}
