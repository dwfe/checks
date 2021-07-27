import {merge, Observable, scan, share, startWith, Stopper, takeUntil} from '@do-while-for-each/rxjs'
import {TWebMatrix, WebMatrix} from '@do-while-for-each/math'
import {IStoppable} from '@do-while-for-each/common'
import {DragGenerator, RotateGenerator, ScaleGenerator} from './transform-generator'
import {InteractiveVariant, ITransformGenerator} from './contract'
import {ElementHandler, RectHandler} from './handler'

const {DRAG, SCALE, ROTATE} = InteractiveVariant

export class ElementInteractive implements IStoppable {

  rawMatrix$!: Observable<TWebMatrix>
  resultMatrix$: Observable<TWebMatrix>

  private stopper = new Stopper()

  constructor(private handler: ElementHandler,
              private startTransform: TWebMatrix = WebMatrix.identity(),
              private variants: InteractiveVariant[] = [DRAG, SCALE, ROTATE]) {
    this.init()

    this.resultMatrix$ = this.rawMatrix$.pipe(
      startWith(this.startTransform),
      scan(
        (result, raw) => WebMatrix.multiply(raw, result),
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
    this.rawMatrix$ = merge(
      ...generators.map(generator => generator.data$)
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
