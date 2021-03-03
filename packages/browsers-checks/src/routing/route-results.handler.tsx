import {BrowserRouter} from '@do-while-for-each/browser-router'
import {container} from 'tsyringe'
import ReactDOM from 'react-dom'
import React from 'react'
import {TRouteResultArg} from './contract'

export class RouteResultsHandler {

  private router: BrowserRouter
  private unlistenFn!: () => void

  constructor(private root: HTMLElement | null) {
    this.router = container.resolve(BrowserRouter)
  }

  start() {
    this.unlistenFn = this.router.resultListeners.push(this.onRouteResult.bind(this));
    this.router.start()
  }

  stop() {
    this.unlistenFn?.()
  }

  private onRouteResult({component, routeActionData}: TRouteResultArg) {
    ReactDOM.render(
      component,
      this.root
    )
  }

}
