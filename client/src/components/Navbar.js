import React from 'react'
import styled from 'styled-components'
import logo from '../public/logo.png'

const Container = styled.nav`
`

const MainNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 70%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`

const Logo = styled.a`
  .main_logo {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
`

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;
`

const MenuItem = styled.li`
  margin-left: 1rem;

  a {
    display: inline-block;
    padding: 0, 0.5rem, 0.5rem, 0.5rem;
    font-size: 25px;
    font-weight: 600;
    color: #A2A2A2;
    text-decoration: none;
    transition: all 0.2s;
  }
`

function Navbar() {
  return (
    <Container>
      <MainNav>
        <Logo href="/">
          <img src={logo} alt="logo" className="main_logo" />
        </Logo>
        <Menu>
          <MenuItem>
            <a href="/">Home</a>
          </MenuItem>
          <MenuItem>
            <a href="/about">About</a>
          </MenuItem>
          <MenuItem>
            <a href="/services">Services</a>
          </MenuItem>
          <MenuItem>
            <a href="/blog">Blog</a>
          </MenuItem>
          <MenuItem>
            <a href="/contact">Contact</a>
          </MenuItem>
        </Menu>
      </MainNav>
    </Container>
  )
}

export default Navbar
