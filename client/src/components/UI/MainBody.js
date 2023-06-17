import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 100vh;
`

const MainBody = (props) => {
  return <Container>{props.children}</Container>
}

export default MainBody
