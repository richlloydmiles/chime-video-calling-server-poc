import Logger from '../logger/Logger';
import ScreenViewingSessionConnectionRequest from '../screenviewing/session/ScreenViewingSessionConnectionRequest';
import SignalingSession from '../screenviewing/signalingsession/SignalingSession';
import BaseTask from './BaseTask';
export default class OpenScreenSignalingSessionTask extends BaseTask {
    private signalingSession;
    private connectionRequest;
    protected logger: Logger;
    protected taskName: string;
    constructor(signalingSession: SignalingSession, connectionRequest: ScreenViewingSessionConnectionRequest, logger: Logger);
    run(): Promise<void>;
}
