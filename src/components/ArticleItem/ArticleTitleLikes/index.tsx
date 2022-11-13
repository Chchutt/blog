import React from 'react'
import { Link } from 'react-router-dom'

import { formatDesc } from '../../../tools/formatDate'

import { Props } from './interfaces'
import {
  ArticleTitle, LikeCheckbox, LikeCounter, LikesContainer
} from './styles'

export const ArticleTitleLikes = (props:Props):React.ReactElement => {
  const {
    slug,
    title,
    favorited,
    favoritesCount,
    newClass,
    onClickHandle
  } = props

  return (
    <ArticleTitle>
      <Link to={`/articles/${slug}`}>
        <p>{formatDesc(title, 35)}</p>
      </Link>
      <LikesContainer>
        <LikeCheckbox
          type="checkbox"
          checked={favorited && true}
          onChange={onClickHandle}
        />
        <LikeCounter>{(favorited || newClass) ? (favoritesCount + 1) : favoritesCount }</LikeCounter>
      </LikesContainer>
    </ArticleTitle>
  )
}
