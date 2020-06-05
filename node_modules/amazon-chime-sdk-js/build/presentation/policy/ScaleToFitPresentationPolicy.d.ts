import PresentationPolicy, { PresentationContentPlacement, PresentationState } from './PresentationPolicy';
export default class ScaleToFitPresentationPolicy implements PresentationPolicy {
    calculate: (state: PresentationState) => PresentationContentPlacement;
}
