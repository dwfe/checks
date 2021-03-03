import {IActionResult, IRoute} from '@do-while-for-each/path-resolver';
import React, {ReactElement} from 'react'
import {IRouteNote, NotFound, TCtx} from './routing'
import {MainPage} from './MainPage'
import {EventLoop} from './event-loop/EventLoop'


export const routes: IRoute<ReactElement, IRouteNote, IActionResult<ReactElement>, TCtx>[] = [
  {path: '', component: <MainPage/>},
  {path: 'event-loop', component: <EventLoop/>},
  {path: 'not-found', component: <NotFound/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
