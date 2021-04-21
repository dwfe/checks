import {distinctUntilChanged, map, Observable, pairwise, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {Point} from '@do-while-for-each/math'
import {IElementHandleWrap, IMoveEvent, IUnpackedEvent} from './contract'
import {DownEvent, MoveEvent, processMoveEvent, UpEvent} from './event'
import {DragEvent} from './event/composite/drag.event'

export class ElementHandler {

  down$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  move$: Observable<IMoveEvent>
  drag$: Observable<IMoveEvent>

  private stopper = new Stopper()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {
    this.down$ = DownEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.up$ = UpEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.move$ = MoveEvent.of$(element, wrap.rectHandler).pipe(
      distinctUntilChanged((a, b) => Point.isEquals(a.pagePoint, b.pagePoint)),
      pairwise(),
      map(([a, b]) => processMoveEvent(a, b)),
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.drag$ = DragEvent.of$(this.down$, wrap.rectHandler, wrap.element).pipe(
      tap(drag => {
        drag.target = element
      }),
      takeUntil(this.stopper.ob$),
      share(),
    )
  }

  stop(): void {
    this.stopper.terminate()
  }

}
