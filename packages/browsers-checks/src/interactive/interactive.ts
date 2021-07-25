import {map, merge, Observable, scan, share} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {InteractiveVariant, ITransformData, ITransformGenerator} from './contract'
import {DragTransform, ScaleTransform} from './transform'
import {ElementHandler, WrapHandler} from './handler'

const {DRAG, SCALE} = InteractiveVariant

export class Interactive {

  raw$!: Observable<ITransformData>
  matrix$: Observable<TWebMatrix>
  matrixResult$: Observable<TWebMatrix>

  constructor(public wrapHandler: WrapHandler,
              public elementHandler: ElementHandler,
              public variants: InteractiveVariant[] = [DRAG]) {
    this.init()

    this.matrix$ = this.raw$.pipe(
      map(action => action.matrix),
      share(),
    )
    this.matrixResult$ = this.matrix$.pipe(
      scan((acc, curr) => WebMatrix.multiply(acc, curr)),
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
