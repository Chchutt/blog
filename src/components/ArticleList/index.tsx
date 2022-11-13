import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Pagination, Spin } from 'antd'

import { ArticleItem } from '../ArticleItem'
import './index.scss'
import { getArticleList } from '../../store/actions/articleAction'
import { SuperArticleState } from '../interfaces'

import { ArticlesContainer } from './styles'

export function ArticleList() {
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const paginationState = useSelector((state: SuperArticleState) => state.articles.paginationValue)
  const [currentPage, setCurrentPage] = useState(paginationState)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(currentPage))
  }, [currentPage])
  const elements = articlesState.map((item, index) => {
    const {
      description, body, author, createdAt,
      tagList, favorited, favoritesCount,
      slug, title, updatedAt
    } = item
    return (
      <ArticleItem
        key={index}
        updatedAt={updatedAt}
        title={title}
        slug={slug}
        favoritesCount={favoritesCount}
        favorited={favorited}
        tagList={tagList}
        description={description}
        body={body}
        author={author}
        createdAt={createdAt}
      />
    )
  })
  return (
    <ArticlesContainer>
      { articlesState.length === 0 && <Spin />}
      {elements}
      { articlesState.length > 1 && <Pagination
        defaultCurrent={1}
        total={742}
        onChange={(page) => setCurrentPage(page * 5)}
        style={{ marginBottom: '20px' }}
      /> }
    </ArticlesContainer>
  )
}
