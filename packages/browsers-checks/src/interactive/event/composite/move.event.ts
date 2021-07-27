import {merge, Observable, share} from '@do-while-for-each/rxjs'
import {MouseMove} from '../mouse/mouse-move.event'
import {TouchMove} from '../touch/touch-move.event'

export class MoveEvent {

  static event$ = (element: Element, options?: AddEventListenerOptions): Observable<MouseEvent | TouchEvent> =>
    merge(
      MouseMove.event$(element, options),
      TouchMove.event$(element, options),
    ).pipe(
      share(),
    )

}
