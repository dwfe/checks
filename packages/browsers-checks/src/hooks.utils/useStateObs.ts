import {BehaviorSubject, Observable} from 'rxjs'
import {shareReplay} from 'rxjs/operators'
import {useCallback, useState} from 'react'
import {useControlledRender} from './useControlledRender'

export const useStateObs = <T = any>(initValue: T): [T, (value: T) => void, Observable<T>] => {
  const [subj] = useState(new BehaviorSubject<T>(initValue))
  const [value$] = useState(subj.asObservable().pipe(shareReplay(1)))
  const renderRunFn = useControlledRender()
  const setValue = useCallback((value: T) => {
    if (value !== subj.getValue()) {
      subj.next(value)
      renderRunFn()
    }
  }, [subj, renderRunFn])
  return [subj.getValue(), setValue, value$]
}
