import {NotFoundPage} from '@do-while-for-each/browser-router-react-tools'
import {IActionResult, IRoute} from '@do-while-for-each/path-resolver'
import React, {ReactElement} from 'react'
import {ConstantDistance, EventLoopPage, IndexPage, ResizeObserver, RxJsPage, TransformsPage} from '../app/pages'
import {IRouteNote} from './index'

export const routes: IRoute<ReactElement, IRouteNote, IActionResult<ReactElement>>[] = [
  {path: '', component: <IndexPage/>},
  {path: 'event-loop', component: <EventLoopPage/>},
  {path: 'rxjs', component: <RxJsPage/>},
  {
    path: 'transforms', component: <TransformsPage/>, children: [
      {path: 'constant-distance', component: <ConstantDistance/>},
      {path: 'resize-observer', component: <ResizeObserver/>},
    ]
  },
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
