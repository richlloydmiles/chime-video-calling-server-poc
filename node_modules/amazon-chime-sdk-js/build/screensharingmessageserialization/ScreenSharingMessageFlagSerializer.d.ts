import ScreenSharingMessageFlag from '../screensharingmessage/ScreenSharingMessageFlag';
import ScreenSharingMessageFlagSerialization from './ScreenSharingMessageFlagSerialization';
export default class ScreenSharingMessageFlagSerializer implements ScreenSharingMessageFlagSerialization {
    private static readonly Broadcast;
    private static readonly Local;
    private static readonly Synthesized;
    private static readonly Unicast;
    serialize(flags: ScreenSharingMessageFlag[]): number;
    deserialize(byte: number): ScreenSharingMessageFlag[];
    private isBitSet;
}
