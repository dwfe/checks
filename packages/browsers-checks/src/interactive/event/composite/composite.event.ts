import {Observable, Subj} from '@do-while-for-each/rxjs'
import {addListener, Prepare} from '../common'
import {RectHandler} from '../../rect.handler'
import {IUnpackedEvent} from '../../contract'

export class CompositeEvent {

  subj = new Subj<IUnpackedEvent>({type: 'share'})
  listeners: (() => void)[] = []

  event$: Observable<IUnpackedEvent> = this.subj.value$

  get lastEvent(): IUnpackedEvent {
    return this.subj.lastValue
  }

  constructor(public element: Element,
              public rectHandler: RectHandler,
              public options?: AddEventListenerOptions) {
  }

  listenMouseEvent(type: string) {
    this.listeners.push(addListener(type, this.element, (event: MouseEvent) => {
        this.subj.setValue(Prepare.mouseEvent(event, this.rectHandler))
      }, this.options)
    )
  }

  listenTouchEvent(type: string) {
    this.listeners.push(addListener(type, this.element, (event: TouchEvent) => {
        this.subj.setValue(Prepare.touchEvent(event, this.rectHandler))
      }, this.options)
    )
  }

  stop() {
    this.subj.stop()
    this.listeners.forEach(removeFn => removeFn())
  }

}
