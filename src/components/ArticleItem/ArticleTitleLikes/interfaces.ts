export interface Props{
    slug: string,
    favorited: boolean,
    title: string,
    favoritesCount: number,
    newClass: boolean,
    onClickHandle: () => void,
}
