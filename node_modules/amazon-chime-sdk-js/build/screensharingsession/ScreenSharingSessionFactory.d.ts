import ScreenSharingSession from './ScreenSharingSession';
export default interface ScreenSharingSessionFactory {
    create(url: string, sessionToken: string): ScreenSharingSession;
}
