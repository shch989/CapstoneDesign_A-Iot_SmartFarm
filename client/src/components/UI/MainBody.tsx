import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

interface MainBodyProps {
  children: ReactNode
}

const MainBody: React.FC<MainBodyProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default MainBody
