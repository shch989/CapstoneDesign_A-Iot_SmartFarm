import React from 'react'
import styled from 'styled-components'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Text = styled.h1`
  font-size: 3rem;
  color: #008080;
  text-align: center;
`

const FeedBackPage = () => {
  return (
    <Container>
      <Text>Comming Soon...</Text>
    </Container>
  )
}

export default FeedBackPage
