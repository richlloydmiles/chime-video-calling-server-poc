import ScreenSharingMessageType from '../screensharingmessage/ScreenSharingMessageType';
import ScreenSharingMessageTypeSerialization from './ScreenSharingMessageTypeSerialization';
/**
 * [[ScreenSharingMessageTypeSerializer]] Default ScreenSharingMessageTypeSerialization implementation
 */
export default class ScreenSharingMessageTypeSerializer implements ScreenSharingMessageTypeSerialization {
    private static readonly fromNumberMap;
    private static readonly fromTypeMap;
    serialize(type: ScreenSharingMessageType): number;
    deserialize(byte: number): ScreenSharingMessageType;
}
