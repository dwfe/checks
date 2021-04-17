import {merge, Observable} from '@do-while-for-each/rxjs';
import {TouchStart} from './touch/touch-start.event'
import {MouseDown} from './mouse/mouse-down.event'
import {TManualEvent} from './contract'

export class DownEvent {

  static of$ = (element: Element, options?: AddEventListenerOptions): Observable<TManualEvent> =>
    merge(
      MouseDown.of$(element, options),
      TouchStart.of$(element, options),
    )

}
