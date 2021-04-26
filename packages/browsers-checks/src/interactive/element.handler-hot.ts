import {Observable, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {IElementHandler, IElementHandleWrap, IMoveEvent, IUnpackedEvent} from './contract'
import {DragEvent} from './event/composite/drag.event'
import {DownEvent, MoveEvent, UpEvent} from './event'

export class ElementHandlerHot implements IElementHandler, IStoppable {

  downOnWrap$: Observable<IUnpackedEvent>;
  moveOnWrap$: Observable<IUnpackedEvent>;
  upOnWrap$: Observable<IUnpackedEvent>;
  down$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>
  drag$: Observable<IMoveEvent>

  private downOnWrap: MoveEvent
  private moveOnWrap: MoveEvent
  private upOnWrap: UpEvent
  private down: DownEvent
  private move: MoveEvent
  private up: UpEvent

  private stopper = new Stopper()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {

    this.downOnWrap = new DownEvent(wrap.element, wrap.rectHandler)
    this.downOnWrap$ = this.downOnWrap.event$
    this.moveOnWrap = new MoveEvent(wrap.element, wrap.rectHandler)
    this.moveOnWrap$ = this.moveOnWrap.event$
    this.upOnWrap = new UpEvent(wrap.element, wrap.rectHandler)
    this.upOnWrap$ = this.upOnWrap.event$

    this.down = new DownEvent(element, wrap.rectHandler)
    this.down$ = this.down.event$
    this.move = new MoveEvent(element, wrap.rectHandler)
    this.move$ = this.move.event$
    this.up = new UpEvent(element, wrap.rectHandler)
    this.up$ = this.up.event$
    this.drag$ = DragEvent.event$(this.down$, this.moveOnWrap$, this.upOnWrap$).pipe(
      tap(drag => {
        drag.target = element
      }),
      takeUntil(this.stopper.ob$),
      share(),
    )
  }

  stop(): void {
    this.downOnWrap.stop()
    this.moveOnWrap.stop()
    this.upOnWrap.stop()
    this.down.stop()
    this.move.stop()
    this.up.stop()
    this.stopper.stop()
  }

}
