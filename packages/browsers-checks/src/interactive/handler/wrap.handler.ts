import {IStoppable} from '@do-while-for-each/common'
import {Observable} from '@do-while-for-each/rxjs'
import {DownEvent, MoveEvent, UpEvent} from '../event'
import {RectHandler} from './rect.handler'
import {IUnpackedEvent} from '../contract'

export class WrapHandler implements IStoppable {

  down$: Observable<IUnpackedEvent>
  move$: Observable<IUnpackedEvent>
  up$: Observable<IUnpackedEvent>

  rectHandler: RectHandler

  private down: MoveEvent
  private move: MoveEvent
  private up: UpEvent

  constructor(public element: Element) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(element)

    this.down = new DownEvent(element, this.rectHandler)
    this.move = new MoveEvent(element, this.rectHandler)
    this.up = new UpEvent(element, this.rectHandler)

    this.down$ = this.down.event$
    this.move$ = this.move.event$
    this.up$ = this.up.event$
  }

  stop(): void {
    this.down.stop()
    this.move.stop()
    this.up.stop()
    this.rectHandler.stop()
  }

}
