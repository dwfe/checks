import classNames from 'classnames'
import React from 'react'
import './styles.css'
import {InputValidator} from './input.validator'

interface IProps {
  label: 'count' | 'interval';
  value: string;
  setValue: (value: string) => void;
}

export function TimerInput(props: IProps) {
  const validFn = props.label === 'count' ? InputValidator.isCountValidFn : InputValidator.isIntervalValidFn;
  const invalidClassName = InputValidator.invalidClassName(props.value, validFn);
  return (
    <div className="TimerInput">
      <label>
        {props.label}&nbsp;
        <input type="string"
               className={classNames('TimerInput_input', invalidClassName)}
               onChange={event => props.setValue(event.target.value)}
               value={props.value}
        />
      </label>
    </div>
  );
}
