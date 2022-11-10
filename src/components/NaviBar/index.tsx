import './index.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from '../../redux/actions/actionCreators'
import { logOut } from '../../redux/actions/articleAction'

export function NaviBar() {
  const profileState = useSelector((state: Profile) => state.profile)
  const { isLogin } = profileState
  const dispatch = useDispatch()
  const noLogin = () => {
    return (
      <nav className="navigation-container">
        <Link to="/articles"> <p>Realworld Blog</p></Link>
        <div className="navigation_buttons-container">
          <Link to="sing-in">
            <button type="button" className="navigation_button singIn">
                Sing In
            </button>
          </Link>
          <Link to="sing-up">
            <button type="button" className="navigation_button singUp">
                Sing Up
            </button>
          </Link>
        </div>
      </nav>
    )
  }
  const yesLogin = () => {
    return (
      <nav className="navigation-container">
        <Link to="/articles"> <p style={{ margin: 0 }}>Realworld Blog</p></Link>
        <div
          className="navigation_buttons-container"
          style={{
            width: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link to="/articles/new-article">
            <button type="button" className="navigation_button newArticle">
                Create article
            </button>
          </Link>
          <Link to="edit-profile" style={{ display: 'flex' }}>
            <p
              className="article-profile-name"
              style={{
                fontSize: '18px', color: '#000000D9', margin: '0 13px 0 0', alignSelf: 'center'
              }}
            >{localStorage.getItem('username')}</p>
            <div
              className="article-profile-avatar-container"
              style={{
                height: '46px',
                overflow: 'hidden',
                borderRadius: '100px',
              }}
            >
              <img
                className="article-profile-avatar"
                alt=""
                src={`${localStorage.getItem('avatarUrl')}`}
                style={{
                  width: 'auto',
                  height: '100%',
                }}
              />
            </div>
          </Link>
          <Link to="sing-up" className="logOut">
            <input type="button" value="Log Out" className="navigation_button logOut" style={{ border: 'none' }} onClick={() => dispatch(logOut())} />
          </Link>
        </div>
      </nav>
    )
  }
  return isLogin ? yesLogin() : noLogin()
}
