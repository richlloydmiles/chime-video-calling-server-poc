export declare enum ScreenViewingPacketType {
    SETUP = 1,
    DELTA = 2,
    SYNC = 3,
    ECHO_REQUEST = 4,
    ECHO_RESPONSE = 5,
    NOSCREEN = 7,
    ENDSCREEN = 8,
    JPEG_HEADER_BYTE_0 = 255,
    JPEG_HEADER_BYTE_1 = 216
}
export default ScreenViewingPacketType;
