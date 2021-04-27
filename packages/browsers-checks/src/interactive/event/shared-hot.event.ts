import {Observable, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {addListener, Prepare} from './common'
import {IUnpackedEvent} from '../contract'
import {RectHandler} from '../handler'

export class SharedHotEvent implements IStoppable {

  subj = new Subj<IUnpackedEvent>({type: 'share'})
  unlisten: (() => void)[] = []

  event$: Observable<IUnpackedEvent> = this.subj.value$

  get last(): IUnpackedEvent {
    return this.subj.lastValue
  }

  constructor(public element: Element,
              public rectHandler: RectHandler,
              public options?: AddEventListenerOptions) {
  }

  listenMouseEvent(type: string) {
    this.unlisten.push(addListener(
      type,
      this.element,
      (event: MouseEvent) => this.subj.setValue(Prepare.mouseEvent(event, this.rectHandler)),
      this.options
    ))
  }

  listenTouchEvent(type: string) {
    this.unlisten.push(addListener(
      type,
      this.element,
      (event: TouchEvent) => this.subj.setValue(Prepare.touchEvent(event, this.rectHandler)),
      this.options
    ))
  }

  stop() {
    this.subj.stop()
    this.unlisten.forEach(removeFn => removeFn())
    this.unlisten = []
  }

}
