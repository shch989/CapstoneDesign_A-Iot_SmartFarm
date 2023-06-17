import React from 'react'
import styled from 'styled-components'
// Components
import MainBody from './MainBody'

const Text = styled.h1`
  margin-top: 20%;
  font-size: 3rem;
  color: #008080;
  text-align: center;
`

const MainText = (props) => {
  return (
    <MainBody>
      <Text>{props.children}</Text>
    </MainBody>
  )
}

export default MainText
