/**
 * [[ScreenViewingSessionConnectionRequest]] represents an connection request.
 */
export default class ScreenViewingSessionConnectionRequest {
    private screenViewingURLWithOptionalSessionToken;
    readonly screenDataURL: string;
    readonly sessionToken: string;
    readonly timeoutMs: number;
    constructor(screenViewingURLWithOptionalSessionToken: string, screenDataURL: string, sessionToken: string, timeoutMs: number);
    get screenViewingURL(): string;
    protocols(): string[];
}
