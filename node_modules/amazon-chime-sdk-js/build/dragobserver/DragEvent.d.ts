import DragType from './DragType';
export default interface DragEvent {
    type: DragType;
    coords: [number, number];
    last?: DragEvent;
}
