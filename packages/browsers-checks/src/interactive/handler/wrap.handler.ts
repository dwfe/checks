import {IStoppable} from '@do-while-for-each/common'
import {Observable} from '@do-while-for-each/rxjs'
import {DownEvent, MoveEvent, UpEvent} from '../event'
import {RectHandler} from './rect.handler'
import {IUnpackedEvent} from '../contract'

export class WrapHandler implements IStoppable {

  rectHandler = new RectHandler()

  private down: DownEvent
  private move: MoveEvent
  private up: UpEvent

  constructor(public element: Element) {
    this.rectHandler.init(element)
    this.down = new DownEvent(element, this.rectHandler)
    this.move = new MoveEvent(element, this.rectHandler)
    this.up = new UpEvent(element, this.rectHandler)
  }

  get down$(): Observable<IUnpackedEvent> {
    return this.down.event$
  }

  get move$(): Observable<IUnpackedEvent> {
    return this.move.event$
  }

  get up$(): Observable<IUnpackedEvent> {
    return this.up.event$
  }

  stop(): void {
    this.down.stop()
    this.move.stop()
    this.up.stop()
    this.rectHandler.stop()
  }

}
