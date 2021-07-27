import {merge, Observable, share} from '@do-while-for-each/rxjs'
import {TouchCancel} from '../touch/touch-cancel.event'
import {MouseLeave} from '../mouse/mouse-leave.event'
import {TouchEnd} from '../touch/touch-end.event'
import {MouseUp} from '../mouse/mouse-up.event'

export class UpEvent {

  static event$ = (element: Element, options?: AddEventListenerOptions): Observable<MouseEvent | TouchEvent> =>
    merge(
      MouseUp.event$(element, options),
      MouseLeave.event$(element, options),
      TouchEnd.event$(element, options),
      TouchCancel.event$(element, options),
    ).pipe(
      share(),
    )

}
