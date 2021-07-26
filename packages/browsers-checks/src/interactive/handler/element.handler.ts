import {share, Stopper, takeUntil} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {DragEvent} from '../event/composite/drag.event'
import {DownEvent, MoveEvent, UpEvent} from '../event'
import {RectHandler} from './rect.handler'
import {WrapHandler} from './wrap.handler'

export class ElementHandler implements IStoppable {

  private stopper = new Stopper()

  constructor(public element: Element,
              public wrap: WrapHandler) {
  }

  down$ = DownEvent.event$(this.element, this.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  up$ = UpEvent.event$(this.element, this.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  cursorPos$ = MoveEvent.event$(this.element, this.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  drag$ = DragEvent.event$(
    this.down$,
    this.wrap.cursorPos$,
    [this.wrap.up$, this.wrap.leave$],
    this.element
  ).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )

  stop(): void {
    this.stopper.stop()
  }

  get rectHandler(): RectHandler {
    return this.wrap.rectHandler;
  }

}
