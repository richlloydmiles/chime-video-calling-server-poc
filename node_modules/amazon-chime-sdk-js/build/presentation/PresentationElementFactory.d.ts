import ScreenViewingImageDimensions from '../screenviewing/messagehandler/ScreenViewingImageDimensions';
import PresentationContentElement from './PresentationContentElement';
import PresentationSourceElement from './PresentationSourceElement';
import PresentationViewportElement from './PresentationViewportElement';
export default class PresentationElementFactory {
    static createContent(element: HTMLElement, window: Window): PresentationContentElement;
    static createSource(imageDimensions: ScreenViewingImageDimensions): PresentationSourceElement;
    static createViewport(element: HTMLElement, window: Window): PresentationViewportElement;
}
