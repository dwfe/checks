import React from 'react'
import {IRoutableProps, Link, useDocumentTitle} from '@do-while-for-each/browser-router-react-tools';

export const IndexPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <div>
      <Link href="/event-loop">EventLoop</Link><br/><br/>
      <Link href="/rxjs">RxJs</Link><br/><br/>
    </div>
  )
}
