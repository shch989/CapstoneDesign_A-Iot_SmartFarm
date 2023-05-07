import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 25px;
`

const GraphBox = styled.div`
  width: calc(33.33% - 20px);
  height: 350px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0ffff;
`

const FullWidthGraphBox = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0ffff;
`

const GraphPage = () => {
  return (
    <Container>
      <Row>
        <GraphBox></GraphBox>
        <GraphBox></GraphBox>
        <GraphBox></GraphBox>
      </Row>
      <Row>
        <FullWidthGraphBox />
      </Row>
    </Container>
  )
}

export default GraphPage
