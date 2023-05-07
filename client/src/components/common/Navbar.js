import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FiLogOut } from 'react-icons/fi'
import logo from '../../public/logo.png'

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  height: 80px;
  padding: 5px 0;
`

const MainNav = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  width: 90%;
  margin: 0 auto;
`

const Logo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  .main_logo {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    transition: all 0.2s;
  }
`

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  margin-right: auto;
`

const MenuItem = styled.li`
  margin-left: 1rem;
  a {
    display: inline-block;
    padding: 0.5rem;
    font-size: 25px;
    font-weight: 600;
    color: ${({ isActive }) => isActive ? '#000' : '#a2a2a2'};
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      color: #000;
    }
  }
`;

const User = styled.div`
  margin-left: auto;
  display: flex;
`

const UserProfile = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #a2a2a2;
  text-decoration: none;
  transition: all 0.2s;
`

const Logout = styled.a`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a2a2a2;
  text-decoration: none;
  transition: all 0.2s;
  font-weight: 600;

  &:hover {
    color: #000;
  }
  svg {
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
  }
`

function Navbar() {
  const { pathname } = useLocation()

  return (
    <Container>
      <MainNav>
        <Logo href="/">
          <img src={logo} alt="logo" className="main_logo" />
        </Logo>
        <Menu>
          <MenuItem isActive={pathname === '/'}>
            <a href="/">Home</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/graph'}>
            <a href="/graph">Graph</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/control'}>
            <a href="/control">Control</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/cctv'}>
            <a href="/cctv">CCTV</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/feedback'}>
            <a href="/feedback">FeedBack</a>
          </MenuItem>
        </Menu>
        <User>
          <UserProfile>Welcome 유저(님)</UserProfile>
          <Logout href="/login">
            LogOut
            <FiLogOut />
          </Logout>
        </User>
      </MainNav>
    </Container>
  )
}

export default Navbar
