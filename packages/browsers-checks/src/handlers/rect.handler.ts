import {BehaviourSubj, Observable} from '@do-while-for-each/rxjs'
import {IPoint} from '@do-while-for-each/math'

export class RectHandler {

  private _rect: BehaviourSubj<ClientRect>

  get rect(): ClientRect {
    return this._rect.value
  }

  get rect$(): Observable<ClientRect> {
    return this._rect.value$
  }

  get rectRaw(): ClientRect {
    return this.element.getBoundingClientRect()
  }

  constructor(private element: Element) {
    this._rect = new BehaviourSubj(this.rectRaw)
    new ResizeObserver(entries => {
      this._rect.setValue(this.rectRaw)
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

}
