import React from 'react';
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

function NotFoundPage() {
  return (
    <Container>
      <Text>404 - 페이지를 찾을 수 없습니다.</Text>
    </Container>
  );
}

export default NotFoundPage;