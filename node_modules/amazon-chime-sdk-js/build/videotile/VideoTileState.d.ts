/**
 * [[VideoTileState]] encapsulates the state of a [[VideoTile]]
 */
export default class VideoTileState {
    tileId: number | null;
    localTile: boolean;
    localTileStarted: boolean;
    isContent: boolean;
    active: boolean;
    paused: boolean;
    poorConnection: boolean;
    boundAttendeeId: string | null;
    boundExternalUserId: string | null;
    boundVideoStream: MediaStream | null;
    boundVideoElement: HTMLVideoElement | null;
    nameplate: string | null;
    videoStreamContentWidth: number | null;
    videoStreamContentHeight: number | null;
    videoElementCSSWidthPixels: number | null;
    videoElementCSSHeightPixels: number | null;
    devicePixelRatio: number;
    videoElementPhysicalWidthPixels: number | null;
    videoElementPhysicalHeightPixels: number | null;
    streamId: number | null;
    clone(): VideoTileState;
}
