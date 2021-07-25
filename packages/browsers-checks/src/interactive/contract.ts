import {TPoint, TWebMatrix} from '@do-while-for-each/math'
import {Observable} from '@do-while-for-each/rxjs'


//region Event

export type TManualEvent = MouseEvent | TouchEvent | KeyboardEvent | WheelEvent

export interface IUnpackedEvent {
  pagePoint: TPoint;
  extra?: {
    target: EventTarget | null;
    event: TManualEvent;
  };
}

export interface IMoveEvent {
  pagePointDiff: TPoint;
  extra?: {
    target: EventTarget | null;
    prevEvent: IUnpackedEvent;
    currEvent: IUnpackedEvent;
  };
}

//endregion


//region Interactive transformation

export enum InteractiveVariant {
  DRAG,
  SCALE,
  ROTATE,
}

export interface ITransformData {
  matrix: TWebMatrix;
  extra?: {
    variant: InteractiveVariant;
    target: EventTarget | null;
    event: IUnpackedEvent;
  };
}

export interface ITransformGenerator {
  data$: Observable<ITransformData>;
}

//endregion


export interface ISharedHotEventOptions {
  addExtraInfo: boolean;
  listener?: AddEventListenerOptions;
}
