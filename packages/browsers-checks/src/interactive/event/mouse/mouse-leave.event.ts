import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class MouseLeave {

  static event$ = (element: Element, options: AddEventListenerOptions = {}): Observable<MouseEvent> =>
    fromEvent<MouseEvent>(element, 'mouseleave', options)

}
