import {Observable, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'

export class HotEvent<TEvent = any> implements IStoppable {

  subj = new Subj<TEvent>({type: 'share'})
  event$: Observable<TEvent> = this.subj.value$
  unlisten: (() => void)[] = []

  constructor(public element: Element,
              public eventTypes: string[],
              public options?: AddEventListenerOptions) {
    this.addListeners(eventTypes)
  }

  get last(): TEvent {
    return this.subj.lastValue
  }

  /**
   * Sets up a browser's event listener.
   * @return unlisten - A function that may be used to stop listening
   */
  addListeners(eventTypes: string[]) {
    eventTypes.forEach(type => {
      const fn = event => this.subj.setValue(event as any)
      this.element.addEventListener(type, fn, this.options)
      this.unlisten.push(() => this.element.removeEventListener(type, fn, this.options))
    })
  }

  stop() {
    this.subj.stop()
    this.unlisten.forEach(removeFn => removeFn())
    this.unlisten = []
  }

}
