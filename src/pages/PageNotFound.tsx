import './index.scss'
import { Link } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import penis from '../media/penis-8348.svg'

export const PageNotFound = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '60px', color: 'pink' }}>Страница не найдена</h1>
      <Link to="/articles"> <img className="rotate-center" src={penis} alt="" style={{ height: '500px', position: 'absolute', left: '302px' }} /></Link>
    </>
  )
}
