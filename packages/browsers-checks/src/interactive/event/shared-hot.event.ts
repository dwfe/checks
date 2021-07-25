import {Observable, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {ISharedHotEventOptions, IUnpackedEvent} from '../contract'
import {addListener, unpackEvent} from './common'
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
              public options?: ISharedHotEventOptions) {
  }

  listenMouseEvent(type: string) {
    this.unlisten.push(addListener(
      type,
      this.element,
      (event: MouseEvent) => this.subj.setValue(
        unpackEvent('mouse', event, this.rectHandler, this.options?.addExtraInfo)
      ),
      this.options?.listener
    ))
  }

  listenTouchEvent(type: string) {
    this.unlisten.push(addListener(
      type,
      this.element,
      (event: TouchEvent) => this.subj.setValue(
        unpackEvent('touch', event, this.rectHandler, this.options?.addExtraInfo)
      ),
      this.options?.listener
    ))
  }

  stop() {
    this.subj.stop()
    this.unlisten.forEach(removeFn => removeFn())
    this.unlisten = []
  }

}
