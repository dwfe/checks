import {Observable, shareReplay, Subject, takeUntil} from '@do-while-for-each/rxjs'
import {IDragEvent, IUnpackedEvent, ITargetWrap} from './contract'
import {DragEvent} from './event/composite/drag.event'
import {DownEvent} from './event'

export class ElementHandler {

  down$: Observable<IUnpackedEvent>
  drag$: Observable<IDragEvent>

  private stopper$: Observable<any>
  private stopper = new Subject()

  constructor(private element: Element,
              private wrap: ITargetWrap) {
    this.stopper$ = this.stopper.asObservable().pipe(shareReplay(0));
    this.down$ = DownEvent.of$(element, wrap.rectHandler).pipe(
      takeUntil(this.stopper$),
      shareReplay(0)
    )
    this.drag$ = DragEvent.of$(this.down$, wrap.rectHandler, wrap.element).pipe(
      takeUntil(this.stopper$),
      shareReplay(0),
    )
  }

  stop(): void {
    this.stopper.next(true)
    this.stopper.complete()
  }

}
