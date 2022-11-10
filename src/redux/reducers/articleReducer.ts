import {
  ArticleActions, ArticleState, ProfileActions, ProfileActionTypes, ProfileState
} from '../actions/actionCreators'
import { ArticlesActionTypes } from '../actions/ArticlesActionTypes'

const articlePoolState = {
  articles: [],
  loadingArticles: false,
  error: null,
  paginationValue: 0,
}
const profileState = {
  registration: false,
  isLogin: true,
  error: null,
}

export const articleReducer = (
  state: ArticleState = articlePoolState,

  action: ArticleActions
): ArticleState => {
  switch (action.type) {
  case ArticlesActionTypes.FETCH_ARTICLE_START:
    return {
      ...state,
      loadingArticles: true,
    }
  case ArticlesActionTypes.FETCH_ARTICLE_SUCCESS:
    return {
      ...state,
      loadingArticles: false,
      articles: [...action.payload],
    }
  case ArticlesActionTypes.FETCH_ARTICLE_ERROR:
    return {
      ...state,
      error: action.payload,
    }
  case ArticlesActionTypes.PAGINATION_MULTI:
    return {
      ...state,
      paginationValue: state.paginationValue + 5
    }
  case ArticlesActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS:
    return {
      ...state,
      articles: [action.payload]
    }
  default:
    return {
      ...state,
    }
  }
}

export const profileReducer = (
  state: ProfileState = profileState,
  action: ProfileActions
): ProfileState => {
  switch (action.type) {
  case ProfileActionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      isLogin: true,
    }
  case ProfileActionTypes.REGISTRATION_SUCCESS:
    return {
      ...state,
      registration: !state.registration
    }
  case ProfileActionTypes.LOG_OUT:
    return {
      ...state,
      isLogin: false,
    }
  case ProfileActionTypes.PROFILE_EDITED:
    return {
      ...state
    }

  case ProfileActionTypes.ARTICLE_POST_SUCCESS:
    return {
      ...state,
    }
  case ProfileActionTypes.ARTICLE_UPDATE_SUCCESS:
    return {
      ...state,
    }
  default:
    return {
      ...state
    }
  }
}
