import {IActionData, TRouteContext} from '@do-while-for-each/path-resolver'
import {IResultListenersArg} from '@do-while-for-each/browser-router'
import {HTMLProps, ReactElement} from 'react';

export type TRouteActionData = IActionData<IRouteNote>
export type TRouteResultArg = IResultListenersArg<ReactElement, TRouteActionData>

export type RouteActionData = IActionData<IRouteNote>

export interface IRouteNote {
  title?: string;
}

export interface IRoutableProps extends HTMLProps<any> {
  routeActionData?: RouteActionData;
}
