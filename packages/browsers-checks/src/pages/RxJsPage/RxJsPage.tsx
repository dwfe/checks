import {IRoutableProps} from '../../routing';
import React from 'react';
import {useDocumentTitle} from '../../hooks/use-document-title'

export const RxJsPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      RxJs
    </>
  );
}
