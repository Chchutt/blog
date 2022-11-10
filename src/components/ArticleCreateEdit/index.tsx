import './index.scss'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  articlePost, getCurrentArticle, updatePost
} from '../../redux/actions/articleAction'
import { ArticleFace } from '../../redux/actions/actionCreators'

interface Props{
    flag: boolean
}
export const ArticleCreateEdit = (props: Props) => {
  const { flag } = props
  const [data, setData] = useState<ArticleFace>()
  const [tags, setTags] = useState<string[] | undefined>()
  const [newTag, setNewTag] = useState<string[]>()
  const dispatch = useDispatch()
  const { id } = useParams<string>()
  const { register, handleSubmit } = useForm<any>({ mode: 'all' })
  const newArticle = (data:{title: string, shortDescription: string, text: string, tags: string}) => dispatch(articlePost(data.title, data.shortDescription, data.text, tags))
  const updateArticle = ((data:{title: string, shortDescription: string, text: string}) => dispatch(updatePost(id, data.title, data.shortDescription, data.text, tags)))
  if (!flag) {
    useEffect(() => {
      getCurrentArticle(id).then((data) => {
        setData(data.article)
        setTags(data.article.tagList)
      })
    }, [])
  }
  return (
    <div className="createEdit-container">
      {flag ? <h1 className="createEdit-container-h1">Create new article</h1> : <h1 className="createEdit-container-h1">Edit article </h1>}
      <div className="createEdit-inputs-container">
        <form onSubmit={flag ? handleSubmit(newArticle) : handleSubmit(updateArticle)}>
          <p className="createEdit-title">Title</p>
          { data ? <input
            value={data.title}
            className="createEdit-input title"
            type="text"
            placeholder="Title"
            {...register('title', {
              onChange: ((e) => setData(e.target.value)),
              required: 'Title is required',
            })}
          /> : <input
            className="createEdit-input title"
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />}
          <p className="createEdit-shortDescription">Short description</p>
          {data ? <input
            value={data.description}
            className="createEdit-input shortDescription"
            type="text"
            placeholder="Short description"
            {...register('shortDescription', {
              onChange: ((e) => setData(e.target.value)),
              required: 'Short description is required',
            })}
          /> : <input
            className="createEdit-input shortDescription"
            type="text"
            placeholder="Short description"
            {...register('shortDescription', {
              required: 'Short description is required',
            })}
          />}
          <p className="createEdit-text">Text</p>
          {data ? <textarea
            value={data.body}
            className="createEdit-input text"
            placeholder="text"
            style={{ resize: 'none', height: '168px' }}
            {...register('text', {
              onChange: ((e) => setData(e.target.value)),
              required: 'Text is required',
            })}
          /> : <textarea
            className="createEdit-input text"
            placeholder="Text"
            style={{ resize: 'none', height: '168px' }}
            {...register('text', {
              required: 'Text is required',
            })}
          />}
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
    </div>
  )
}
