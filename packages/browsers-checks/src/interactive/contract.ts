import {TPoint, TWebMatrix} from '@do-while-for-each/math'
import {Observable} from '@do-while-for-each/rxjs'


//region Event

export type TManualEvent = MouseEvent | TouchEvent | KeyboardEvent | WheelEvent

export interface IDragEvent {
  pagePointDiff: TPoint;
  target: EventTarget | null;
  event: TManualEvent;
}

//endregion


//region Interactive transformation

export enum InteractiveVariant {
  DRAG,
  SCALE,
  ROTATE,
}

export interface ITransformGenerator {
  data$: Observable<TWebMatrix>;
}

//endregion
