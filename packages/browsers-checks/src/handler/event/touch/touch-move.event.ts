import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class TouchMove {

  static of$ = (element: Element, options: AddEventListenerOptions = {}): Observable<TouchEvent> =>
    fromEvent<TouchEvent>(element, 'touchmove', options)

}
