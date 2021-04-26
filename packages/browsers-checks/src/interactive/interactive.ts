import {map, merge, Observable, scan, share} from '@do-while-for-each/rxjs'
import {IStoppable} from '@do-while-for-each/common'
import {WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from './contract'
import {ElementHandlerHot} from './element.handler-hot'
import {RectHandler} from './rect.handler'
import {DragTransform, ScaleTransform} from './transform'

const {DRAG, SCALE} = InteractiveVariant

export class Interactive implements IStoppable {

  rectHandler: RectHandler;
  elementHandler: ElementHandlerHot

  data$!: Observable<ITransformData>
  transform$: Observable<WebMatrix>
  transformResult$: Observable<WebMatrix>

  constructor(private element: Element,
              private elementWrap: Element,
              private variants: InteractiveVariant[] = [DRAG]) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandlerHot(element, {element: elementWrap, rectHandler: this.rectHandler})
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
