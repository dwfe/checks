import {distinctUntilChanged, map, Observable, pairwise, share, startWith, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IMoveEvent, IUnpackedEvent} from '../../contract'
import {processMoveEvent} from '../common'

export class DragEvent {

  static of$ = (down$: Observable<IUnpackedEvent>,
                move$: Observable<IUnpackedEvent>,
                up$: Observable<IUnpackedEvent>): Observable<IMoveEvent> =>
    down$.pipe(
      switchMap(x => move$.pipe(
        startWith(x),
        distinctUntilChanged((a, b) => Point.isEquals(a.pagePoint, b.pagePoint)),
        pairwise(),
        map(([a, b]) => processMoveEvent(a, b)),
        takeUntil(up$),
      )),
      share(),
    )

}
