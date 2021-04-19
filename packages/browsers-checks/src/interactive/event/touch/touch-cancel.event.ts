import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class TouchCancel {

  static of$ = (element: Element, options: AddEventListenerOptions = {}): Observable<TouchEvent> =>
    fromEvent<TouchEvent>(element, 'touchcancel', options)

}
