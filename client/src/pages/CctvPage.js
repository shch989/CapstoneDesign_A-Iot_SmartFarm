import React, { useState } from 'react';
import styled from 'styled-components';
import cctv from '../public/sample_images_01.png';
import img1 from '../public/sample_images_02.png';
import img2 from '../public/sample_images_03.png';
import img3 from '../public/sample_images_04.png';
import img4 from '../public/sample_images_05.png';
import img5 from '../public/sample_images_06.png';
import img6 from '../public/sample_images_07.png';
import img7 from '../public/sample_images_08.png';
import img8 from '../public/sample_images_09.png';
import img9 from '../public/sample_images_10.png';
import img10 from '../public/sample_images_11.png';
import img11 from '../public/sample_images_12.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 36px;
  margin: 10px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
  align-self: flex-start;
  padding: 10px;
`;

const Cctv = styled.img`
  width: 50%;
  margin: 30px 0;
`;

const Image = styled.img`
  height: 150px;
  margin: 10px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  margin-bottom: 30px;
  cursor: pointer;
`;

const CctvPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
  ];

  const handleLoadMore = () => {
    const show = !showImage;
    setShowImage(show);
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <Title>침입자 방지용 CCTV</Title>
      {/* <Image src="http://localhost:4000/video_feed" alt="cctv" /> */}
      <Cctv src={cctv} alt="cctv" />
      <LoadMoreButton onClick={handleLoadMore}>
        {isExpanded ? '간략히' : '더보기'}
      </LoadMoreButton>
      {showImage && (
        <ImageContainer>
          {images.map((imageUrl, index) => (
            <Image key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
        </ImageContainer>
      )}
    </Container>
  );
};

export default CctvPage;