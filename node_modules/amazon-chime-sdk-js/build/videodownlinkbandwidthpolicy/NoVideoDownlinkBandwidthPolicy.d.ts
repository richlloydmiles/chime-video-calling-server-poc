import DefaultVideoStreamIdSet from '../videostreamidset/DefaultVideoStreamIdSet';
import DefaultVideoStreamIndex from '../videostreamindex/DefaultVideoStreamIndex';
import VideoDownlinkBandwidthPolicy from './VideoDownlinkBandwidthPolicy';
export default class NoVideoDownlinkBandwidthPolicy implements VideoDownlinkBandwidthPolicy {
    updateIndex(_videoIndex: DefaultVideoStreamIndex): void;
    updateAvailableBandwidth(_bandwidthKbps: number): void;
    updateCalculatedOptimalReceiveSet(): void;
    wantsResubscribe(): boolean;
    chooseSubscriptions(): DefaultVideoStreamIdSet;
}
