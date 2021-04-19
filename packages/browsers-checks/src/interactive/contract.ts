import {IDiff, IPoint, WebMatrix} from '@do-while-for-each/math'
import {Observable} from '@do-while-for-each/rxjs'
import {RectHandler} from './rect.handler'

export type TManualEvent = MouseEvent | TouchEvent | KeyboardEvent | WheelEvent

export interface IUnpackedEvent {
  pagePoint: IPoint;
  target: EventTarget | null;
  event: TManualEvent;
}

export interface IMoveEvent {
  pagePointDiff: IDiff;
  target: EventTarget | null;
  prevEvent: IUnpackedEvent;
  currEvent: IUnpackedEvent;
}

export interface ITransformData {
  matrix: WebMatrix;
  target: EventTarget | null;
  event: IUnpackedEvent;
}

export interface ITransformGenerator {
  data$: Observable<ITransformData>;
}

export interface IElementHandleWrap {
  element: Element;
  rectHandler: RectHandler;
}
