export default interface AudioMixControllerFacade {
    bindAudioElement(element: HTMLAudioElement): boolean;
    unbindAudioElement(): void;
}
