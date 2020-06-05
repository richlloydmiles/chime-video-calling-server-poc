import ScreenMessageDetail from '../screenmessagedetail/ScreenMessageDetail';
import ScreenSharingMessageFlag from './ScreenSharingMessageFlag';
import ScreenSharingMessageType from './ScreenSharingMessageType';
/**
 * [[ScreenSharingMessage]] Screen protocol packet entity
 */
export default interface ScreenSharingMessage {
    /**
     * Message type
     */
    type: ScreenSharingMessageType;
    /**
     * Message payload
     */
    data: Uint8Array | Blob;
    /**
     * Message flags
     */
    flags: ScreenSharingMessageFlag[];
    /**
     * Additional signaling detail associated with the message, if any
     */
    detail?: ScreenMessageDetail;
}
