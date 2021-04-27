import {share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {DragEvent} from '../event/composite/drag.event'
import {DownEvent, MoveEvent, UpEvent} from '../event'
import {WrapHandler} from './wrap.handler'

export class ElementHandler implements IStoppable {

  private stopper = new Stopper()

  constructor(public element: Element,
              public wrap: WrapHandler) {
  }

  down$ = DownEvent.event$(this.element, this.wrap.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  move$ = MoveEvent.event$(this.element, this.wrap.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  up$ = UpEvent.event$(this.element, this.wrap.rectHandler).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  drag$ = DragEvent.event$(this.down$, this.wrap.move$, this.wrap.up$).pipe(
    tap(drag => {
      drag.target = this.element
    }),
    takeUntil(this.stopper.ob$),
    share(),
  )

  stop(): void {
    this.stopper.stop()
  }

}
