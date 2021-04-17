import {merge, Observable} from '@do-while-for-each/rxjs';
import {TouchCancel} from './touch/touch-cancel.event'
import {MouseLeave} from './mouse/mouse-leave.event'
import {TouchEnd} from './touch/touch-end.event'
import {MouseUp} from './mouse/mouse-up.event'
import {TManualEvent} from './contract'

export class UpEvent {

  static of$ = (element: Element, options?: AddEventListenerOptions): Observable<TManualEvent> =>
    merge(
      MouseUp.of$(element, options),
      MouseLeave.of$(element, options),
      TouchEnd.of$(element, options),
      TouchCancel.of$(element, options),
    )

}
