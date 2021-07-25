import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {ISharedHotEventOptions, IUnpackedEvent} from '../../contract'
import {MouseMove} from '../mouse/mouse-move.event'
import {TouchMove} from '../touch/touch-move.event'
import {SharedHotEvent} from '../shared-hot.event'
import {RectHandler} from '../../handler'
import {unpackEvent} from '../common'

export class MoveEvent extends SharedHotEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: ISharedHotEventOptions) {
    super(element, rectHandler, options)
    this.listenMouseEvent('mousemove')
    this.listenTouchEvent('touchmove')
  }

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: ISharedHotEventOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseMove.event$(element, options?.listener).pipe(
        map(event => unpackEvent('mouse', event, rectHandler, options?.addExtraInfo)),
      ),
      TouchMove.event$(element, options?.listener).pipe(
        map(event => unpackEvent('touch', event, rectHandler, options?.addExtraInfo)),
      ),
    ).pipe(
      share(),
    )

}
