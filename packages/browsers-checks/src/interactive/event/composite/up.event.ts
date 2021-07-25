import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {ISharedHotEventOptions, IUnpackedEvent} from '../../contract'
import {TouchCancel} from '../touch/touch-cancel.event'
import {MouseLeave} from '../mouse/mouse-leave.event'
import {TouchEnd} from '../touch/touch-end.event'
import {SharedHotEvent} from '../shared-hot.event'
import {MouseUp} from '../mouse/mouse-up.event'
import {RectHandler} from '../../handler'
import {unpackEvent} from '../common'

export class UpEvent extends SharedHotEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: ISharedHotEventOptions) {
    super(element, rectHandler, options)
    this.listenMouseEvent('mouseup')
    this.listenMouseEvent('mouseleave')
    this.listenTouchEvent('touchend')
    this.listenTouchEvent('touchcancel')
  }

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: ISharedHotEventOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseUp.event$(element, options?.listener).pipe(
        map(event => unpackEvent('mouse', event, rectHandler, options?.addExtraInfo)),
      ),
      MouseLeave.event$(element, options?.listener).pipe(
        map(event => unpackEvent('mouse', event, rectHandler, options?.addExtraInfo)),
      ),
      TouchEnd.event$(element, options?.listener).pipe(
        map(event => unpackEvent('touch', event, rectHandler, options?.addExtraInfo)),
      ),
      TouchCancel.event$(element, options?.listener).pipe(
        map(event => unpackEvent('touch', event, rectHandler, options?.addExtraInfo)),
      ),
    ).pipe(
      share(),
    )

}
