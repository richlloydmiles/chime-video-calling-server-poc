import ActiveSpeakerPolicy from '../activespeakerpolicy/ActiveSpeakerPolicy';
import RealtimeController from '../realtimecontroller/RealtimeController';
import ActiveSpeakerDetector from './ActiveSpeakerDetector';
/**
 * Implements the DefaultActiveSpeakerDetector with the [[ActiveSpeakerPolicy]]
 */
declare type DetectorCallback = (attendeeIds: string[]) => void;
export default class DefaultActiveSpeakerDetector implements ActiveSpeakerDetector {
    private realtimeController;
    private selfAttendeeId;
    private hasBandwidthPriorityCallback;
    private static ACTIVITY_WAIT_INTERVAL_MS;
    private static ACTIVITY_UPDATE_INTERVAL_MS;
    private speakerScores;
    private speakerMuteState;
    private activeSpeakers;
    private detectorCallbackToHandler;
    private detectorCallbackToScoresTimer;
    private detectorCallbackToActivityTimer;
    private hasBandwidthPriority;
    private mostRecentUpdateTimestamp;
    constructor(realtimeController: RealtimeController, selfAttendeeId: string, hasBandwidthPriorityCallback: (hasBandwidthPriority: boolean) => void);
    private needUpdate;
    private updateActiveSpeakers;
    private updateScore;
    subscribe(policy: ActiveSpeakerPolicy, callback: DetectorCallback, scoresCallback?: (scores: {
        [attendeeId: string]: number;
    }) => void, scoresCallbackIntervalMs?: number): void;
    unsubscribe(callback: DetectorCallback): void;
}
export {};
