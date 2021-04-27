import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchStart} from '../touch/touch-start.event'
import {MouseDown} from '../mouse/mouse-down.event'
import {SharedHotEvent} from '../shared-hot.event'
import {IUnpackedEvent} from '../../contract'
import {RectHandler} from '../../handler'
import {Prepare} from '../common'

export class DownEvent extends SharedHotEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.listenMouseEvent('mousedown')
    this.listenTouchEvent('touchstart')
  }

  static event$ = (element: Element,
                   rectHandler: RectHandler,
                   options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseDown.event$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchStart.event$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
