import { Outlet } from 'react-router-dom'

import { Header } from './Header'
import { MainContainer } from './App/styles'

export const Layout = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>

  )
}
