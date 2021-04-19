import {distinctUntilChanged, map, Observable, pairwise, shareReplay, Subject, takeUntil, tap} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IElementHandleWrap, IMoveEvent, IUnpackedEvent} from './contract'
import {DownEvent, MoveEvent, processMoveEvent, UpEvent} from './event'
import {DragEvent} from './event/composite/drag.event'

export class ElementHandler {

  down$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  move$: Observable<IMoveEvent>
  drag$: Observable<IMoveEvent>

  private stopper$: Observable<any>
  private stopper = new Subject()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {
    this.stopper$ = this.stopper.asObservable().pipe(shareReplay(0));
    this.down$ = DownEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper$),
      shareReplay(0),
    )
    this.up$ = UpEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper$),
      shareReplay(0),
    )
    this.move$ = MoveEvent.of$(element, wrap.rectHandler).pipe(
      distinctUntilChanged((a, b) => Point.isEquals(a.pagePoint, b.pagePoint)),
      pairwise(),
      map(([a, b]) => processMoveEvent(a, b)),
      takeUntil(this.stopper$),
      shareReplay(0),
    )
    this.drag$ = DragEvent.of$(this.down$, wrap.rectHandler, wrap.element).pipe(
      tap(drag => {
        drag.target = element
      }),
      takeUntil(this.stopper$),
      shareReplay(0),
    )
  }

  stop(): void {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
