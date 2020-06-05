import Logger from '../logger/Logger';
import { SdkIndexFrame, SdkSubscribeAckFrame } from '../signalingprotocol/SignalingProtocol.js';
import DefaultVideoStreamIdSet from '../videostreamidset/DefaultVideoStreamIdSet';
import VideoStreamIndex from '../videostreamindex/VideoStreamIndex';
/**
 * [[DefaultVideoStreamIndex]] implements [[VideoStreamIndex]] to facilitate video stream subscription
 * and includes query functions for stream id and attendee id.
 */
export default class DefaultVideoStreamIndex implements VideoStreamIndex {
    private logger;
    private currentIndex;
    private currentSubscribeAck;
    private trackToStreamMap;
    private streamToAttendeeMap;
    private ssrcToStreamMap;
    constructor(logger: Logger);
    integrateIndexFrame(indexFrame: SdkIndexFrame): void;
    integrateSubscribeAckFrame(subscribeAck: SdkSubscribeAckFrame): void;
    allStreams(): DefaultVideoStreamIdSet;
    allVideoSendingAttendeesExcludingSelf(selfAttendeeId: string): Set<string>;
    streamSelectionUnderBandwidthConstraint(selfAttendeeId: string, largeTileAttendeeIds: Set<string>, smallTileAttendeeIds: Set<string>, bandwidthKbps: number): DefaultVideoStreamIdSet;
    highestQualityStreamFromEachGroupExcludingSelf(selfAttendeeId: string): DefaultVideoStreamIdSet;
    numberOfVideoPublishingParticipantsExcludingSelf(selfAttendeeId: string): number;
    attendeeIdForTrack(trackId: string): string;
    attendeeIdForStreamId(streamId: number): string;
    streamIdForTrack(trackId: string): number;
    streamIdForSSRC(ssrcId: number): number;
    streamsPausedAtSource(): DefaultVideoStreamIdSet;
    private buildTrackToStreamMap;
    private buildSSRCToStreamMap;
    private buildStreamToAttendeeMap;
    private trySelectHighBitrateForAttendees;
    private buildAttendeeToSortedStreamDescriptorMapExcludingSelf;
}
