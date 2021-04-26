import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class TouchCancel {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<TouchEvent> =>
    fromEvent<TouchEvent>(element, 'touchcancel', options)

}
