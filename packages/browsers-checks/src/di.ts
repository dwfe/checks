import {BrowserRouter, IBrowserRouterOptions} from '@do-while-for-each/browser-router'
import {container} from 'tsyringe'
import {routes} from './routes'

export class DI {

  static init(): void {

    const routerOptions: IBrowserRouterOptions = {
      isDebug: true,
      injectRouteActionsDataToComponent: true,
      pathResolver: {
        isDebug: true,
      }
    }
    const router = new BrowserRouter(routes, routerOptions)

    container.register(BrowserRouter, {useValue: router}) // singleton
  }

}

