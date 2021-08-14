import React from 'react'
import {Header, Main} from '../../component'
import s from './GeneralTemplate.module.css'

export const GeneralTemplate = (props: any) => {

  return (
    <div className={s.container}>
      <Header/>
      <Main>
        {props.children}
      </Main>
    </div>
  )
}
