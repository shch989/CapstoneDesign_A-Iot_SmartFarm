import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.h1`
  font-size: 3rem;
  color: #008080;
  text-align: center;
`;

const NotLogin = () => {
  return (
    <Container>
      <Text>로그인 후 사용할 수 있는 페이지 입니다.</Text>
    </Container>
  )
}

export default NotLogin
