import {Link} from '@do-while-for-each/browser-router-react-tools'
import React from 'react'
import s from './CanvasPage.module.css'

export function CanvasPage() {

  return (
    <div className={s.container}>
      <Link href="/canvas/is-point-in">Is point in?</Link><br/><br/>
    </div>
  );
}
