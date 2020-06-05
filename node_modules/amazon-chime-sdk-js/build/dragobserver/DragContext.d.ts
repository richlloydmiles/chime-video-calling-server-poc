import DragEvent from '../dragobserver/DragEvent';
export default interface DragContext {
    isMouseDown: boolean;
    last?: DragEvent;
}
