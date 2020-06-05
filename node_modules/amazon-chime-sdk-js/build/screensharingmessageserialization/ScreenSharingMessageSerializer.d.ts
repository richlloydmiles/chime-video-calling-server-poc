import ScreenMessageDetailSerialization from '../screenmessagedetailserialization/ScreenMessageDetailSerialization';
import ScreenSharingMessage from '../screensharingmessage/ScreenSharingMessage';
import ScreenSharingMessageFlagSerialization from './ScreenSharingMessageFlagSerialization';
import ScreenSharingMessageSerialization from './ScreenSharingMessageSerialization';
import ScreenSharingMessageTypeSerialization from './ScreenSharingMessageTypeSerialization';
export default class ScreenSharingMessageSerializer implements ScreenSharingMessageSerialization {
    private typeSerialization;
    private flagSerialization;
    private signalingDetailSerialization;
    private static detailedSignals;
    constructor(typeSerialization: ScreenSharingMessageTypeSerialization, flagSerialization: ScreenSharingMessageFlagSerialization, signalingDetailSerialization: ScreenMessageDetailSerialization);
    serialize(message: ScreenSharingMessage): Blob;
    deserialize(buffer: Uint8Array): ScreenSharingMessage;
}
