import {useEffect} from 'react'
import {IRoutableProps} from '../routing'

export const useDocumentTitle = ({routeActionData}: IRoutableProps) => {
  useEffect(() => {
    const title = routeActionData?.note?.title
    if (title)
      document.title = title
  }, []) // eslint-disable-line
}
