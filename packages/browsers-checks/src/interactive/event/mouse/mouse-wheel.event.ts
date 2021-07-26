import {fromEvent, Observable, tap} from '@do-while-for-each/rxjs'

export class MouseWheel {

  static event$ = (element: Element, options: AddEventListenerOptions = {passive: false}): Observable<WheelEvent> =>
    fromEvent<WheelEvent>(element, 'wheel', options).pipe(
      tap(e => e.preventDefault()), // при passive: false решает проблему скалинга страницы при Pinch Zoom(2мя пальцами), для iPad и Chrome/Mac
    )

}
