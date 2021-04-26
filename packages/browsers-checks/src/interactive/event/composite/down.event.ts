import {map, merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchStart} from '../touch/touch-start.event'
import {MouseDown} from '../mouse/mouse-down.event'
import {CompositeEvent} from './composite.event'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../../contract'
import {Prepare} from '../common'

export class DownEvent extends CompositeEvent {

  constructor(element: Element,
              rectHandler: RectHandler,
              options?: AddEventListenerOptions) {
    super(element, rectHandler, options)
    this.addMouseEvent('mousedown')
    this.addTouchEvent('touchstart')
  }

  static of$ = (element: Element,
                rectHandler: RectHandler,
                options?: AddEventListenerOptions): Observable<IUnpackedEvent> =>
    merge(
      MouseDown.of$(element, options).pipe(
        map(event => Prepare.mouseEvent(event, rectHandler)),
      ),
      TouchStart.of$(element, options).pipe(
        map(event => Prepare.touchEvent(event, rectHandler)),
      ),
    ).pipe(
      share(),
    )

}
