export default interface ScreenViewingDeltaSource {
    notShared: boolean;
    pendingDx: number;
    pendingDy: number;
    flushSyncBuffer(): void;
}
