import { Props } from './interfaces'
import { ArticleTagsContainer, Tags } from './styles'

export const TagsContainer = (props:Props) => {
  const { tagList } = props
  const element = tagList.map((item:string, index) => {
    if (item) {
      return (
        <Tags
          key={index}
          type="button"
          value={item}
        />
      )
    }
    return null
  })
  return (
    <ArticleTagsContainer>
      {element}
    </ArticleTagsContainer>
  )
}
