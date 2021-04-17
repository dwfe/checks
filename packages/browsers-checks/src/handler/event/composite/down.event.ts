import {map, merge, Observable} from '@do-while-for-each/rxjs';
import {TouchStart} from '../touch/touch-start.event'
import {MouseDown} from '../mouse/mouse-down.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../contract'
import {Unpack} from '../unpack-event'

export class DownEvent {

  static of$ = (element: Element, rectHandler: RectHandler, options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseDown.of$(element, options).pipe(
        map(event => Unpack.mouseEvent(event, rectHandler)),
      ),
      TouchStart.of$(element, options).pipe(
        map(event => Unpack.touchEvent(event, rectHandler)),
      ),
    )

}
