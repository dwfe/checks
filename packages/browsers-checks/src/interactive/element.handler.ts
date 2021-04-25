import {Observable, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IElementHandleWrap, IMoveEvent, IUnpackedEvent} from './contract'
import {DownEvent, MoveEvent, UpEvent} from './event'
import {DragEvent} from './event/composite/drag.event'

export class ElementHandler {

  moveOnWrap$: Observable<IUnpackedEvent>
  upOnWrap$: Observable<IUnpackedEvent>

  down$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  drag$: Observable<IMoveEvent>

  private stopper = new Stopper()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {
    this.moveOnWrap$ = MoveEvent.of$(wrap.element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.upOnWrap$ = UpEvent.of$(wrap.element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )

    this.down$ = DownEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.up$ = UpEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.move$ = MoveEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.drag$ = DragEvent.of$(this.down$, this.moveOnWrap$, this.upOnWrap$).pipe(
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
