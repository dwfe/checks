import {distinctUntilChanged, map, Observable, pairwise, startWith, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IMoveEvent, IUnpackedEvent} from '../../contract'
import {RectHandler} from '../../rect.handler'
import {DownEvent} from './down.event'
import {MoveEvent} from './move.event'
import {UpEvent} from './up.event'

export class DragEvent {

  static of$ = (down$: Observable<IUnpackedEvent>,
                rectHandler: RectHandler,
                moveElement: Element,
                upElement: Element = moveElement): Observable<IMoveEvent> =>
    down$.pipe(
      switchMap(x => MoveEvent.of$(moveElement, rectHandler, {passive: true}).pipe(
        startWith(x),
        distinctUntilChanged((a, b) => Point.isEquals(a.pagePoint, b.pagePoint)),
        pairwise(),
        map(([a, b]) => ({
          prev: a,
          curr: b,
          diffPagePoint: Point.subtract(b.pagePoint, a.pagePoint)
        })),
        takeUntil(UpEvent.of$(upElement, rectHandler, {once: true})),
      )),
    )

  static of2$ = (elementWrap: Element,
                 element: Element,
                 rectHandler: RectHandler,
                 options?: AddEventListenerOptions): Observable<IMoveEvent> =>
    DragEvent.of$(
      DownEvent.of$(element, rectHandler, options),
      rectHandler,
      elementWrap
    )

}
