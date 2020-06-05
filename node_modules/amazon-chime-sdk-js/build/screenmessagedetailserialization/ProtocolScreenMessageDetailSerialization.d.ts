import MaybeProvider from '../maybe/MaybeProvider';
import ScreenMessageDetail from '../screenmessagedetail/ScreenMessageDetail';
import ScreenMessageDetailSerialization from './ScreenMessageDetailSerialization';
export default class ProtocolScreenMessageDetailSerialization implements ScreenMessageDetailSerialization {
    deserialize(data: Uint8Array | null): MaybeProvider<ScreenMessageDetail>;
}
