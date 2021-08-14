import React from 'react'
import classNamesBind from 'classnames/bind'
import s from './Info.module.css'

const sx = classNamesBind.bind(s)

export function Info({inStroke, inPath}) {

  return (
    <>
      Is point in?<br/>
      <span>
          <span className={sx({marked: inStroke})}>{`${inStroke}`}</span> in stroke&nbsp;
        </span><br/>
      <span>
          <span className={sx({marked: inPath})}>{`${inPath}`}</span> in path&nbsp;&nbsp;&nbsp;
        </span>
    </>
  )
}
