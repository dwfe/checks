import {NotFoundPage} from '@do-while-for-each/browser-router-react-tools'
import {IActionResult, IRoute} from '@do-while-for-each/path-resolver'
import React, {ReactElement} from 'react'
import {AsObservableShareReplay, ConstantDistance, EventLoopPage, IndexPage, ResizeObserver, RxJsPage, SubjCheckAsObservableShareReplay, SubjectCheckAsObservableShareReplay, TransformCanvas, TransformDom, TransformsPage} from '../app/page'
import {CanvasPage, IsInside} from '../app/page/CanvasPage'
import {IRouteNote} from './index'

export const routes: IRoute<ReactElement, IRouteNote, IActionResult<ReactElement>>[] = [
  {path: '', component: <IndexPage/>},
  {path: 'event-loop', component: <EventLoopPage/>},
  {
    path: 'rxjs', component: <RxJsPage/>, children: [
      {
        path: 'asObservable-share-shareReplay', component: <AsObservableShareReplay/>, children: [
          {path: 'subject', component: <SubjectCheckAsObservableShareReplay/>},
          {path: 'subj', component: <SubjCheckAsObservableShareReplay/>},
        ]
      },
    ]
  },
  {
    path: 'transforms', component: <TransformsPage/>, children: [
      {path: 'constant-distance', component: <ConstantDistance/>},
      {path: 'resize-observer', component: <ResizeObserver/>},
      {path: 'transform-dom', component: <TransformDom/>},
      {path: 'transform-canvas', component: <TransformCanvas/>},
    ]
  },
  {
    path: 'canvas', component: <CanvasPage/>, children: [
      {path: 'is-inside', component: <IsInside/>}
    ]
  },
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
