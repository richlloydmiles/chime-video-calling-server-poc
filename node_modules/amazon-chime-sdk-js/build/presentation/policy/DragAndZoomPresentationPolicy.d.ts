import PresentationPolicy, { PresentationContentPlacement, PresentationState, PresentationUpdateEvent } from './PresentationPolicy';
export default class DragAndZoomPresentationPolicy implements PresentationPolicy {
    calculate: (state: PresentationState, updateEvent?: PresentationUpdateEvent) => PresentationContentPlacement;
    static centerOrRemoveWhitespaceDim: (contentDim: number, translation: number, viewportDim: number) => number;
    static shouldScaleToFit: ([newContentWidth, newContentHeight]: [number, number], [viewportWidth, viewportHeight]: [number, number], updateEvent?: PresentationUpdateEvent) => boolean;
    static getNewContentDimensions(currentContentDims: [number, number], sourceDims: [number, number], updateEvent: PresentationUpdateEvent): [number, number];
}
