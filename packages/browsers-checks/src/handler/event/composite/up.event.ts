import {map, merge, Observable} from '@do-while-for-each/rxjs';
import {TouchCancel} from '../touch/touch-cancel.event'
import {MouseLeave} from '../mouse/mouse-leave.event'
import {TouchEnd} from '../touch/touch-end.event'
import {MouseUp} from '../mouse/mouse-up.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../contract'
import {Unpack} from '../unpack-event'

export class UpEvent {

  static of$ = (element: Element, rectHandler: RectHandler, options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseUp.of$(element, options).pipe(
        map(event => Unpack.mouseEvent(event, rectHandler)),
      ),
      MouseLeave.of$(element, options).pipe(
        map(event => Unpack.mouseEvent(event, rectHandler)),
      ),
      TouchEnd.of$(element, options).pipe(
        map(event => Unpack.touchEvent(event, rectHandler)),
      ),
      TouchCancel.of$(element, options).pipe(
        map(event => Unpack.touchEvent(event, rectHandler)),
      ),
    )

}
