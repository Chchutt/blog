import { useDispatch, useSelector } from 'react-redux'

import './index.scss'
import { Profile } from '../interfaces'
import { logOut } from '../../store/actions/articleAction'

import { BtnContainer, Container } from './styles'
import { Title } from './Title'
import { Button } from './Buttons'
import { ProfileInfo } from './ProfileInfo'

export function NaviBar() {
  const profileState = useSelector((state: Profile) => state.profile)
  const { isLogin } = profileState
  const dispatch = useDispatch()
  return (
    <Container>
      <Title text="Realworld Blog" link="/articles" />
      {isLogin
        ? <BtnContainer jc="space-between">
          <Button create link="/articles/new-article" />
          <ProfileInfo username={localStorage.getItem('username')} avatar={localStorage.getItem('avatarUrl')} />
          <Button logout link="/" onClick={() => dispatch(logOut())} />
        </BtnContainer>
        : <BtnContainer jc="flex-end">
          <Button singIn link="/sing-in" />
          <Button singUp link="/sing-up" />
        </BtnContainer> }
    </Container>
  )
}
