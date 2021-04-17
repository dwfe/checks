import {IPoint} from '@do-while-for-each/math';

export type TManualEvent = MouseEvent | TouchEvent

export interface IMoveEvent {
  pagePoint: IPoint;
  target: EventTarget | null;
  event: TManualEvent;
  // clientX: number;
  // clientY: number;
  // pageX: number;
  // pageY: number;
  // altKey: boolean;
  // ctrlKey: boolean;
  // metaKey: boolean;
  // shiftKey: boolean;
}
