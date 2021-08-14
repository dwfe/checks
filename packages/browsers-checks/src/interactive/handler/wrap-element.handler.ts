import {share, Stopper, takeUntil} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {DownEvent, MouseLeave, MouseWheel, MoveEvent, UpEvent} from '../event'
import {RectHandler} from './rect.handler'

export class WrapElementHandler implements IStoppable {

  rectHandler = new RectHandler()
  private stopper = new Stopper()

  constructor(public element: Element) {
    this.rectHandler.init(element)
  }

  down$ = DownEvent.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  up$ = UpEvent.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  position$ = MoveEvent.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  leave$ = MouseLeave.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )
  wheel$ = MouseWheel.event$(this.element).pipe(
    takeUntil(this.stopper.ob$),
    share(),
  )

  stop(): void {
    this.rectHandler.stop()
    this.stopper.stop()
  }

}
