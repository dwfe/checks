import {TPoint, TWebMatrix} from '@do-while-for-each/math'
import {Observable} from '@do-while-for-each/rxjs'


//region Event

export type TManualEvent = MouseEvent | TouchEvent | KeyboardEvent | WheelEvent

export interface IUnpackedEvent {
  pagePoint: TPoint;
  target: EventTarget | null;
  event: TManualEvent;
}

export interface IMoveEvent {
  pagePointDiff: TPoint;
  target: EventTarget | null;
  prevEvent: IUnpackedEvent;
  currEvent: IUnpackedEvent;
}

//endregion


//region Interactive transformation

export enum InteractiveVariant {
  DRAG,
  SCALE,
  ROTATE,
}

export interface ITransformData {
  variant: InteractiveVariant;
  matrix: TWebMatrix;
  target: EventTarget | null;
  event: IUnpackedEvent;
}

export interface ITransformGenerator {
  data$: Observable<ITransformData>;
}

//endregion
