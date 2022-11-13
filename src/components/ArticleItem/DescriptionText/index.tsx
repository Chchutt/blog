import React from 'react'

import { formatDesc } from '../../../tools/formatDate'

import { Props } from './interfaces'
import { ArticleFullText } from './styles'

export const ArticleDescText = (props:Props):React.ReactElement => {
  const { description } = props
  return (
    <ArticleFullText>
      {formatDesc(description, 135)}
    </ArticleFullText>
  )
}
