import {Observable, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IElementHandler, IElementHandleWrap, IMoveEvent, IUnpackedEvent} from '../contract'
import {DragEvent} from '../event/composite/drag.event'
import {DownEvent, MoveEvent, UpEvent} from '../event'

export class ElementHandlerCold implements IElementHandler {

  downOnWrap$: Observable<IUnpackedEvent>
  moveOnWrap$: Observable<IUnpackedEvent>
  upOnWrap$: Observable<IUnpackedEvent>

  down$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  drag$: Observable<IMoveEvent>

  private stopper = new Stopper()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {
    this.downOnWrap$ = DownEvent.event$(wrap.element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.moveOnWrap$ = MoveEvent.event$(wrap.element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.upOnWrap$ = UpEvent.event$(wrap.element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )

    this.down$ = DownEvent.event$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.up$ = UpEvent.event$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.move$ = MoveEvent.event$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.drag$ = DragEvent.event$(this.down$, this.moveOnWrap$, this.upOnWrap$).pipe(
      tap(drag => {
        drag.target = element
      }),
      takeUntil(this.stopper.ob$),
      share(),
    )
  }

  stop(): void {
    this.stopper.stop()
  }

}
