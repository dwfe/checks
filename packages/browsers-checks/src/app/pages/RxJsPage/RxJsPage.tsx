import {useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'
import {IRoutableProps} from '../../../router'

export const RxJsPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      RxJs
    </>
  );
}
