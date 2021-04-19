import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class TouchEnd {

  static of$ = (element: Element, options: AddEventListenerOptions = {}): Observable<TouchEvent> =>
    fromEvent<TouchEvent>(element, 'touchend', options)

}
