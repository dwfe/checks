import {BehaviourSubj, Observable} from '@do-while-for-each/rxjs'
import {IPoint} from '@do-while-for-each/math'

export class RectHandler {

  private clientRect: BehaviourSubj<ClientRect>

  get rect(): ClientRect {
    return this.clientRect.value
  }

  get rect$(): Observable<ClientRect> {
    return this.clientRect.value$
  }

  get rectRaw(): ClientRect {
    return this.element.getBoundingClientRect()
  }

  constructor(private element: Element) {
    this.clientRect = new BehaviourSubj(this.rectRaw)
    new ResizeObserver(entries => {
      this.clientRect.setValue(this.rectRaw)
    }).observe(this.element)
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
  }

}
