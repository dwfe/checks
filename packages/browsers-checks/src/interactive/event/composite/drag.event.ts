import {distinctUntilChanged, first, map, merge, Observable, pairwise, share, startWith, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IPagePointDiffEvent} from '../../contract'
import {toPagePointEvent} from '../common'
import {RectHandler} from '../../handler'

export class DragEvent {

  static event$ = (down$: Observable<MouseEvent | TouchEvent>,
                   position$: Observable<MouseEvent | TouchEvent>,
                   stoppers: Observable<any>[],
                   rectHandler: RectHandler,
                   targetReplace?: EventTarget): Observable<IPagePointDiffEvent> =>
    down$.pipe(
      switchMap(x => position$.pipe(
        startWith(x),
        map(event => toPagePointEvent(event, rectHandler)),
        distinctUntilChanged((prev, curr) => Point.isEquals(prev.pagePoint, curr.pagePoint)),
        pairwise(),
        map(([prev, curr]) => ({
          pagePointDiff: Point.subtract(curr.pagePoint, prev.pagePoint),
          target: targetReplace ? targetReplace : curr.target,
          event: curr.event,
        })),
        takeUntil(merge(...stoppers).pipe(first())),
      )),
      share(),
    )

}
