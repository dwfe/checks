import {IRoutableProps, useDocumentTitle} from '../../routing';
import React from 'react';

export const RxJsPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <>
      RxJs
    </>
  );
}
