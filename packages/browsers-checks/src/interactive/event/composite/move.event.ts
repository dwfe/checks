import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {MouseMove} from '../mouse/mouse-move.event'
import {TouchMove} from '../touch/touch-move.event'
import {CompositeEvent} from './composite.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../../contract'
import {Prepare} from '../common'

export class MoveEvent extends CompositeEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.addMouseEvent('mousemove')
    this.addTouchEvent('touchmove')
  }

  static of$ = (element: Element,
                rectHandler: RectHandler,
                options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseMove.of$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchMove.of$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
