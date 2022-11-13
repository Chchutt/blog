import { formatDate } from '../../../tools/formatDate'

import { Props } from './interfaces'
import {
  ArticleProfileAvatar,
  ArticleProfileAvatarContainer,
  ArticleProfileContent,
  ArticleProfileDate,
  ArticleProfileName,
  Container
} from './styles'

export const ProfileContent = (props:Props) => {
  const { username, date, avatar } = props
  return (
    <ArticleProfileContent>
      <Container>
        <ArticleProfileName>{username}</ArticleProfileName>
        <ArticleProfileDate>{formatDate(date)}</ArticleProfileDate>
      </Container>
      <ArticleProfileAvatarContainer>
        <ArticleProfileAvatar alt="" src={avatar} />
      </ArticleProfileAvatarContainer>
    </ArticleProfileContent>
  )
}
