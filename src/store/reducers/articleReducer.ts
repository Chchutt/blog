import { ArticleActions } from '../actions/actionCreators'
import { ArticlesActionTypes } from '../actions/ArticlesActionTypes'
import { ArticleState } from '../../components/interfaces'

const initialState = {
  articles: [],
  loadingArticles: false,
  error: null,
  paginationValue: 0,
}

export const articleReducer = (
  state: ArticleState = initialState,

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
