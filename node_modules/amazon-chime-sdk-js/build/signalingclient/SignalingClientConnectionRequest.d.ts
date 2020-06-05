export default class SignalingClientConnectionRequest {
    signalingURL: string;
    sessionToken: string;
    /** Creates a request with the given URL, conference id, and session token.
     *
     * @param {string} signalingURL The URL of the signaling proxy.
     * @param {string} sessionToken The session token that will auth the connection.
     */
    constructor(signalingURL: string, sessionToken: string);
    /** Gets the signaling URL representing this request.*/
    url(): string;
    /** Gets the protocols associated with this request.*/
    protocols(): string[];
}
