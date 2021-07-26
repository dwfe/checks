import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class MouseWheel {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<WheelEvent> =>
    fromEvent<WheelEvent>(element, 'wheel', options)

}
