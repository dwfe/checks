import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchCancel} from '../touch/touch-cancel.event'
import {MouseLeave} from '../mouse/mouse-leave.event'
import {TouchEnd} from '../touch/touch-end.event'
import {CompositeEvent} from './composite.event'
import {MouseUp} from '../mouse/mouse-up.event'
import {IUnpackedEvent} from '../../contract'
import {RectHandler} from '../../handler'
import {Prepare} from '../common'

export class UpEvent extends CompositeEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.listenMouseEvent('mouseup')
    this.listenMouseEvent('mouseleave')
    this.listenTouchEvent('touchend')
    this.listenTouchEvent('touchcancel')
  }

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseUp.event$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      MouseLeave.event$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchEnd.event$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
      TouchCancel.event$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
