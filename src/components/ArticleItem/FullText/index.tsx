import { Props } from './interfaces'
import { FullTextContainer, FullTextP } from './styles'

export const FullText = (props:Props) => {
  const { text } = props
  return (
    <FullTextContainer>
      <FullTextP>{text}</FullTextP>
    </FullTextContainer>
  )
}
