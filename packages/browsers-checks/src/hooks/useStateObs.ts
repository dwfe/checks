import {BehaviourSubjWrap, Observable} from '@do-while-for-each/rxjs'
import {useCallback, useState} from 'react'
import {useControlledRender} from './useControlledRender'

export const useStateObs = <T = any>(initValue: T): [T, (value: T) => void, Observable<T>] => {
  const [wrap] = useState(new BehaviourSubjWrap<T>(initValue))
  const renderRunFn = useControlledRender()
  const setValue = useCallback((value: T) => {
    wrap.setValue(value)
    renderRunFn()
  }, [wrap, renderRunFn])
  return [wrap.value, setValue, wrap.value$]
}
