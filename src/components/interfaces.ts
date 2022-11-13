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
