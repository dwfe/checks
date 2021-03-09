import {BehaviorSubject, Observable} from 'rxjs'
import {shareReplay} from 'rxjs/operators'
import {useCallback, useState} from 'react'
import {useControlledRender} from './useControlledRender'

export const useSubjState = <T = any>(initValue: T): [T, Observable<T>, (value: T) => void] => {
  const [subj] = useState(new BehaviorSubject<T>(initValue))
  const [value$] = useState(subj.asObservable().pipe(shareReplay(1)))
  const renderRunFn = useControlledRender()
  const setValue = useCallback((value: T) => {
    if (value !== subj.getValue()) {
      subj.next(value)
      renderRunFn()
    }
  }, [subj, renderRunFn])
  return [subj.getValue(), value$, setValue]
}
