import VideoCaptureAndEncodeParameter from '../videocaptureandencodeparameter/VideoCaptureAndEncodeParameter';
import VideoStreamIndex from '../videostreamindex/VideoStreamIndex';
import VideoUplinkBandwidthPolicy from '../videouplinkbandwidthpolicy/VideoUplinkBandwidthPolicy';
export default class NoVideoUplinkBandwidthPolicy implements VideoUplinkBandwidthPolicy {
    constructor();
    updateIndex(_videoIndex: VideoStreamIndex): void;
    wantsResubscribe(): boolean;
    chooseCaptureAndEncodeParameters(): VideoCaptureAndEncodeParameter;
    maxBandwidthKbps(): number;
    setIdealMaxBandwidthKbps(_idealMaxBandwidthKbps: number): void;
    setHasBandwidthPriority(_hasBandwidthPriority: boolean): void;
}
