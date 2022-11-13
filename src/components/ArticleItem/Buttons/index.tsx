import { Link } from 'react-router-dom'

import { delCurrentArticle } from '../../../store/actions/articleAction'

import { Props } from './interfaces'
import { Button, ButtonsContainer } from './styles'

export const Buttons = (props: Props) => {
  const { slug } = props
  return (
    <ButtonsContainer>
      <Link to="/">
        <Button bg="#F5222D" type="button" onClick={() => delCurrentArticle(slug)}>Delete</Button>
      </Link>
      <Link to={`/articles/${slug}/edit-page`}>
        <Button bg="#52C41A" type="button">Edit</Button>
      </Link>
    </ButtonsContainer>)
}
