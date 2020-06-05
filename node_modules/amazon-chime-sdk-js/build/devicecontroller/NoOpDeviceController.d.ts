import DeviceChangeObserver from '../devicechangeobserver/DeviceChangeObserver';
import DeviceControllerBasedMediaStreamBroker from '../mediastreambroker/DeviceControllerBasedMediaStreamBroker';
import NoOpMediaStreamBroker from '../mediastreambroker/NoOpMediaStreamBroker';
import Device from './Device';
import DevicePermission from './DevicePermission';
export default class NoOpDeviceController extends NoOpMediaStreamBroker implements DeviceControllerBasedMediaStreamBroker {
    listAudioInputDevices(): Promise<MediaDeviceInfo[]>;
    listVideoInputDevices(): Promise<MediaDeviceInfo[]>;
    listAudioOutputDevices(): Promise<MediaDeviceInfo[]>;
    chooseAudioInputDevice(_device: Device): Promise<DevicePermission>;
    chooseVideoInputDevice(_device: Device): Promise<DevicePermission>;
    chooseAudioOutputDevice(_deviceId: string | null): Promise<void>;
    addDeviceChangeObserver(_observer: DeviceChangeObserver): void;
    removeDeviceChangeObserver(_observer: DeviceChangeObserver): void;
    createAnalyserNodeForAudioInput(): AnalyserNode | null;
    startVideoPreviewForVideoInput(_element: HTMLVideoElement): void;
    stopVideoPreviewForVideoInput(_element: HTMLVideoElement): void;
    setDeviceLabelTrigger(_trigger: () => Promise<MediaStream>): void;
    mixIntoAudioInput(_stream: MediaStream): MediaStreamAudioSourceNode;
    chooseVideoInputQuality(_width: number, _height: number, _frameRate: number, _maxBandwidthKbps: number): void;
    enableWebAudio(_flag: boolean): void;
}
