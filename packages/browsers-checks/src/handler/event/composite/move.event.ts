import {map, merge, Observable} from '@do-while-for-each/rxjs'
import {MouseMove} from '../mouse/mouse-move.event'
import {TouchMove} from '../touch/touch-move.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../contract'
import {Unpack} from '../unpack-event'

export class MoveEvent {

  static of$ = (element: Element, rectHandler: RectHandler, options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseMove.of$(element, options).pipe(
        map(event => Unpack.mouseEvent(event, rectHandler)),
      ),
      TouchMove.of$(element, options).pipe(
        map(event => Unpack.touchEvent(event, rectHandler)),
      ),
    )

}
