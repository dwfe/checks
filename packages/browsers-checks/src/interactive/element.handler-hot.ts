import {Observable, share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {IElementHandleWrap, IMoveEvent} from './contract'
import {DragEvent} from './event/composite/drag.event'
import {DownEvent, MoveEvent, UpEvent} from './event'

export class ElementHandlerHot implements IStoppable {

  moveOnWrap: MoveEvent
  upOnWrap: UpEvent
  down: DownEvent
  move: MoveEvent
  up: UpEvent
  drag$: Observable<IMoveEvent>

  private stopper = new Stopper()

  constructor(private element: Element,
              private wrap: IElementHandleWrap) {
    this.moveOnWrap = new MoveEvent(wrap.element, wrap.rectHandler)
    this.upOnWrap = new UpEvent(wrap.element, wrap.rectHandler)
    this.down = new DownEvent(element, wrap.rectHandler)
    this.move = new MoveEvent(element, wrap.rectHandler)
    this.up = new UpEvent(element, wrap.rectHandler)

    this.drag$ = DragEvent.event$(this.down.event$, this.moveOnWrap.event$, this.upOnWrap.event$).pipe(
      tap(drag => {
        drag.target = element
      }),
      takeUntil(this.stopper.ob$),
      share(),
    )
  }

  stop(): void {
    this.moveOnWrap.stop()
    this.upOnWrap.stop()
    this.down.stop()
    this.move.stop()
    this.up.stop()
    this.stopper.stop()
  }

}
