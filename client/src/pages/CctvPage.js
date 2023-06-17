import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CctvPage = () => {
  alert("CCTV Page");

  return (
    <Container>
        <img src="http://localhost:4000/video_feed" alt="Video Feed"/>
    </Container>
  )
}

export default CctvPage