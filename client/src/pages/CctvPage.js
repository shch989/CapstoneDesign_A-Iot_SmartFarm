import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
// Components
import MainBody from "../components/UI/MainBody";
import ImgShowDetail from "../components/Cctv/ImgShowDetail";

const Title = styled.h1`
  font-size: 36px;
  margin: 10px 0;
  margin-top: 5%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  height: auto;
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
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CctvPage = () => {
  const [showImage, setShowImage] = useState(false);
  const [showDetailImage, setShowDetailImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(false);
  const [images, setImages] = useState([]); // 이미지 URL 배열

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const socket = io("http://localhost:5000/cctv", {
        auth: { token },
      });
      socket.on("imageList", (data) => {
        setImages(data); // 이미지 URL 배열 업데이트
      });
      return () => {
        socket.disconnect();
      };
    }
  }, []);

  const handleLoadMore = () => {
    setShowImage(!showImage);
  };

  const handleImageClick = (imageUrl) => {
    setShowDetailImage(imageUrl);
    setSelectedImage(true);
  };

  const handleCloseImage = () => {
    setShowDetailImage(false);
    setSelectedImage(false);
  };

  return (
    <MainBody>
      <Title>침입자 방지용 CCTV</Title>
      {/* <Image src="http://localhost:4000/video_feed" alt="cctv" /> */}
      <Cctv
        src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfNjEg/MDAxNTcwNzg1ODM3Nzc0.zxDXm20VlPdQv8GQi9LWOdPwkqoBdiEmf8aBTWTsPF8g.FqMQTiF6ufydkQxrLBgET3kNYAyyKGJTWTyi1qd1-_Ag.PNG.kkson50/sample_images_01.png?type=w800"
        alt="cctv"
      />
      <LoadMoreButton onClick={handleLoadMore}>
        {showImage ? "숨기기" : "더보기"}
      </LoadMoreButton>
      {showImage && (
        <ImageContainer>
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </ImageContainer>
      )}
      {selectedImage && (
        <ImgShowDetail
          closeImage={handleCloseImage}
          imageUrl={showDetailImage}
        />
      )}
    </MainBody>
  );
};

export default CctvPage;