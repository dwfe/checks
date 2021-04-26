import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class TouchStart {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<TouchEvent> =>
    fromEvent<TouchEvent>(element, 'touchstart', options)

}
