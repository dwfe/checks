import {merge, Observable, scan, share} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {DragGenerator, RotateGenerator, ScaleGenerator} from './transform-generator'
import {InteractiveVariant, ITransformGenerator} from './contract'
import {ElementHandler, WrapHandler} from './handler'

const {DRAG, SCALE, ROTATE} = InteractiveVariant

export class Interactive {

  rawMatrix$!: Observable<TWebMatrix>
  resultMatrix$: Observable<TWebMatrix>

  constructor(public wrapHandler: WrapHandler,
              public elementHandler: ElementHandler,
              public variants: InteractiveVariant[] = [DRAG, SCALE, ROTATE]) {
    this.init()

    this.resultMatrix$ = this.rawMatrix$.pipe(
      scan(
        (result, raw) => WebMatrix.multiply(raw, result),
        WebMatrix.identity()
      ),
      share(),
    )
  }

  private init(): void {
    const generators: ITransformGenerator[] = []
    if (this.variants.includes(DRAG))
      generators.push(new DragGenerator(this.elementHandler))
    if (this.variants.includes(SCALE))
      generators.push(new ScaleGenerator(this.wrapHandler))
    if (this.variants.includes(ROTATE))
      generators.push(new RotateGenerator(this.wrapHandler))
    this.rawMatrix$ = merge(
      ...generators.map(generator => generator.data$)
    ).pipe(
      share()
    )
  }

}
