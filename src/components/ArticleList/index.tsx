import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Pagination, Spin } from 'antd'

import { ArticleItem } from '../ArticleItem'
import './index.scss'
import { SuperArticleState } from '../../redux/actions/actionCreators'
import { getArticleList } from '../../redux/actions/articleAction'

export function ArticleList() {
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const paginationState = useSelector((state: SuperArticleState) => state.articles.paginationValue)
  const [currentPage, setCurrentPage] = useState(paginationState)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(currentPage))
  }, [currentPage])
  return (
    <div className="articleList-container">
      {
        articlesState.map((item, index) => {
          const {
            description, body, author, createdAt,
            tagList, favorited, favoritesCount,
            slug, title, updatedAt
          } = item
          return (
            <ArticleItem
              index={index}
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
      }
      { articlesState.length > 1 && <Pagination
        defaultCurrent={1}
        total={742}
        onChange={(page) => setCurrentPage(page * 5)}
        style={{ marginBottom: '20px' }}
      /> }
      { articlesState.length === 0 && <Spin />}
    </div>
  )
}
