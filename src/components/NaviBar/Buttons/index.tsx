import { Link } from 'react-router-dom'

import { Props } from './interfaces'
import {
  ButtonCreate, ButtonLogout, ButtonSingIn, ButtonSingUp
} from './styles'

export const Button = (props: Props) => {
  const {
    singIn, singUp, logout, create, link, onClick
  } = props
  switch (true) {
  case singIn:
    return (
      <Link to={link}>
        <ButtonSingIn onClick={onClick}>Sing In</ButtonSingIn>
      </Link>
    )
  case singUp:
    return (
      <Link to={link}>
        <ButtonSingUp onClick={onClick}>Sing Up</ButtonSingUp>
      </Link>
    )
  case logout:
    return (
      <Link to={link}>
        <ButtonLogout onClick={onClick}>Log Out</ButtonLogout>
      </Link>
    )
  case create:
    return (
      <Link to={link}>
        <ButtonCreate onClick={onClick}>Create article</ButtonCreate>
      </Link>
    )
  default:
    return null
  }
}
