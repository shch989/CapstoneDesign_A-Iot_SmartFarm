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

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(name, email, password, location)
  }

  return (
    <Wrapper>
      <FormWrapper>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <Input
            label="이름"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            label="거주 지역"
            type="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="인천">인천</option>
            <option value="광주">광주</option>
            <option value="대전">대전</option>
            <option value="울산">울산</option>
            <option value="세종">세종</option>
            <option value="경기">경기</option>
            <option value="강원">강원</option>
            <option value="충북">충북</option>
            <option value="충남">충남</option>
            <option value="전북">전북</option>
            <option value="전남">전남</option>
            <option value="경북">경북</option>
            <option value="경남">경남</option>
            <option value="제주">제주</option>
          </Input>
          <Button type="submit">가입하기</Button>
          <Text>
            계정이 있으시다면 <Link to="/login">로그인</Link>
          </Text>
        </form>
      </FormWrapper>
    </Wrapper>
  )
}

export default RegisterPage
