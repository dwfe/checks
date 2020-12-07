import React from 'react';
import {IRoutableProps} from '../contract';
import {useDocumentTitle} from '../hooks/useDocumentTitle';
import {getPreviousRouteActionData} from '../globals';

export const NotFoundPage = (props: IRoutableProps) => {
  useDocumentTitle(props)
  const previous = getPreviousRouteActionData(props.routeActionData)
  const notFoundTxt = previous
    ? <span><code><b>{previous.target.pathname}</b></code> - not found</span>
    : <span>Not found</span>

  return (
    <>
      <p>{`404. `}{notFoundTxt}</p>
    </>
  )
}

