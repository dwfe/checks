import {map, merge, Observable, scan, shareReplay} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveType, ITransformData, ITransformGenerator} from './contract'
import {ElementHandler} from './element.handler'
import {RectHandler} from './rect.handler'
import {DragTransform} from './transform'

const {DRAG, ROTATE, SCALE} = InteractiveType

export class Interactive {

  rectHandler: RectHandler;
  elementHandler: ElementHandler

  data$!: Observable<ITransformData>
  transform$: Observable<WebMatrix>
  transformResult$: Observable<WebMatrix>

  constructor(private element: Element,
              private elementWrap: Element,
              private acceptable: InteractiveType[] = [DRAG]) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandler(element, {element: elementWrap, rectHandler: this.rectHandler})
    this.init()

    this.transform$ = this.data$.pipe(
      map(action => action.matrix),
      shareReplay(0),
    )
    this.transformResult$ = this.data$.pipe(
      map(action => action.matrix),
      scan((acc, curr) => acc.multiply(curr)),
      shareReplay(0),
    )
  }

  private init(): void {
    const generators: ITransformGenerator[] = []
    if (this.acceptable.includes(DRAG))
      generators.push(new DragTransform(this.elementHandler.drag$))
    // if (this.acceptable.includes(SCALE))
    // if (this.acceptable.includes(ROTATE))
    this.data$ = merge(
      ...generators.map(generator => generator.data$)
    ).pipe(
      shareReplay(0)
    )
  }

  stop() {
    this.rectHandler.stop()
    this.elementHandler.stop()
  }

}
