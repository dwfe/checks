import {filter, Observable, share, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {TPoint} from '@do-while-for-each/math'

export class RectHandler implements IStoppable {

  private element!: Element
  private resizeObserver!: ResizeObserver
  private rectSubj!: Subj<ClientRect>

  constructor(private boxOptions: ResizeObserverBoxOptions = 'border-box') {
  }

  init(element: Element): void {
    this.element = element
    this.rectSubj = new Subj({type: 'shareReplay', bufferSize: 1}, this.rectRaw)
    this.resizeObserver = new ResizeObserver(entries => {
      this.rectSubj.setValue(this.rectRaw)
    })
    this.resizeObserver.observe(this.element, {box: this.boxOptions})
  }

  get rect(): ClientRect {
    return this.rectSubj.lastValue
  }

  get rect$(): Observable<ClientRect> {
    return this.rectSubj.value$.pipe(
      filter(rect => rect.width > 0 && rect.height > 0),
      share(),
    )
  }

  get rectRaw(): ClientRect {
    return this.element.getBoundingClientRect()
  }

  pagePoint = (pageX: number, pageY: number): TPoint => ([
    pageX - this.rect.left,
    pageY - this.rect.top
  ])

  stop() {
    this.rectSubj.stop()
    this.resizeObserver.disconnect()
  }

}
