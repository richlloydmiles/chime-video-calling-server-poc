import ScreenSignalingSession from './ScreenSignalingSession';
export default interface ScreenSignalingSessionFactory {
    create(url: string, sessionToken: string): ScreenSignalingSession;
}
