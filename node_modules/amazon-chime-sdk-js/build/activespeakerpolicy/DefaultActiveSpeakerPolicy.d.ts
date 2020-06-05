import ActiveSpeakerPolicy from './ActiveSpeakerPolicy';
export default class DefaultActiveSpeakerPolicy implements ActiveSpeakerPolicy {
    private speakerWeight;
    private cutoffThreshold;
    private silenceThreshold;
    private takeoverRate;
    private volumes;
    constructor(speakerWeight?: number, cutoffThreshold?: number, silenceThreshold?: number, takeoverRate?: number);
    calculateScore(attendeeId: string, volume: number | null, muted: boolean | null): number;
    prioritizeVideoSendBandwidthForActiveSpeaker(): boolean;
}
