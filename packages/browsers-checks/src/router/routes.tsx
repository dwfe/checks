import {NotFoundPage} from '@do-while-for-each/browser-router-react-tools'
import {IActionResult, IRoute} from '@do-while-for-each/path-resolver'
import React, {ReactElement} from 'react'
import {AsObservableShareReplay, CanvasPage, ConstantDistance, CrispLine, EventLoopPage, ImageToFit, IndexPage, IsPointIn, ResizeObserver, RxJsPage, SubjCheckAsObservableShareReplay, SubjectCheckAsObservableShareReplay, TilesMaker, ToNewCoordinateSystem, TransformCanvas, TransformDom, TransformsPage} from '../app/page'
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
      {path: 'to-new-coordinate-system', component: <ToNewCoordinateSystem/>},
    ]
  },
  {
    path: 'canvas', component: <CanvasPage/>, children: [
      {path: 'image-to-fit', component: <ImageToFit/>},
      {path: 'crisp-line', component: <CrispLine/>},
      {path: 'is-point-in', component: <IsPointIn/>},
      {path: 'tiles-maker', component: <TilesMaker/>},
    ]
  },
  {path: 'not-found', component: <NotFoundPage/>},
  {path: '(.*)', redirectTo: 'not-found'},
]
