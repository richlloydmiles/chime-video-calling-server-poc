import DefaultVideoStreamIdSet from '../videostreamidset/DefaultVideoStreamIdSet';
import DefaultVideoStreamIndex from '../videostreamindex/DefaultVideoStreamIndex';
import VideoDownlinkBandwidthPolicy from './VideoDownlinkBandwidthPolicy';
/**
 * [[AllHighestVideoBandwidthPolicy]] implements is a rudimentary policy that simply
 * always subscribes to the highest quality video stream available
 * for all non-self participants.
 */
export default class AllHighestVideoBandwidthPolicy implements VideoDownlinkBandwidthPolicy {
    private selfAttendeeId;
    private optimalReceiveSet;
    private subscribedReceiveSet;
    constructor(selfAttendeeId: string);
    updateIndex(videoIndex: DefaultVideoStreamIndex): void;
    updateAvailableBandwidth(_bandwidthKbps: number): void;
    updateCalculatedOptimalReceiveSet(): void;
    wantsResubscribe(): boolean;
    chooseSubscriptions(): DefaultVideoStreamIdSet;
    private calculateOptimalReceiveSet;
}
