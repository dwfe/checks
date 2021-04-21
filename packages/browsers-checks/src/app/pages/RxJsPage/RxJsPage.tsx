import {Link, useDocumentTitle} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'
import {IRoutableProps} from '../../../router'

export const RxJsPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <div>
      <Link href="/rxjs/subject">Subject</Link><br/><br/>
      <Link href="/rxjs/subj">Subj</Link><br/><br/>
    </div>
  );
}
