import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
// Common
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
// Page
import NotLogin from '../../pages/NotLogin'

const Container = styled.main`
  max-width: 2000px;
  min-height: 100vh;
  height: 100%;
  margin: 0 auto;
  padding: 0 5%;
  margin-top: 80px;
  width: 100%;
`

const Layout = (props) => {
  const { pathname } = useLocation()
  const token = localStorage.getItem('token')

  if (pathname === '/login' || pathname === '/register') {
    return <main>{props.children}</main>
  }

  if (
    pathname === '/graph' ||
    pathname === '/control' ||
    pathname === '/cctv'
  ) {
    return (
      <Fragment>
        <Navbar />
        { true ? <Container>{props.children}</Container> : <NotLogin />}
        <Footer />
      </Fragment>
    )
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
