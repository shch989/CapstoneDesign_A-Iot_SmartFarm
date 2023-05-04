import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  background-color: #008080;
  color: #fff;
  padding: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <Container>
      <Content>
        <Item>
          <Link href="https://github.com/your-github-account">Github</Link>
        </Item>
        <Item>
          Your University
        </Item>
        <Item>
          Your Team
        </Item>
      </Content>
    </Container>
  );
}

export default Footer;
