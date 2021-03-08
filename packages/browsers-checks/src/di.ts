import {BrowserRouter} from '@do-while-for-each/browser-router'
import {container} from 'tsyringe'
import {routes} from './router'

export class DI {

  static init(): void {
    const router = new BrowserRouter(routes)
    container.register(BrowserRouter, {useValue: router}) // singleton
  }

}

