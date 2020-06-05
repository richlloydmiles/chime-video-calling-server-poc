export default class Versioning {
    static X_AMZN_VERSION: string;
    static X_AMZN_USER_AGENT: string;
    /**
     * Return string representation of SDK version
     */
    static get sdkVersion(): string;
    /**
     * Return low-resolution string representation of SDK user agent (e.g. `chrome-78`)
     */
    static get sdkUserAgentLowResolution(): string;
    /**
     * Return URL with versioning information appended
     */
    static urlWithVersion(url: string): string;
}
