import { ArticleList } from '../components/ArticleList'

export const HomePage = () => {
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
      <ArticleList />
    </div>
  )
}
