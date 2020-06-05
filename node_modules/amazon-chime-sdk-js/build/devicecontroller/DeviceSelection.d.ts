export default class DeviceSelection {
    constraints: MediaStreamConstraints;
    stream: MediaStream;
    matchesConstraints(constraints: MediaStreamConstraints): boolean;
}
