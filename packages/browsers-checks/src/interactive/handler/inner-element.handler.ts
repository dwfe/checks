import {share, Stopper, takeUntil} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {WrapElementHandler} from './wrap-element.handler'
import {DownEvent, DragEvent, MoveEvent} from '../event'

export class InnerElementHandler implements IStoppable {

  private stopper = new Stopper()

  constructor(public element: Element,
              public wrap: WrapElementHandler) {
  }

  down$ = DownEvent.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  drag$ = DragEvent.event$(
    this.down$,
    this.wrap.position$,
    [this.wrap.up$, this.wrap.leave$],
    this.wrap.rectHandler,
    this.element
  ).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  position$ = MoveEvent.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )


  stop(): void {
    this.stopper.stop()
  }

}
