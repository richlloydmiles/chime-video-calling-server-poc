/**
 * [[ScreenSharingMessageType]] Packet type enums
 */
export declare enum ScreenSharingMessageType {
    UnknownType = "Unknown",
    HeartbeatRequestType = "HeartbeatRequest",
    HeartbeatResponseType = "HeartbeatResponse",
    StreamStart = "StreamStart",
    StreamEnd = "StreamEnd",
    StreamStop = "StreamStop",
    StreamPause = "StreamPause",
    StreamUnpause = "StreamUnpause",
    WebM = "WebM",
    PresenterSwitch = "PresenterSwitch",
    KeyRequest = "KeyRequest"
}
export default ScreenSharingMessageType;
