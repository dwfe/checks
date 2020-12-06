import {useCallback, useState} from 'react'

export const useControlledRender = () => { // const renderRunFn = useControlledRender()
  const [, updateState] = useState()
  // @ts-ignore
  return useCallback(() => updateState({}), [])
}
