import React from 'react'
import s from './Main.module.css'

export const Main = (props: any) => {

  return (
    <main className={s.container}>
      {props.children}
    </main>
  )
}
