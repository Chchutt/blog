import { ArticleCreateEdit } from '../../components/ArticleCreateEdit'

import { Props } from './interfaces'

export const ArticleCreateEditPage = (props:Props) => {
  const { flag } = props
  return (
    <ArticleCreateEdit flag={flag} />
  )
}
