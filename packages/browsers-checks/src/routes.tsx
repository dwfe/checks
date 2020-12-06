import {Route, RoutingResult} from '@do-while-for-each/path-resolver';
import React, {ReactElement} from 'react'
import {Ctx, IRouteNote, NotFound} from './routing'
import {MainPage} from './MainPage'
import {EventLoop} from './event-loop/EventLoop'


export const routes: Route<ReactElement, Ctx, RoutingResult<ReactElement, Ctx>, IRouteNote>[] = [
  {path: '', component: <MainPage/>},
  {path: 'event-loop', component: <EventLoop/>},
  {path: 'not-found', component: <NotFound/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
