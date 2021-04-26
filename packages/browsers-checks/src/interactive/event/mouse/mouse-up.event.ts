import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class MouseUp {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<MouseEvent> =>
    fromEvent<MouseEvent>(element, 'mouseup', options)

}
