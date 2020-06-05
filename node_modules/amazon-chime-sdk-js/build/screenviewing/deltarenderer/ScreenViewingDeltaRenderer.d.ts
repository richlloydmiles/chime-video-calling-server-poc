import PresentationPolicy from '../../presentation/policy/PresentationPolicy';
import ScreenViewingImageDimensions from '../messagehandler/ScreenViewingImageDimensions';
export default interface ScreenViewingDeltaRenderer {
    syncBuffer: Uint8Array[][];
    jpegDataArrays: Uint8Array[][];
    hasRendered: boolean[][];
    imageDimensions: ScreenViewingImageDimensions;
    lastResizeAndSyncTime: number;
    /**
     * Builds the viewer.
     * @param imageDimensions
     */
    buildViewer(imageDimensions: ScreenViewingImageDimensions): void;
    /**
     * Syncs the renderer.
     */
    resizeAndSync(): void;
    setViewport(viewport: HTMLElement): void;
    hideViewport(): void;
    revealViewport(): void;
    changePresentationPolicy(policy: PresentationPolicy): void;
    close(): void;
    zoomRelative(relativeZoomFactor: number): void;
    zoomAbsolute(absoluteZoomFactor: number): void;
    zoomReset(): void;
}
