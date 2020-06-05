import AudioVideoObserver from '../audiovideoobserver/AudioVideoObserver';
export default interface AudioVideoControllerFacade {
    addObserver(observer: AudioVideoObserver): void;
    removeObserver(observer: AudioVideoObserver): void;
    start(): void;
    stop(): void;
    getRTCPeerConnectionStats(selector?: MediaStreamTrack): Promise<RTCStatsReport>;
}
