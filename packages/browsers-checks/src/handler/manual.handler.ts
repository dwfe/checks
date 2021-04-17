import {distinctUntilChanged, map, Observable, pairwise, shareReplay, startWith, Subject, switchMap, takeUntil} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IDragEvent, IUnpackedEvent} from './contract'
import {DownEvent, MoveEvent, UpEvent} from './event'
import {RectHandler} from './rect.handler'

export class ManualHandler {

  down$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  drag$: Observable<IDragEvent>

  private stopper$: Observable<any>
  private stopper = new Subject()

  constructor(private element: Element,
              private rectHandler: RectHandler) {
    this.stopper$ = this.stopper.asObservable().pipe(shareReplay(1));
    this.down$ = DownEvent.of$(element, rectHandler).pipe(
      takeUntil(this.stopper$),
      shareReplay(0)
    )
    this.move$ = MoveEvent.of$(element, rectHandler, {passive: true}).pipe(
      takeUntil(this.stopper$),
      shareReplay(0)
    )
    this.drag$ = this.down$.pipe(
      switchMap(x => this.move$.pipe(
        startWith(x),
        distinctUntilChanged((a, b) => Point.isEquals(a.pagePoint, b.pagePoint)),
        pairwise(),
        map(([a, b]) => ({
          prev: a,
          curr: b,
          diff: Point.subtract(b.pagePoint, a.pagePoint)
        })),
        takeUntil(UpEvent.of$(element, rectHandler, {once: true}))
      )),
      takeUntil(this.stopper$),
      shareReplay(0),
    )
  }

  stop(): void {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
