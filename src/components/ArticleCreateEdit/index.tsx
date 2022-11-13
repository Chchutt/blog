import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import './index.scss'
import {
  articlePost,
  getCurrentArticle,
  updatePost,
} from '../../redux/actions/articleAction'
import { ArticleFace, Profile } from '../../redux/actions/actionCreators'

interface Props{
    flag: boolean
}
export const ArticleCreateEdit = (props: Props) => {
  const { flag } = props
  const isLoginState = useSelector((state: Profile) => state.profile.isLogin)
  const [data, setData] = useState<ArticleFace>()
  const [tags, setTags] = useState<string[] | undefined>([])
  const [newTag, setNewTag] = useState<string[]>()
  const [redirect, setRedirect] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { id } = useParams<string>()
  const { register, handleSubmit } = useForm<any>({ mode: 'all' })
  const newArticle = (data:{title: string, shortDescription: string, text: string, tags: string}) => {
    dispatch(articlePost(data.title, data.shortDescription, data.text, tags))
    setRedirect(true)
    setTimeout(() => setRedirect(false), 1000)
  }
  const updateArticle = ((data:{title: string, shortDescription: string, text: string}) => {
    dispatch(updatePost(id, data.title, data.shortDescription, data.text, tags))
    setRedirect(true)
    setTimeout(() => setRedirect(false), 1000)
  })

  useEffect(() => {
    if (!flag) {
      getCurrentArticle(id).then((data) => {
        setData(data.article)
        setTags(data.article.tagList)
      })
    }
  }, [])

  if (redirect) {
    return <Navigate to="/articles" />
  }
  if (!isLoginState) {
    return <Navigate to="/articles" />
  }
  return (
    <section className="createEdit-container">
      <h1 className="createEdit-container-h1">{flag ? 'Create new article' : 'Edit article'}</h1>
      <div className="createEdit-inputs-container">
        <form onSubmit={flag ? handleSubmit(newArticle) : handleSubmit(updateArticle)}>
          <p className="createEdit-title">Title</p>
          <input
            value={data ? data.title : undefined}
            className="createEdit-input title"
            type="text"
            placeholder="Title"
            {...register('title', {
              onChange: (data ? (e) => setData(e.target.value) : undefined),
              required: (data ? false : 'Title is required')
            })}
          />
          <p className="createEdit-shortDescription">Short description</p>
          <input
            value={data ? data.description : undefined}
            className="createEdit-input shortDescription"
            type="text"
            placeholder="Short description"
            {...register('shortDescription', {
              onChange: (data ? (e) => setData(e.target.value) : undefined),
              required: (data ? false : 'Short description is required')
            })}
          />
          <p className="createEdit-text">Text</p>
          <textarea
            value={data ? data.body : undefined}
            className="createEdit-input text"
            placeholder="text"
            style={{ resize: 'none', height: '168px' }}
            {...register('text', {
              onChange: (data ? (e) => setData(e.target.value) : undefined),
              required: (data ? false : 'Text is required')
            })}
          />
          <div className="createEdit-tags-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="createEdit-tags">Tags</p>
            { tags && tags.map((item, index) => {
              return (
                <div className="income-tags" key={index}>
                  <input
                    className="createEdit-input tags"
                    readOnly
                    type="text"
                    placeholder={item}
                    style={{ width: '300px' }}
                    {...register('tags')}
                  />
                  <input
                    className="createEdit-button remove"
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      setTags((tags) => tags.filter((tag) => tag !== item))
                    }}
                    type="button"
                    value="Delete"
                  />
                </div>
              )
            })}
            <div className="new-tags">
              <input
                className="createEdit-input tags"
                type="text"
                placeholder="Tags"
                value={newTag}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={(e) => setNewTag(e.target.value)}
                style={{ width: '300px' }}
              />
              <input
                className="createEdit-button add"
                type="button"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setTags([...tags, newTag])
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  setNewTag('')
                }}
                value="Add tags"
              />
              <input
                className="createEdit-button remove"
                type="button"
                value="Delete"
              />
            </div>
            <input
              type="Submit"
              style={{
                marginTop: '10px',
                width: '319px',
                height: '40px',
                background: '#1890FF',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                fontSize: '16px',
              }}
              value="Send"
            />
          </div>
        </form>
      </div>
    </section>
  )
}

// вынести мапы за рендер
// Общие контейнеры менять на секшены
