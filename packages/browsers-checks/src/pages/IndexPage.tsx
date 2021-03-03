import React from 'react'
import {IRoutableProps, Link} from '../routing';
import {useDocumentTitle} from '../hooks/use-document-title'

export const IndexPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <div>
      <Link href="/event-loop">EventLoop</Link><br/><br/>
      <Link href="/rxjs">RxJs</Link><br/><br/>
    </div>
  )
}
