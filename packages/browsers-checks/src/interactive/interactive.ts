import {map, merge, Observable, scan, share} from '@do-while-for-each/rxjs'
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
              private variants: InteractiveType[] = [DRAG]) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandler(element, {element: elementWrap, rectHandler: this.rectHandler})
    this.init()

    this.transform$ = this.data$.pipe(
      map(action => action.matrix),
      share(),
    )
    this.transformResult$ = this.transform$.pipe(
      scan((acc, curr) => acc.multiply(curr)),
      share(),
    )
  }

  private init(): void {
    const generators: ITransformGenerator[] = []
    if (this.variants.includes(DRAG))
      generators.push(new DragTransform(this.elementHandler.drag$))
    // if (this.variants.includes(SCALE))
    // if (this.variants.includes(ROTATE))
    this.data$ = merge(
      ...generators.map(generator => generator.data$)
    ).pipe(
      share()
    )
  }

  stop() {
    this.rectHandler.stop()
    this.elementHandler.stop()
  }

}
