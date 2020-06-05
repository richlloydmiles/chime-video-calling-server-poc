import DragEvent from '../dragobserver/DragEvent';
import PresentationPolicy, { PresentationContentPlacement, ZoomEvent } from './policy/PresentationPolicy';
import Presentation from './Presentation';
import PresentationBoxType from './PresentationBoxType';
import PresentationContentElement from './PresentationContentElement';
import PresentationSourceElement from './PresentationSourceElement';
import PresentationViewportElement from './PresentationViewportElement';
export default class DefaultPresentation implements Presentation {
    present(source: PresentationSourceElement, viewport: PresentationViewportElement, content: PresentationContentElement, policy: PresentationPolicy, zoomEvent?: ZoomEvent, dragEvent?: DragEvent): void;
    static cssPixels: (value: number) => string;
    static boxType: (sourceAspectRatio: number, viewportAspectRatio: number) => PresentationBoxType;
    static contentFocus: (contentPlacement: PresentationContentPlacement, dragEvent?: DragEvent) => [number, number];
    static viewportFocus: (viewportDims: [number, number], dragEvent?: DragEvent) => [number, number];
}
