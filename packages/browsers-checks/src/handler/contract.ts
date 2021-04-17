import {IPoint} from '@do-while-for-each/math'

export type TManualEvent = MouseEvent | TouchEvent

export interface IUnpackedEvent {
  pagePoint: IPoint;
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

export interface IDragEvent {
  prev: IUnpackedEvent;
  curr: IUnpackedEvent;
  diff: IPoint;
}
