import React, { Fragment } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.main`
  padding: 0 5%;
  margin-top: 100px;
  min-height: 100vh;
`

const Layout = (props) => {
  // 현재 경로를 가져오기 위해 useLocation hook을 사용.
  const { pathname } = useLocation()

  // 로그인 페이지와 회원가입 페이지에는 Navbar와 Footer를 제외.
  if (pathname === '/login' || pathname === '/register') {
    return <main>{props.children}</main>
  }

  return (
    <Fragment>
      <Navbar />
      <Container>{props.children}</Container>
      <Footer />
    </Fragment>
  )
}

export default Layout
