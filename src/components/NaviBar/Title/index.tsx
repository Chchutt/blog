import { Link } from 'react-router-dom'

import { Props } from './interfaces'
import { TitleText } from './styles'

export const Title = (props:Props) => {
  const { text, link } = props
  return (
    <Link to={link}>
      <TitleText>{text}</TitleText>
    </Link>
  )
}
