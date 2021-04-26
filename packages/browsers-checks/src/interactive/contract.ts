import {IDiff, IPoint, WebMatrix} from '@do-while-for-each/math'
import {IStoppable} from '@do-while-for-each/common'
import {Observable} from '@do-while-for-each/rxjs'
import {RectHandler} from './rect.handler'


//region Event

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

//endregion


//region Transform

export interface ITransformData {
  type: InteractiveVariant;
  matrix: WebMatrix;
  target: EventTarget | null;
  event: IUnpackedEvent;
}

export interface ITransformGenerator {
  data$: Observable<ITransformData>;
}

//endregion


//region Interactive

export enum InteractiveVariant {
  DRAG,
  SCALE,
  ROTATE,
}

export interface IElementHandleWrap {
  element: Element;
  rectHandler: RectHandler;
}

export type ElementHandlerType = 'hot' | 'cold'

export interface IElementHandler extends IElementHandlerData, IStoppable {
}

export interface IElementHandlerData {
  downOnWrap$: Observable<IUnpackedEvent>;
  moveOnWrap$: Observable<IUnpackedEvent>;
  upOnWrap$: Observable<IUnpackedEvent>;

  down$: Observable<IUnpackedEvent>;
  move$: Observable<IUnpackedEvent>;
  up$: Observable<IUnpackedEvent>;
  drag$: Observable<IMoveEvent>
}

//endregion
