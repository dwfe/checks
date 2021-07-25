import {merge, Observable, scan, share} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from './contract'
import {DragTransform, ScaleTransform} from './transform'
import {ElementHandler, WrapHandler} from './handler'

const {DRAG, SCALE} = InteractiveVariant

export class Interactive {

  raw$!: Observable<ITransformData>
  matrixResult$: Observable<TWebMatrix>

  constructor(public wrapHandler: WrapHandler,
              public elementHandler: ElementHandler,
              public variants: InteractiveVariant[] = [DRAG]) {
    this.init()

    this.matrixResult$ = this.raw$.pipe(
      scan<ITransformData, TWebMatrix>(
        (acc, raw) => WebMatrix.multiply(acc, raw.matrix),
        WebMatrix.identity()
      ),
      share(),
    )
  }

  private init(): void {
    const generators: ITransformGenerator[] = []
    if (this.variants.includes(DRAG))
      generators.push(new DragTransform(this.elementHandler))
    if (this.variants.includes(SCALE))
      generators.push(new ScaleTransform(this.wrapHandler))
    // if (this.variants.includes(ROTATE))
    this.raw$ = merge(
      ...generators.map(generator => generator.data$)
    ).pipe(
      share()
    )
  }

}
