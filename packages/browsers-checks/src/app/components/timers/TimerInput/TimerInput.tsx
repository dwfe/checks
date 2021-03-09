import classNames from 'classnames'
import React from 'react'
import './styles.css'

interface IProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  invalidClass: string;
}

export function TimerInput(props: IProps) {
  return (
    <div className="TimerInput">
      <label>
        {props.label}&nbsp;
        <input type="string"
               className={classNames('TimerInput_input', props.invalidClass)}
               onChange={event => props.setValue(event.target.value)}
               value={props.value}
        />
      </label>
    </div>
  );
}
