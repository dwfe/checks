import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class MouseDown {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<MouseEvent> =>
    fromEvent<MouseEvent>(element, 'mousedown', options)

}
