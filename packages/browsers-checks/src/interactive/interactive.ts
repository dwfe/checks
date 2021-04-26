import {map, merge, Observable, scan, share} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {WebMatrix} from '@do-while-for-each/math'
import {ElementHandlerType, IElementHandler, InteractiveVariant, ITransformData, ITransformGenerator} from './contract'
import {ElementHandlerFactory} from './element.handler/element-handler.factory'
import {DragTransform, ScaleTransform} from './transform'
import {RectHandler} from './rect.handler'

const {DRAG, SCALE} = InteractiveVariant

export class Interactive implements IStoppable {

  rectHandler: RectHandler
  elementHandler: IElementHandler

  data$!: Observable<ITransformData>
  transform$: Observable<WebMatrix>
  transformResult$: Observable<WebMatrix>

  constructor(private element: Element,
              private elementWrap: Element,
              private handlerType: ElementHandlerType,
              private variants: InteractiveVariant[] = [DRAG]) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = ElementHandlerFactory.get(handlerType, element, {element: elementWrap, rectHandler: this.rectHandler})
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
      generators.push(new DragTransform(this.elementHandler))
    if (this.variants.includes(SCALE))
      generators.push(new ScaleTransform(this.elementHandler))
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
