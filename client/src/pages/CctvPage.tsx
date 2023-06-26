import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
// Components
import MainBody from '../components/UI/MainBody'
import ImgShowDetail from '../components/Cctv/ImgShowDetail'

const Title = styled.h1`
  font-size: 36px;
  margin: 10px 0;
  margin-top: 5%;
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  height: auto;
  align-self: flex-start;
  padding: 10px;
`

const Cctv = styled.img`
  width: 50%;
  margin: 30px 0;
`

const Image = styled.img`
  min-height: 150px;
  min-width: 200px;
  margin: 20px 10px;
`

const NoImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  min-width: 200px;
  padding: 10px;
  margin: 20px 10px;
  border: 1px dashed #e0e0e0;
  border-radius: 5px;
  font-size: 18px;
  color: #888;
`

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
`

const CctvPage: React.FC = () => {
  const [showImage, setShowImage] = useState<boolean>(false)
  const [showDetailImage, setShowDetailImage] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([]) // 이미지 URL 배열

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const socket = io('http://localhost:5000/cctv', {
        auth: { token },
      })
      socket.on('imageList', (data: string[]) => {
        setImages(data) // 이미지 URL 배열 업데이트
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [])

  const handleLoadMore = () => {
    setShowImage(!showImage)
  }

  const handleImageClick = (imageUrl: string) => {
    setShowDetailImage(imageUrl)
    setSelectedImage(true)
  }

  const handleCloseImage = () => {
    setShowDetailImage('')
    setSelectedImage(false)
  }

  return (
    <MainBody>
      <Title>침입자 방지용 CCTV</Title>
      <Cctv src="http://localhost:4000/video_feed" alt="cctv" />
      <LoadMoreButton onClick={handleLoadMore}>
        {showImage ? '숨기기' : '더보기'}
      </LoadMoreButton>
      {showImage && (
        <ImageContainer>
          {images.length > 0 ? (
            images.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                onClick={() => handleImageClick(imageUrl)}
              />
            ))
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <NoImageBox key={index}>No images available</NoImageBox>
            ))
          )}
        </ImageContainer>
      )}
      {selectedImage && (
        <ImgShowDetail
          closeImage={handleCloseImage}
          imageUrl={showDetailImage}
        />
      )}
    </MainBody>
  )
}

export default CctvPage