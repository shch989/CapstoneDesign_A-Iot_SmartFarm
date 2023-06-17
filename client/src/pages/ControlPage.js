import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
// Components
import MainBody from '../components/UI/MainBody'
import ControlButton from '../components/Control/ControlButton'

const Container = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 600px;
  background-color: #e0ffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add box shadow */
`;

const ControlTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 50px;
`

const ButtonWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ControlButtonSquare = styled(ControlButton)`
  width: 150px;
  height: 150px;
  margin: 20px;
`;

const ControlPage = () => {
  const [leftButtonPressed, setLeftButtonPressed] = useState(false)
  const [rightButtonPressed, setRightButtonPressed] = useState(false)

  const handleForwardButton = async () => {
    setRightButtonPressed(true)
    setLeftButtonPressed(false)
    try {
      await axios.get('http://localhost:8080/motor/forward')
      console.log('작동 중')
    } catch (error) {
      console.log('에러', error)
    }
  }

  const handleBackwardButton = async () => {
    setLeftButtonPressed(true)
    setRightButtonPressed(false)
    try {
      await axios.get('http://localhost:8080/motor/backward')
      console.log('작동 중')
    } catch (error) {
      console.log('에러', error)
    }
  }

  const handleStopButton = async () => {
    setLeftButtonPressed(false)
    setRightButtonPressed(false)
    try {
      await axios.get('http://localhost:8080/motor/stop')
      console.log('작동 중')
    } catch (error) {
      console.log('에러', error)
    }
  }

  return (
    <MainBody>
      <Container>
        <ControlTitle>천장 컨트롤러</ControlTitle>
        <ButtonWrapper>
          <ControlButtonSquare
            label="왼쪽"
            onPress={handleBackwardButton}
            onRelease={handleStopButton}
            buttonPressed={leftButtonPressed}
          />
          <ControlButtonSquare
            label="오른쪽"
            onPress={handleForwardButton}
            onRelease={handleStopButton}
            buttonPressed={rightButtonPressed}
          />
        </ButtonWrapper>
      </Container>
    </MainBody>
  )
}

export default ControlPage