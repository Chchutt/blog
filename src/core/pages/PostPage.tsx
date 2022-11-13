import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Spin } from 'antd'

import { getArticleList } from '../../store/actions/articleAction'
import { ArticleItem } from '../../components/ArticleItem'
import { SuperArticleState } from '../../components/interfaces'

export const PostPage = () => {
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(0, id))
  }, [])
  if (articlesState.length === 1) {
    const {
      description, body, author, createdAt,
      tagList, favorited, favoritesCount,
      slug, title, updatedAt
    } = articlesState[0]
    return (
      <ArticleItem
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
  }
  return (
    <Spin style={{ width: '100%' }} />
  )
}
