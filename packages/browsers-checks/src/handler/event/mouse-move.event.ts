import {fromEvent, Observable} from '@do-while-for-each/rxjs'

export class MouseMove {

  static of$ = (element: Element, options: AddEventListenerOptions = {}): Observable<MouseEvent> =>
    fromEvent<MouseEvent>(element, 'mousemove', options)

}
