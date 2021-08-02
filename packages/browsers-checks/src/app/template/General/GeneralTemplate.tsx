import React from 'react'
import {Header} from '../../component/Header/Header'
import s from './GeneralTemplate.module.css'
import {Main} from '../../component/Main'

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
