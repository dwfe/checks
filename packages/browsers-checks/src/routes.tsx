import {Route, RoutingResult} from '@do-while-for-each/path-resolver';
import React, {ReactElement} from 'react'
import {Ctx, IRouteNote, NotFoundPage} from './routing'
import {IndexPage} from './pages/IndexPage'
import {EventLoopPage} from './pages/EventLoopPage/EventLoopPage'


export const routes: Route<ReactElement, Ctx, RoutingResult<ReactElement, Ctx>, IRouteNote>[] = [
  {path: '', component: <IndexPage/>},
  {path: 'event-loop', component: <EventLoopPage/>},
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
