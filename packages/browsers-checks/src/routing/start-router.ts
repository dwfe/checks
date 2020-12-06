import {Routes} from '@do-while-for-each/path-resolver'
import {BrowserRouter} from '@do-while-for-each/browser-router'
import {ReactElement} from 'react'
import ReactDOM from 'react-dom'
import {container} from 'tsyringe'
import {tap} from 'rxjs/operators'

export const startRouter = (routes: Routes, root: HTMLElement | null) => {
  if (!root)
    throw new Error('Root routing element is not defined');

  container.register(BrowserRouter, {useValue: new BrowserRouter(routes)})
  const router = container.resolve<BrowserRouter<ReactElement>>(BrowserRouter)

  router.componentData$.pipe(
    tap(({component, routeActionData}) => {
      ReactDOM.render(
        component,
        root
      )
    }),
  ).subscribe()

  router.start()
}
