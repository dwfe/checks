import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchCancel} from '../touch/touch-cancel.event'
import {MouseLeave} from '../mouse/mouse-leave.event'
import {TouchEnd} from '../touch/touch-end.event'
import {CompositeEvent} from './composite.event'
import {MouseUp} from '../mouse/mouse-up.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../../contract'
import {Prepare} from '../common'

export class UpEvent extends CompositeEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.addMouseEvent('mouseup')
    this.addMouseEvent('mouseleave')
    this.addTouchEvent('touchend')
    this.addTouchEvent('touchcancel')
  }

  static of$ = (element: Element,
                rectHandler: RectHandler,
                options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseUp.of$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      MouseLeave.of$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchEnd.of$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
      TouchCancel.of$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
