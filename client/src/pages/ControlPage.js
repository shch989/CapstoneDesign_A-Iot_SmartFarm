import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const Button = styled.button`
  flex: 1;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  cursor: pointer;
  background-color: white;
  border: 1px solid teal;
  color: teal;
  margin-bottom: 20px;

  &:hover {
    border: 1px solid white;
    background-color: teal;
    color: black;
  }
`;

const ControlPage = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleForwardButton = async (event) => {
    event.preventDefault();
    setButtonPressed(true);
    try {
      await axios.get("http://localhost:8080/motor/forward");
      console.log("작동 중");
    } catch (error) {
      console.log("에러", error);
    }
  };

  const handleBackwardButton = async (event) => {
    event.preventDefault();
    setButtonPressed(true);
    try {
      await axios.get("http://localhost:8080/motor/backward");
      console.log("작동 중");
    } catch (error) {
      console.log("에러", error);
    }
  };

  const handleStopButton = async (event) => {
    event.preventDefault();
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
        <Button
          onMouseDown={handleForwardButton}
          onMouseUp={handleStopButton}
          onTouchStart={handleForwardButton}
          onTouchEnd={handleStopButton}
          style={{
            backgroundColor: buttonPressed ? "teal" : "white",
            color: buttonPressed ? "black" : "teal",
          }}
        >
          천장 열기
        </Button>
        <Button
          onMouseDown={handleBackwardButton}
          onMouseUp={handleStopButton}
          onTouchStart={handleBackwardButton}
          onTouchEnd={handleStopButton}
          style={{
            backgroundColor: buttonPressed ? "teal" : "white",
            color: buttonPressed ? "black" : "teal",
          }}
        >
          천장 닫기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default ControlPage;
