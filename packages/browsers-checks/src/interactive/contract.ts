import {IDiff, IPoint, WebMatrix} from '@do-while-for-each/math'
import {Observable} from '@do-while-for-each/rxjs'


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

//endregion
