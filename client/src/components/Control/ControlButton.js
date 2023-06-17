import React from "react";
import styled from "styled-components";

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
  border-radius: 5px;

  &:hover {
    border: 1px solid white;
    background-color: teal;
    color: black;
  }
`;

const ControlButton = ({ label, onPress, onRelease, buttonPressed }) => {
  const handlePress = (event) => {
    event.preventDefault();
    onPress();
  };

  const handleRelease = (event) => {
    event.preventDefault();
    onRelease();
  };

  return (
    <Button
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      style={{
        backgroundColor: buttonPressed ? "teal" : "white",
        color: buttonPressed ? "black" : "teal",
      }}
    >
      {label}
    </Button>
  );
};

export default ControlButton;