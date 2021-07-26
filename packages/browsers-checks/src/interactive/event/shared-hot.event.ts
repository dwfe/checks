import {Observable, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {ISharedHotEventOptions, IUnpackedEvent} from '../contract'
import {unpackEvent} from './common'
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

  /**
   * Sets up a browser's event listener.
   * @return unlisten - A function that may be used to stop listening
   */
  addListeners(types: string[]) {
    types.forEach(type => {
      const commonType = type.indexOf('touch') >= 0 ? 'touch' : 'mouse';
      const fn: EventListenerOrEventListenerObject = (event: TouchEvent) => this.subj.setValue(
        unpackEvent(commonType, event, this.rectHandler, this.options?.addExtraInfo)
      )
      this.element.addEventListener(type, fn, this.options?.listener)
      this.unlisten.push(() => this.element.removeEventListener(type, fn, this.options?.listener))
    })
  }

  stop() {
    this.subj.stop()
    this.unlisten.forEach(removeFn => removeFn())
    this.unlisten = []
  }

}
