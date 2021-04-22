import {Observable, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IElementHandleWrap, IMoveEvent, IUnpackedEvent} from './contract'
import {DownEvent, MoveEvent, UpEvent} from './event'
import {DragEvent} from './event/composite/drag.event'

export class ElementHandler {

  down$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  moveWrap$: Observable<IUnpackedEvent>
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
      takeUntil(this.stopper.ob$),
      share(),
    )
    this.moveWrap$ = MoveEvent.of$(wrap.element, wrap.rectHandler).pipe(
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
