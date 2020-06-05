import MeetingSessionConfiguration from '../meetingsession/MeetingSessionConfiguration';
import DefaultAudioVideoController from './DefaultAudioVideoController';
export default class NoOpAudioVideoController extends DefaultAudioVideoController {
    constructor(configuration?: MeetingSessionConfiguration);
    start(): void;
    stop(): void;
}
