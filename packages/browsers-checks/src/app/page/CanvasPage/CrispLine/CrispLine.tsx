import React from 'react'
import s from './CrispLine.module.css'
import {AxisX} from './AxisX/AxisX'
import {AxisY} from './AxisY/AxisY'

export function CrispLine() {

  return (
    <div className={s.container}>
      <AxisX/>
      <AxisY/>
    </div>
  );
}
