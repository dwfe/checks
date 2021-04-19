import {map, merge, Observable, scan, shareReplay} from '@do-while-for-each/rxjs'
import {WebMatrix} from '@do-while-for-each/math'
import {IGenerator, IGeneratorAction} from './contract'
import {ElementHandler} from './element.handler'
import {RectHandler} from './rect.handler'
import {DragGenerator} from './generator'

export class Interactive {

  rectHandler: RectHandler;
  elementHandler: ElementHandler
  actions$!: Observable<IGeneratorAction>

  constructor(private element: Element,
              private elementWrap: Element) {
    this.rectHandler = new RectHandler()
    this.rectHandler.init(elementWrap)
    this.elementHandler = new ElementHandler(element, {element: elementWrap, rectHandler: this.rectHandler})
    this.init()
  }

  private init(): void {
    const generators: IGenerator[] = [
      new DragGenerator(this.elementHandler.drag$),
    ]
    this.actions$ = merge(
      ...generators.map(generator => generator.actions)
    ).pipe(
      shareReplay(0)
    )
  }

  matrix$ = (): Observable<WebMatrix> => this.actions$.pipe(
    map(action => action.matrix),
    shareReplay(0),
  )

  matrixResult$ = (): Observable<WebMatrix> => this.matrix$().pipe(
    scan((acc, curr) => acc.multiply(curr)),
    shareReplay(0),
  )

  stop() {
    this.rectHandler.stop()
    this.elementHandler.stop()
  }
}
