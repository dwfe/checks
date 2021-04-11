import {BehaviourSubj, Observable} from '@do-while-for-each/rxjs'
import {IPoint} from '@do-while-for-each/math'

export class RectHandler {

  private resizeObserver: ResizeObserver
  private clientRect: BehaviourSubj<ClientRect>

  constructor(private element: Element,
              private boxOptions: ResizeObserverBoxOptions = 'border-box') {
    this.clientRect = new BehaviourSubj(this.rectRaw)
    this.resizeObserver = new ResizeObserver(entries => {
      this.clientRect.setValue(this.rectRaw)
    })
    this.resizeObserver.observe(this.element, {box: boxOptions})
  }

  get rect(): ClientRect {
    return this.clientRect.value
  }

  get rect$(): Observable<ClientRect> {
    return this.clientRect.value$
  }

  get rectRaw(): ClientRect {
    return this.element.getBoundingClientRect()
  }

  get center(): IPoint {
    const rect = this.rect
    return {
      x: (rect.left + rect.right) / 2,
      y: (rect.top + rect.bottom) / 2
    }
  }

  getPoint(event: { pageX: number; pageY: number }): IPoint {
    const rect = this.rect
    return {
      x: event.pageX - rect.left,
      y: event.pageY - rect.top
    }
  }

  stop() {
    this.clientRect.stop()
    this.resizeObserver.disconnect()
  }

}
