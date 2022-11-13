import { ArticlesActionTypes } from './ArticlesActionTypes'

export enum ProfileActionTypes {
  LOGIN_SUCCESS='LOGIN_SUCCESS',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  PROFILE_ERROR = 'PROFILE_ERROR',
  LOG_OUT = 'LOG_OUT',
  PROFILE_EDITED = 'PROFILE_EDITED',
  ARTICLE_POST_SUCCESS = 'ARTICLE_POST_SUCCESS',
  ARTICLE_DELETE_SUCCESS = 'ARTICLE_DELETE_SUCCESS',
  ARTICLE_UPDATE_SUCCESS = 'ARTICLE_UPDATE_SUCCESS'
}
export interface SuperArticleState{
  articles: ArticleState
}
export interface ArticleState {
  articles: ArticleFace[];
  article?: ArticleFace[];
  loadingArticles: boolean;
  error: null | Error;
  paginationValue: number;
}
export interface ArticleFace{
  author: ArticleAuthor;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: [];
  title: string;
  updatedAt: string;
}
export interface ArticleAuthor{
  following: boolean;
  image: string;
  username: string;
}
export interface ProfileState {
  registration?: boolean,
  isLogin?: boolean,
}
export interface Profile {
  profile: ProfileState
}
export interface ArticleUpdateSuccess{
  type: ProfileActionTypes.ARTICLE_UPDATE_SUCCESS
}

export type ProfileActions = LoginApi | RegistrationApi | ProfileErrors | LogOut | ProfileEdited | ArticlePostSuccess | ArticleUpdateSuccess | ArticleDeleteSuccess;

export type ArticleActions = FetchArticlesError | FetchArticlesStart |
    FetchArticlesSuccess | PaginationMulti |
    FetchArticleBySlugSuccess;

export interface ProfileEdited {
  type: ProfileActionTypes.PROFILE_EDITED
}

export interface FetchArticleBySlugSuccess{
  type: ArticlesActionTypes.FETCH_ARTICLE_BY_SLUG_SUCCESS
  payload: ArticleFace;
}

export interface FetchArticlesStart {
  type: ArticlesActionTypes.FETCH_ARTICLE_START;
}
export interface FetchArticlesSuccess {
  type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS;
  payload: ArticleFace[];
}
export interface FetchArticlesError {
  type: ArticlesActionTypes.FETCH_ARTICLE_ERROR;
  payload: Error | null;
}

export interface PaginationMulti {
  type: ArticlesActionTypes.PAGINATION_MULTI
}

export interface LoginApi {
  type: ProfileActionTypes.LOGIN_SUCCESS
}

export interface RegistrationApi {
  type: ProfileActionTypes.REGISTRATION_SUCCESS
}
export interface ProfileErrors {
  type: ProfileActionTypes.PROFILE_ERROR;
  payload: Error | null;
}
export interface LogOut {
  type: ProfileActionTypes.LOG_OUT,
}
export interface ArticlePostSuccess{
  type: ProfileActionTypes.ARTICLE_POST_SUCCESS,
  payload: string[]
}
export interface ArticleDeleteSuccess{
  type: ProfileActionTypes.ARTICLE_DELETE_SUCCESS,
  payload: string[]
}
