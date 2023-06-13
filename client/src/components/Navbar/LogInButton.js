import React from 'react'
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";

const Login = styled.a`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a2a2a2;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: #000;
  }
  svg {
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const LogInButton = () => {
  return (
    <Login href="/login">
      Login
      <FiLogIn />
    </Login>
  )
}

export default LogInButton
