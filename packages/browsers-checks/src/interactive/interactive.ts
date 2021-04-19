import {map, merge, Observable, scan, shareReplay} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {ElementHandler} from './element.handler'
import {RectHandler} from './rect.handler'
import {ITransformData} from './contract'
import {DragTransform} from './transform'

export class Interactive {

  rectHandler: RectHandler;
  elementHandler: ElementHandler

  data$!: Observable<ITransformData>
  matrix$: Observable<WebMatrix>
  matrixResult$: Observable<WebMatrix>

  constructor(private element: Element,
              private elementWrap: Element) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandler(element, {element: elementWrap, rectHandler: this.rectHandler})
    this.init()

    this.matrix$ = this.data$.pipe(
      map(action => action.matrix),
      shareReplay(0),
    )
    this.matrixResult$ = this.data$.pipe(
      map(action => action.matrix),
      scan((acc, curr) => acc.multiply(curr)),
      shareReplay(0),
    )
  }

  private init(): void {
    this.data$ = merge(
      new DragTransform(this.elementHandler.drag$).data$,
    ).pipe(
      shareReplay(0)
    )
  }

  stop() {
    this.rectHandler.stop()
    this.elementHandler.stop()
  }

}
