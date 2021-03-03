import {IActionData, TRouteContext} from '@do-while-for-each/path-resolver'
import {IResultListenersArg} from '@do-while-for-each/browser-router'
import {HTMLProps, ReactElement} from 'react';

export type TCtx = TRouteContext & { // this context for example
  title?: string;
} | null // because history package type 'State' = object | null

export type TRouteActionData = IActionData<IRouteNote, TCtx>
export type TRouteResultArg = IResultListenersArg<ReactElement, TRouteActionData>

export type RouteActionData = IActionData<IRouteNote, TCtx>

export interface IRouteNote {
  title?: string;
}

export interface IRoutableProps extends HTMLProps<any> {
  routeActionData?: RouteActionData;
}
