import AudioMixController from './AudioMixController';
export default class DefaultAudioMixController implements AudioMixController {
    private audioDevice;
    private audioElement;
    private audioStream;
    bindAudioElement(element: HTMLAudioElement): boolean;
    unbindAudioElement(): void;
    bindAudioStream(stream: MediaStream): boolean;
    bindAudioDevice(device: MediaDeviceInfo | null): boolean;
    private bindAudioMix;
}
