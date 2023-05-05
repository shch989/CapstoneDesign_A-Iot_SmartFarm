import React from 'react'
import styled from 'styled-components'


const Container = styled.footer`
  padding: 1rem;
  background-color: #e0ffff;
`
const MainFooter = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #e0ffff;

  color: #fff;
`

const Footer = () => {
  return (
    <Container>
      <MainFooter>
        gdgd
      </MainFooter>
    </Container>
  )
}

export default Footer
