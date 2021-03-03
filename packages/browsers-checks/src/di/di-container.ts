import {container} from 'tsyringe'
import {BrowserRouter, IBrowserRouterOptions} from '@do-while-for-each/browser-router'
import {routes} from '../routes'

const routerOptions: IBrowserRouterOptions = {
  enableTrace: false,
  injectRouteActionsDataToComponent: true,
  pathResolver: {
    enableTrace: false,
  }
}

export const initServices = () => {
  container.register(BrowserRouter, {useValue: new BrowserRouter(routes, routerOptions)}) // singleton
}
