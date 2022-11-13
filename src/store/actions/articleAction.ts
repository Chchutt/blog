import { Dispatch } from 'redux'

import {
  articlesApi,
  deleteArticleBySlug,
  editProfileInfo,
  getArticleBySlug,
  loginApi,
  postArticle,
  putArticleBySlug,
  registerApi
} from '../../apis/ArticlesApi'

import {
  ArticleActions, ProfileActions, ProfileActionTypes
} from './actionCreators'
import { ArticlesActionTypes } from './ArticlesActionTypes'

export function fetchArticleStart() {
  return {
    type: ArticlesActionTypes.FETCH_ARTICLE_START,
  }
}

export function paginationMulti() {
  return {
    type: ArticlesActionTypes.PAGINATION_MULTI
  }
}

export function fetchArticleSuccess(arr: any) {
  return {
    type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS,
    payload: arr,
  }
}
export function fetchArticleError() {
  return {
    type: ArticlesActionTypes.FETCH_ARTICLE_ERROR,
  }
}

export async function getCurrentArticle(slug: string | undefined) {
  return getArticleBySlug(slug)
}
export async function delCurrentArticle(slug: string) {
  return deleteArticleBySlug(slug)
}

export function getArticleList(value: number, slug = '0'): any {
  if (slug !== '0') {
    return async (dispatch: Dispatch<ArticleActions>) => {
      dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_START })
      try {
        const res = await getArticleBySlug(slug)
        const { article } = res
        dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS, payload: article })
      } catch (e) {
        dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_ERROR, payload: null })
      }
    }
  }
  return async (dispatch: Dispatch<ArticleActions>) => {
    dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_START })
    try {
      const res = await articlesApi(value)
      const { articles } = res
      dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS, payload: articles })
    } catch (e) {
      dispatch({ type: ArticlesActionTypes.FETCH_ARTICLE_ERROR, payload: null })
    }
  }
}

export function loginProfile(emailId: string, password: string): any {
  return async (dispatch: Dispatch<ProfileActions>) => {
    try {
      const res = await loginApi(emailId, password)
      const {
        email, username, token, image
      } = res.data.user
      await localStorage.setItem('username', `${username}`)
      await localStorage.setItem('email', `${email}`)
      await localStorage.setItem('token', `${token}`)
      await localStorage.setItem('avatarUrl', `${image}`)
      dispatch({ type: ProfileActionTypes.LOGIN_SUCCESS })
    } catch (e) {
      dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: null })
    }
  }
}

export function registrationProfile(username: string, email: string, password: string): any {
  return async (dispatch: Dispatch<ProfileActions>) => {
    try {
      const reg = await registerApi(username, email, password)
      reg.status === 200 && dispatch({ type: ProfileActionTypes.REGISTRATION_SUCCESS })
      localStorage.setItem('avatarUrl', 'https://api.realworld.io/images/smiley-cyrus.jpeg')
      setTimeout(() => {
        dispatch({ type: ProfileActionTypes.REGISTRATION_SUCCESS })
      }, 1000)
    } catch (e) {
      dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: null })
    }
  }
}

export function logOut () {
  localStorage.clear()
  return { type: ProfileActionTypes.LOG_OUT }
}

export function profileEdited(username: string, img: string, email: string, password: string): any {
  return async (dispatch: Dispatch<ProfileActions>) => {
    try {
      const res = await editProfileInfo(username, img, email, password)
      if (res.status === 200) {
        localStorage.setItem('username', username)
        localStorage.setItem('avatarUrl', img)
        dispatch({ type: ProfileActionTypes.PROFILE_EDITED })
      }
    } catch (e) {
      dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: null })
    }
  }
}

export function articlePost(title: string, description: string, body: string, tagList: string[] | undefined): any {
  return async (dispatch: Dispatch<ProfileActions>) => {
    try {
      const res = await postArticle(title, description, body, tagList)
      dispatch({ type: ProfileActionTypes.ARTICLE_POST_SUCCESS, payload: res.data.article.slug })
    } catch (e) {
      dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: null })
    }
  }
}

export function updatePost(slug: string | undefined, title: string, description: string, body: string, tagList: string[] | undefined):any {
  return async (dispatch: Dispatch<ProfileActions>) => {
    try {
      await putArticleBySlug(slug, title, description, body, tagList)
      dispatch({ type: ProfileActionTypes.ARTICLE_UPDATE_SUCCESS })
    } catch (e) {
      dispatch({ type: ProfileActionTypes.PROFILE_ERROR, payload: null })
    }
  }
}
