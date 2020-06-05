export default interface ScreenViewingViewer {
    start(viewport: HTMLDivElement): void;
    stop(): void;
    resizeAndSync(): void;
}
