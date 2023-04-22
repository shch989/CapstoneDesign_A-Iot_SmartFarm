import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/UI/Input'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c4df9b;
`

const FormWrapper = styled.div`
  flex: 2;
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`

const Title = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`

const Text = styled.span`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #333;

  &:hover {
    color: #4caf50;
  }
`

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }

  &:focus {
    outline: none;
  }
`

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(email, password)
  }

  return (
    <Wrapper>
      <FormWrapper>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">가입하기</Button>
          <Text>
            계정이 없으시다면 <Link to="/register">회원가입</Link>
          </Text>
        </form>
      </FormWrapper>
    </Wrapper>
  )
}

export default LoginPage
