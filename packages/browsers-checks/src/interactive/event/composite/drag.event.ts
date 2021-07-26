import {distinctUntilChanged, first, map, merge, Observable, pairwise, share, startWith, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IDragEvent, IUnpackedEvent} from '../../contract'

export class DragEvent {

  static event$ = (down$: Observable<IUnpackedEvent>,
                   cursorPos$: Observable<IUnpackedEvent>,
                   stoppers: Observable<any>[],
                   targetReplace?: EventTarget): Observable<IDragEvent> =>
    down$.pipe(
      switchMap(x => cursorPos$.pipe(
        startWith(x),
        distinctUntilChanged((prev, curr) => Point.isEquals(prev.pagePoint, curr.pagePoint)),
        pairwise(),
        map(([prev, curr]) => {
          const result: IDragEvent = {
            pagePointDiff: Point.subtract(curr.pagePoint, prev.pagePoint),
          };
          if (curr.extra)
            result.extra = {
              target: targetReplace ? targetReplace : curr.extra.target,
              prevEvent: prev,
              currEvent: curr,
            }
          return result;
        }),
        takeUntil(merge(...stoppers).pipe(first())),
      )),
      share(),
    )

}
