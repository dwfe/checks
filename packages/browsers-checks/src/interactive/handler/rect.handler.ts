import {filter, Observable, share, Subj} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {TPoint} from '@do-while-for-each/math'
import {TManualEvent} from '../contract'

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

  pagePointFromEvent(event: TManualEvent): TPoint {
    let pageX: number, pageY: number;
    if (event['pageX'] !== undefined) {
      pageX = (event as MouseEvent).pageX
      pageY = (event as MouseEvent).pageY
    } else if (event['touches'] !== undefined) {
      pageX = (event as TouchEvent).touches[0].pageX
      pageY = (event as TouchEvent).touches[0].pageY
    } else
      throw new Error(`can't convert to IPagePointEvent because unknown type of event`)
    return this.pagePoint(pageX, pageY)
  }

  stop() {
    this.rectSubj.stop()
    this.resizeObserver.disconnect()
  }

}
