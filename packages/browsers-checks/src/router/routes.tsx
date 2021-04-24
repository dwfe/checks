import {NotFoundPage} from '@do-while-for-each/browser-router-react-tools'
import {IActionResult, IRoute} from '@do-while-for-each/path-resolver'
import React, {ReactElement} from 'react'
import {AsObservableShareReplay, ConstantDistance, EventLoopPage, IndexPage, ResizeObserver, RxJsPage, SubjCheckAsObservableShareReplay, SubjectCheckAsObservableShareReplay, TransformProvingGround, TransformsPage} from '../app/pages'
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
      {path: 'transform-proving-ground', component: <TransformProvingGround/>},
    ]
  },
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
