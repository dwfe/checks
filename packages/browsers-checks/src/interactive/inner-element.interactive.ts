import {merge, Observable, scan, share, startWith, Stopper, takeUntil} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {IStoppable} from '@do-while-for-each/common'
import {DragGenerator, RotateGenerator, ScaleGenerator} from './transform-generator'
import {InteractiveVariant, ITransformGenerator} from './contract'
import {InnerElementHandler, RectHandler} from './handler'

const {DRAG, SCALE, ROTATE} = InteractiveVariant

export class InnerElementInteractive implements IStoppable {

  actionMatrix$!: Observable<TWebMatrix>
  resultMatrix$: Observable<TWebMatrix>

  private stopper = new Stopper()

  constructor(private handler: InnerElementHandler,
              private startTransform: TWebMatrix = WebMatrix.identity(),
              private variants: InteractiveVariant[] = [DRAG, SCALE, ROTATE]) {
    this.init()

    this.resultMatrix$ = this.actionMatrix$.pipe(
      startWith(this.startTransform),
      scan(
        /**
         * resultMatrix = actionMatrix * resultMatrix
         *   actionMatrix can be complex: m1 * m2 * ... * mN - e.g. scale at point, rotate at point.
         *   Matrix multiplication is not commutative and it applies from right to left.
         *   That is, the last matrix (mN) is applied first.
         */
        (resultMatrix, actionMatrix) => WebMatrix.multiply(actionMatrix, resultMatrix),
        WebMatrix.identity()
      ),
      takeUntil(this.stopper.ob$),
      share(),
    )
  }

  private init(): void {
    const generators: ITransformGenerator[] = []
    if (this.variants.includes(DRAG))
      generators.push(new DragGenerator(this.handler.drag$))
    if (this.variants.includes(SCALE))
      generators.push(new ScaleGenerator(this.wheel$, this.rectHandler))
    if (this.variants.includes(ROTATE))
      generators.push(new RotateGenerator(this.wheel$, this.rectHandler))
    this.actionMatrix$ = merge(
      ...generators.map(generator => generator.matrix$)
    ).pipe(
      takeUntil(this.stopper.ob$),
      share()
    )
  }

  stop(): void {
    this.stopper.stop()
  }


//region Support

  get rectHandler(): RectHandler {
    return this.handler.wrap.rectHandler
  }

  get wheel$(): Observable<WheelEvent> {
    return this.handler.wrap.wheel$
  }

//endregion

}
