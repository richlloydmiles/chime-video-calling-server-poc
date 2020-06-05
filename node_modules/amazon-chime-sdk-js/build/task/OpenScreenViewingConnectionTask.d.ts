import Logger from '../logger/Logger';
import ScreenViewingSession from '../screenviewing/session/ScreenViewingSession';
import ScreenViewingSessionConnectionRequest from '../screenviewing/session/ScreenViewingSessionConnectionRequest';
import BaseTask from './BaseTask';
export default class OpenScreenViewingConnectionTask extends BaseTask {
    private client;
    private connectionRequest;
    protected logger: Logger;
    protected taskName: string;
    constructor(client: ScreenViewingSession, connectionRequest: ScreenViewingSessionConnectionRequest, logger: Logger);
    run(): Promise<void>;
}
