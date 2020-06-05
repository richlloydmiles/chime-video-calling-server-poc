import { ISdkScreenSignalingMessage } from '../screensignalingprotocol/ScreenSignalingProtocol';
import ScreenMessageDetail from './ScreenMessageDetail';
export default class ProtobufScreenMessageDetail implements ScreenMessageDetail {
    private message;
    constructor(message: ISdkScreenSignalingMessage);
    get attendeeId(): string;
}
