import React from 'react'
import {IRoutableProps, Link, useDocumentTitle} from '../routing';

export const IndexPage = (props: IRoutableProps) => {
  useDocumentTitle(props)

  return (
    <div>
      <Link href="/event-loop">EventLoop</Link><br/>
    </div>
  )
}
