import {map, merge, Observable} from '@do-while-for-each/rxjs'
import {MouseMove} from './mouse/mouse-move.event'
import {TouchMove} from './touch/touch-move.event'
import {RectHandler} from '../rect.handler'
import {IMoveEvent} from './contract'

export class MoveEvent {

  static of$ = (rectHandler: RectHandler, element: Element, options?: AddEventListenerOptions): Observable<IMoveEvent> =>
    merge(
      MouseMove.of$(element, options).pipe(
        map(event => ({
          pagePoint: rectHandler.getPagePoint(event.pageX, event.pageY),
          target: event.target,
          event,
        })),
      ),
      TouchMove.of$(element, options).pipe(
        map(event => {
          const touch = event.touches[0]
          return {
            pagePoint: rectHandler.getPagePoint(touch.pageX, touch.pageY),
            target: event.target,
            event,
          }
        }),
      ),
    )

}
