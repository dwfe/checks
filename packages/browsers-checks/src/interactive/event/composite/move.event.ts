import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {MouseMove} from '../mouse/mouse-move.event'
import {TouchMove} from '../touch/touch-move.event'
import {CompositeEvent} from './composite.event'
import {IUnpackedEvent} from '../../contract'
import {RectHandler} from '../../handler'
import {Prepare} from '../common'

export class MoveEvent extends CompositeEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.listenMouseEvent('mousemove')
    this.listenTouchEvent('touchmove')
  }

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseMove.event$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchMove.event$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
