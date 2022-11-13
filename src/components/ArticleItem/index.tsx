import { useSelector } from 'react-redux'
import React, { useState } from 'react'

import { ArticleFace, SuperArticleState } from '../../redux/actions/actionCreators'
import { delArticleBySlug, favorArticleBySlug } from '../../apis/ArticlesApi'

import { ArticleTitleLikes } from './ArticleTitleLikes'
import { ProfileContent } from './ProfileContent'
import { Buttons } from './Buttons'
import { FullText } from './FullText'
import { TagsContainer } from './Tags'
import { ArticleDescText } from './DescriptionText'
import { ArticleContainer, ArticleHeaderContainer } from './styles'

export function ArticleItem ({
  description, body, author, createdAt, tagList, favorited, slug, title, favoritesCount
}:ArticleFace):React.ReactElement {
  const [newClass, setClass] = useState(favorited)
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const handleClick = () => {
    if (newClass) {
      delArticleBySlug(slug)
    } else {
      favorArticleBySlug(slug)
    }
    setClass(!newClass)
  }
  return (
    <>
      <ArticleContainer>
        <ArticleHeaderContainer>
          <ArticleTitleLikes slug={slug} title={title} favorited={favorited} favoritesCount={favoritesCount} newClass={newClass} onClickHandle={() => handleClick()} />
          <ProfileContent username={author.username} date={createdAt} avatar={author.image} />
        </ArticleHeaderContainer>
        <TagsContainer tagList={tagList} />
        <ArticleDescText description={description} />
        { articlesState.length === 1 && (localStorage.getItem('username') === author.username)
          && <Buttons slug={slug} /> }
      </ArticleContainer>
      { articlesState.length === 1 && <FullText text={body} />}
    </>
  )
}
