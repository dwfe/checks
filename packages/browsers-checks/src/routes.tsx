import {Route, RoutingResult} from '@do-while-for-each/path-resolver';
import React, {ReactElement} from 'react'
import {Ctx, IRouteNote, NotFoundPage} from './routing'
import {EventLoopPage, IndexPage, RxJsPage} from './pages'


export const routes: Route<ReactElement, Ctx, RoutingResult<ReactElement, Ctx>, IRouteNote>[] = [
  {path: '', component: <IndexPage/>},
  {path: 'event-loop', component: <EventLoopPage/>},
  {path: 'rxjs', component: <RxJsPage/>},
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
