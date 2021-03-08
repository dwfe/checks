import {useCallback, useState} from 'react'
import {BehaviorSubject, Observable} from 'rxjs'
import {distinctUntilChanged, shareReplay} from 'rxjs/operators'
import {useControlledRender} from './useControlledRender'


export const useSubjState = <T = any>(initValue: T): [T, Observable<T>, (value: T) => void] => {
  const renderRunFn = useControlledRender()

  const [subj] = useState(() => new BehaviorSubject<T>(initValue))

  const value = subj.getValue()
  const [value$] = useState(() => subj.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  ))

  const setValue = useCallback((value: T) => {
    subj.next(value)
    renderRunFn()
  }, [subj, renderRunFn])

  return [value, value$, setValue]
}
