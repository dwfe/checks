import {BehaviourSubj, filter, Observable} from '@do-while-for-each/rxjs'
import {IPoint} from '@do-while-for-each/math'

export class RectHandler {

  private element!: Element
  private resizeObserver!: ResizeObserver
  public rect!: ClientRect
  private rectSubj!: BehaviourSubj<ClientRect>

  constructor(private boxOptions: ResizeObserverBoxOptions = 'border-box') {
  }

  init(element: Element): void {
    this.element = element
    this.rect = this.rectRaw
    this.rectSubj = new BehaviourSubj(this.rect)
    this.resizeObserver = new ResizeObserver(entries => {
      this.rect = this.rectRaw
      this.rectSubj.setValue(this.rect)
    })
    this.resizeObserver.observe(this.element, {box: this.boxOptions})
  }

  get rectRaw(): ClientRect {
    return this.element.getBoundingClientRect()
  }

  get rect$(): Observable<ClientRect> {
    return this.rectSubj.value$.pipe(
      filter(rect => rect.width > 0 && rect.height > 0),
    )
  }

  getCenter = (): IPoint => ({
    x: (this.rect.left + this.rect.right) / 2,
    y: (this.rect.top + this.rect.bottom) / 2
  })

  getPagePoint = (pageX: number, pageY: number): IPoint => ({
    x: pageX - this.rect.left,
    y: pageY - this.rect.top
  })

  stop() {
    this.rectSubj.stop()
    this.resizeObserver.disconnect()
  }

}
