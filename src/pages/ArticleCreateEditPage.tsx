import { ArticleCreateEdit } from '../components/ArticleCreateEdit'
import { ArticleList } from '../components/ArticleList'

interface Props{
    flag: boolean
}

export const ArticleCreateEditPage = (props:Props) => {
  const { flag } = props
  return (
    <div
      className="content-container"
      style={{
        width: '100%',
        minHeight: '890px',
        background: '#EBEEF3',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <ArticleCreateEdit flag={flag} />
    </div>
  )
}
