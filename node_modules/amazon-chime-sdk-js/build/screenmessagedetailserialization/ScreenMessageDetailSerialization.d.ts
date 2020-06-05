import MaybeProvider from '../maybe/MaybeProvider';
import ScreenMessageDetail from '../screenmessagedetail/ScreenMessageDetail';
export default interface ScreenMessageDetailSerialization {
    /**
     * Payload deserializer
     * @param {Uint8Array} data
     * @returns {ScreenMessageDetail}
     */
    deserialize(data: Uint8Array): MaybeProvider<ScreenMessageDetail>;
}
