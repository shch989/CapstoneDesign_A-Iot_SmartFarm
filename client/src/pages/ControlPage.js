import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ControlButton from "../components/Control/ControlButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
`;

const ControlPage = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleForwardButton = async () => {
    setButtonPressed(true);
    try {
      await axios.get("http://localhost:8080/motor/forward");
      console.log("작동 중");
    } catch (error) {
      console.log("에러", error);
    }
  };

  const handleBackwardButton = async () => {
    setButtonPressed(true);
    try {
      await axios.get("http://localhost:8080/motor/backward");
      console.log("작동 중");
    } catch (error) {
      console.log("에러", error);
    }
  };

  const handleStopButton = async () => {
    setButtonPressed(false);
    try {
      await axios.get("http://localhost:8080/motor/stop");
      console.log("작동 중");
    } catch (error) {
      console.log("에러", error);
    }
  };

  return (
    <Container>
      <ButtonWrapper>
        <ControlButton
          label="천장 열기"
          onPress={handleForwardButton}
          onRelease={handleStopButton}
          buttonPressed={buttonPressed}
        />
        <ControlButton
          label="천장 닫기"
          onPress={handleBackwardButton}
          onRelease={handleStopButton}
          buttonPressed={buttonPressed}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default ControlPage;