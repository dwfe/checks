import {IActionResult, IRoute} from '@do-while-for-each/path-resolver';
import React, {ReactElement} from 'react'
import {IRouteNote, NotFoundPage} from './routing'
import {EventLoopPage, IndexPage, RxJsPage} from './pages'


export const routes: IRoute<ReactElement, IRouteNote, IActionResult<ReactElement>>[] = [
  {path: '', component: <IndexPage/>},
  {path: 'event-loop', component: <EventLoopPage/>},
  {path: 'rxjs', component: <RxJsPage/>},
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
