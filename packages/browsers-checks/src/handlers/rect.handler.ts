import {BehaviourSubj, filter, Observable, shareReplay} from '@do-while-for-each/rxjs'
import {IPoint} from '@do-while-for-each/math'

export class RectHandler {

  private element!: Element
  private resizeObserver!: ResizeObserver
  private clientRect!: BehaviourSubj<ClientRect>

  constructor(private boxOptions: ResizeObserverBoxOptions = 'border-box') {
  }

  init(element: Element): void {
    this.element = element
    this.clientRect = new BehaviourSubj(this.rectRaw)
    this.resizeObserver = new ResizeObserver(entries => {
      this.clientRect.setValue(this.rectRaw)
    })
    this.resizeObserver.observe(this.element, {box: this.boxOptions})
  }

  get rect(): ClientRect {
    return this.clientRect.value
  }

  get rect$(): Observable<ClientRect> {
    return this.clientRect.value$.pipe(
      filter(rect => rect.width > 0 && rect.height > 0),
      shareReplay(1),
    )
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
    this.resizeObserver.disconnect()
    this.clientRect.stop()
  }

}
