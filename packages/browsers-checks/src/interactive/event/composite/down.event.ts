import {merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchStart} from '../touch/touch-start.event'
import {MouseDown} from '../mouse/mouse-down.event'

export class DownEvent {

  static event$ = (element: Element, options?: AddEventListenerOptions): Observable<MouseEvent | TouchEvent> =>
    merge(
      MouseDown.event$(element, options),
      TouchStart.event$(element, options),
    ).pipe(
      share(),
    )

}
