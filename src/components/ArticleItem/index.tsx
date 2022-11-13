import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.scss'
import styled from 'styled-components'

import { ArticleFace, SuperArticleState } from '../../redux/actions/actionCreators'
import { getArticleList } from '../../redux/actions/articleAction'
import { delArticleBySlug, favorArticleBySlug } from '../../apis/ArticlesApi'

import { ArticleTitleLikes } from './ArticleTitleLikes'
import { ProfileContent } from './ProfileContent'
import { Buttons } from './Buttons'
import { FullText } from './FullText'
import { TagsContainer } from './Tags'
import { ArticleDescText } from './DescriptionText'

const ArticleHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const ArticleContainer = styled.section`
  position: relative;
  width: 941px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 14px 0 14px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

export function ArticleItem ({
  description, body, author, createdAt, tagList, favorited, slug, title, favoritesCount, index
}:ArticleFace) {
  const [newClass, setClass] = useState(favorited)
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const { id } = useParams()
  const handleClick = () => {
    if (newClass) {
      delArticleBySlug(slug)
    } else {
      favorArticleBySlug(slug)
    }
    setClass(!newClass)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(0, id))
  }, [id])
  return (
    <>
      <ArticleContainer key={index}>
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
