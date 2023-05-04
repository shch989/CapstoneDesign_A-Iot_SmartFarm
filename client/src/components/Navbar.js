import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #008080;
  color: #fff;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
`;

const MenuItem = styled.li`
  margin-left: 1.5rem;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: #008000;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: all 0.2s;

    &:hover {
      background-color: #008000;
      color: #fff;
    }
  }
`;

function Navbar() {
  return (
    <Container>
      <Logo href="/">My Website</Logo>
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
    </Container>
  );
}

export default Navbar;