import {IDiff, IPoint} from '@do-while-for-each/math'
import {RectHandler} from './rect.handler'

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

export interface IMoveEvent {
  pagePointDiff: IDiff;
  prevEvent: IUnpackedEvent;
  currEvent: IUnpackedEvent;
}

export interface IElementHandleWrap {
  element: Element;
  rectHandler: RectHandler;
}
