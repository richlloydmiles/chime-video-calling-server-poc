import ScreenMessageDetail from '../../screenmessagedetail/ScreenMessageDetail';
export default interface ScreenObserver {
    streamDidStart?(screenMessageDetail: ScreenMessageDetail): void;
    streamDidStop?(screenMessageDetail: ScreenMessageDetail): void;
    streamDidSwitch?(screenMessageDetail: ScreenMessageDetail): void;
}
