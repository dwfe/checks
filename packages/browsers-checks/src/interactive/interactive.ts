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
              private variants: InteractiveType[] = [DRAG]) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandler(element, {element: elementWrap, rectHandler: this.rectHandler})
    this.init()


    // // const up$ = UpEvent.of$(element, this.rectHandler)
    // const subscr1 = this.elementHandler.drag$.subscribe(()=> console.log(`drag-1`,))
    // const subscr2 = this.elementHandler.drag$.subscribe(()=> console.log(`drag-2`,))
    // // const subscr1 = drag$.subscribe(() => console.log(`drag-1`,))
    // // const subscr2 = drag$.subscribe(() => console.log(`drag-2`,))
    //
    // setTimeout(() => {
    //   subscr1.unsubscribe()
    //   subscr2.unsubscribe()
    //   console.log(`unsubscr 1, 2`,)
    // }, 10_000)
    // setTimeout(() => {
    //   const subscr3 = this.elementHandler.drag$.subscribe(()=> console.log(`drag-3`,))
    //   const subscr4 = this.elementHandler.drag$.subscribe(()=> console.log(`drag-4`,))
    //   // const subscr3 = drag$.subscribe(() => console.log(`drag-3`,))
    //   // const subscr4 = drag$.subscribe(() => console.log(`drag-4`,))
    //   console.log(`subscr 3, 4`,)
    // }, 20_000)


    // // const up$ = UpEvent.of$(element, this.rectHandler)
    // const subscr1 = this.elementHandler.up$.subscribe(()=> console.log(`up-1`,))
    // const subscr2 = this.elementHandler.up$.subscribe(()=> console.log(`up-2`,))
    // // const subscr1 = up$.subscribe(() => console.log(`up-1`,))
    // // const subscr2 = up$.subscribe(() => console.log(`up-2`,))
    //
    // setTimeout(() => {
    //   subscr1.unsubscribe()
    //   subscr2.unsubscribe()
    //   console.log(`unsubscr 1, 2`,)
    // }, 10_000)
    // setTimeout(() => {
    //   const subscr3 = this.elementHandler.up$.subscribe(()=> console.log(`up-3`,))
    //   const subscr4 = this.elementHandler.up$.subscribe(()=> console.log(`up-4`,))
    //   // const subscr3 = up$.subscribe(() => console.log(`up-3`,))
    //   // const subscr4 = up$.subscribe(() => console.log(`up-4`,))
    //   console.log(`subscr 3, 4`,)
    // }, 20_000)


    // // const up$ = UpEvent.of$(element, this.rectHandler)
    // const subscr1 = this.elementHandler.down$.subscribe(()=> console.log(`down-1`,))
    // const subscr2 = this.elementHandler.down$.subscribe(()=> console.log(`down-2`,))
    // // const subscr1 = down$.subscribe(() => console.log(`down-1`,))
    // // const subscr2 = down$.subscribe(() => console.log(`down-2`,))
    //
    // setTimeout(() => {
    //   subscr1.unsubscribe()
    //   subscr2.unsubscribe()
    //   console.log(`unsubscr 1, 2`,)
    // }, 10_000)
    // setTimeout(() => {
    //   const subscr3 = this.elementHandler.down$.subscribe(()=> console.log(`down-3`,))
    //   const subscr4 = this.elementHandler.down$.subscribe(()=> console.log(`down-4`,))
    //   // const subscr3 = down$.subscribe(() => console.log(`down-3`,))
    //   // const subscr4 = down$.subscribe(() => console.log(`down-4`,))
    //   console.log(`subscr 3, 4`,)
    // }, 20_000)


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
    if (this.variants.includes(DRAG))
      generators.push(new DragTransform(this.elementHandler.drag$))
    // if (this.variants.includes(SCALE))
    // if (this.variants.includes(ROTATE))
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
