import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { dateTool, desLenCheck } from '../../tools/dateTool'
import { ArticleFace, SuperArticleState } from '../../redux/actions/actionCreators'
import { delCurrentArticle, getArticleList } from '../../redux/actions/articleAction'
import { delArticleBySlug, favorArticleBySlug } from '../../apis/ArticlesApi'

export function ArticleItem ({
  description, body, author, createdAt, tagList, favorited, slug, title, favoritesCount
}:ArticleFace) {
  const [newClass, setClass] = useState(favorited)
  const articlesState = useSelector((state:SuperArticleState) => state.articles.articles)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticleList(0, id))
  }, [id])
  return (
    <>
      <div className="article-container">
        <div
          className="test-container"
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'
          }}
        >
          <div className="article-title">
            <div>
              <Link to={`/articles/${slug}`}>
                <p>{desLenCheck(title, 35)}</p>
              </Link>
              {
                tagList.map((item:string, index) => {
                  if (item) {
                    return (
                      <input
                        key={index}
                        className="article-tag"
                        type="button"
                        value={item}
                      />
                    )
                  }
                  return null
                })
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', paddingTop: '10px' }}>
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
              <div
                className={`${newClass ? 'active' : 'disable'}`}
                onClick={() => {
                  if (newClass) {
                    delArticleBySlug(slug)
                  } else {
                    favorArticleBySlug(slug)
                  }
                  setClass(!newClass)
                }}
                style={{ marginRight: '5px' }}
              />
              <p style={{ color: '#000000BF', fontSize: '12px' }}>{newClass ? (favoritesCount + 1) : favoritesCount }</p></div>
          </div>

          <div className="article-profile-content">
            <div>
              <p className="article-profile-name" style={{ fontSize: '18px', color: '#000000D9' }}>{author.username}</p>
              <p className="article-profile-date" style={{ fontSize: '12px', color: '#00000080' }}>{dateTool(createdAt)}</p>
            </div>
            <div
              className="article-profile-avatar-container"
              style={{
                height: '46px',
                overflow: 'hidden',
                borderRadius: '100px',
              }}
            >
              <img
                className="article-profile-avatar"
                alt=""
                src={author.image}
                style={{
                  width: 'auto',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
        <div className="article-post-text">
          {desLenCheck(description, 135)}
        </div>
        { articlesState.length === 1 && (localStorage.getItem('username') === author.username)
          ? (<div className="article-profile-buttons" style={{ position: 'absolute', right: '9px', top: '85px' }}>
            <Link to="/"><button
              onClick={() => delCurrentArticle(slug)}
              type="button"
              style={{
                width: '78px',
                height: '31px',
                color: '#F5222D',
                background: 'none',
                border: '1px solid #F5222D',
                borderRadius: '5px',
                textAlign: 'center',
                marginRight: '12px',
                fontSize: '14px'
              }}
            >Delete
            </button>
            </Link>
            <Link to={`/articles/${slug}/edit-page`}><button
              type="button"
              style={{
                width: '65px',
                height: '31px',
                color: '#52C41A',
                background: 'none',
                border: '1px solid #52C41A',
                borderRadius: '5px',
                textAlign: 'center',
                marginRight: '12px',
                fontSize: '14px'
              }}
            >Edit
            </button></Link>
          </div>) : null}
      </div>
      { articlesState.length === 1
        ? <div
          className="article-post-text"
          style={{
            background: 'white',
            width: '941px',
            height: '600px',
            borderRadius: '5px',
            boxShadow: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '2',
            position: 'absolute',
            top: '230px',
          }}
        >
          <p style={{
            marginLeft: '17px',
            marginRight: '17px',
          }}
          >{body}</p>
        </div> : null }
    </>
  )
}
