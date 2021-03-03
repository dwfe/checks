import React from 'react';
import {useDocumentTitle} from '../../hooks/use-document-title'
import {IRoutableProps} from '../contract'
import {ActionData} from './ActionData/ActionData'

export const NotFoundPage = (props: IRoutableProps) => {
  useDocumentTitle(props)
  const {routeActionData} = props
  const previous = routeActionData?.previous

  const message = previous
    ? <span><code><b>{previous.target.pathname}</b></code> - not found</span>
    : <span>Not found</span>

  return (<>
    <p>404. {message}</p>
    <ActionData actionData={routeActionData}/>
  </>)
}
