import React from "react";
import styled from "styled-components";

interface ControlButtonProps {
  label: string;
  onPress: () => void;
  onRelease: () => void;
  buttonPressed: boolean;
}

const Button = styled.button<{ buttonPressed: boolean }>`
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

  background-color: ${({ buttonPressed }) => (buttonPressed ? "teal" : "white")};
  color: ${({ buttonPressed }) => (buttonPressed ? "black" : "teal")};
`;

const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  onPress,
  onRelease,
  buttonPressed,
}) => {
  const handlePress = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onPress();
  };

  const handleRelease = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onRelease();
  };

  return (
    <Button
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      buttonPressed={buttonPressed}
    >
      {label}
    </Button>
  );
};

export default ControlButton;