import React from 'react'
import { Link } from 'react-router-dom'

import { Props } from './interfaces'
import {
  Username, AvatarContainer, Avatar, Container
} from './styles'

export const ProfileInfo = (props:Props) => {
  const { avatar, username } = props
  return (
    <Link to="edit-profile">
      <Container>
        <Username>{username}</Username>
        <AvatarContainer>
          <Avatar src={avatar} alt="" />
        </AvatarContainer>
      </Container>
    </Link>
  )
}
