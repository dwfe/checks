import {IStoppable} from '@do-while-for-each/common'
import {share, Stopper, takeUntil, tap} from '@do-while-for-each/rxjs'
import {DownEvent, MoveEvent, UpEvent} from '../event'
import {DragEvent} from '../event/composite/drag.event'
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
  drag$ = DragEvent.event$(this.down$, this.wrap.move$, [this.wrap.up$, this.wrap.leave$]).pipe(
    tap(drag => {
      if (drag.extra)
        drag.extra.target = this.element
    }),
    takeUntil(this.stopper.ob$),
    share(),
  )

  stop(): void {
    this.stopper.stop()
  }

}
