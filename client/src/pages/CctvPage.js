import React, { useState } from 'react'
import styled from 'styled-components'
// Components
import MainBody from '../components/UI/MainBody'
// 테스트용
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
  height: 150px;
  margin: 10px;
`

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #e0e0e0;
  border: none;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
`

const CctvPage = () => {
  const [showImage, setShowImage] = useState(false)
  const [showDetailImage, setShowDetailImage] = useState('')
  const [selectedImage, setSelectedImage] = useState(false)

  const images = [
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfNjEg/MDAxNTcwNzg1ODM3Nzc0.zxDXm20VlPdQv8GQi9LWOdPwkqoBdiEmf8aBTWTsPF8g.FqMQTiF6ufydkQxrLBgET3kNYAyyKGJTWTyi1qd1-_Ag.PNG.kkson50/sample_images_01.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfODMg/MDAxNTcwNzg1ODM3NTUz.2m5sz7K4ATO7WZzXYGE-MmUQ1DYUOflq0IaGgitVZEIg.jYZnxxm0E275Jplbrw25aFCFPVXKcmai1zhf8rlYl3Eg.PNG.kkson50/sample_images_02.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjIg/MDAxNTcwNzg1ODM3NTU0.S-ltTb4JaOedIKIRE-mWYcVuZGTBGi8Z8G8NJZtQmrkg.dlyc5gHE3DSF4rvH3fiirLhP7ilKSZuz6t0a0KoWJrYg.PNG.kkson50/sample_images_03.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjYw/MDAxNTcwNzg1ODM3NTY0.wmnNedC0zB5ummw6DSfYJeQEkiqILCyHRArLs7ZkSzgg.FfY1vXaDbLM3EdsvBHDV1EP0FVKo4jamY_yAJfs9gBIg.PNG.kkson50/sample_images_04.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjg3/MDAxNTcwNzg1ODM3NTY1.qqCY6WHNolzYOJqJjNzx-5Z-ehx-Up4tJIbsMXOvLAcg.MroaRE_xMGpj1j-TshpXbgNT4yoFbWauCiyM4ngnBk8g.PNG.kkson50/sample_images_05.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjQ0/MDAxNTcwNzg1ODM3NTY0.N-mCcjnaHkhYyrFs5skfugLRPRWh4KhhZSMWJVHQjbog.KDfVtJcaSIhvBaHNoVuXvejeoAJ50UR081fC0IYC0OIg.PNG.kkson50/sample_images_06.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMTAw/MDAxNTcwNzg1ODM3NTY1.uCp9Q26Lqw62aen65yhk-c1grJ6Vg7_8N0uG8CEBCrsg.HPEPk-ivoCIJdDmfcIqXmFYfZL1Yhw5EzLXVZgTGHgYg.PNG.kkson50/sample_images_07.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfNjIg/MDAxNTcwNzg1ODM3NzA0.cPK5-eVEYoOkIQSwtX9mDluA8eiE_dnUjORZ8jFLHLEg.epNnQuqS4bsRY_T8WIvTEY6PvPRWRVLGFGPyd53lkSog.PNG.kkson50/sample_images_08.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjcy/MDAxNTcwNzg1ODM3NzE0.d7yBdJoyLN2KvLiQho7FTbRDUNzu3AlrnYQ8PF7mPI0g.V4wwCK6yULskBW11qubVymupW-MFCJymnqkvsQH00Wog.PNG.kkson50/sample_images_09.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMTc1/MDAxNTcwNzg1ODM3NzIx.7DicccFpH3zj7wrchniA88QP3zKH6FGhR1X0eUSppEUg.qpjvzSdad_23-qzwIU2jU0Ce8PEIgDlxtPJlN9SRpsYg.PNG.kkson50/sample_images_10.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfMjY2/MDAxNTcwNzg1ODM3NzMy.VIp4VhTraBHxVIZyg9-VO9RMbrmjtJbtcGyVMIKycGEg.lMnbpidhFfsKenVL15hAFS9hRnFc6PlUmy3DcWqEss0g.PNG.kkson50/sample_images_11.png?type=w800',
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfOTIg/MDAxNTcwNzg1ODM3Nzc0.RDIwjsL18UXthepOZiBORxc-Wc-Xl2grAhD5Tc4Xjewg.P2r0EQzuYJ6r9Pbn69jGmCSIkft_uRWmeRdEyB19C1Qg.PNG.kkson50/sample_images_12.png?type=w800',
  ]

  const handleLoadMore = () => {
    setShowImage(!showImage)
  }

  const handleImageClick = (imageUrl) => {
    setShowDetailImage(imageUrl)
    setSelectedImage(true)
  }

  const handleCloseImage = () => {
    setShowDetailImage(false)
    setSelectedImage(false)
  }

  return (
    <MainBody>
      <Title>침입자 방지용 CCTV</Title>
      {/* <Image src="http://localhost:4000/video_feed" alt="cctv" /> */}
      <Cctv
        src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfNjEg/MDAxNTcwNzg1ODM3Nzc0.zxDXm20VlPdQv8GQi9LWOdPwkqoBdiEmf8aBTWTsPF8g.FqMQTiF6ufydkQxrLBgET3kNYAyyKGJTWTyi1qd1-_Ag.PNG.kkson50/sample_images_01.png?type=w800"
        alt="cctv"
      />
      <LoadMoreButton onClick={handleLoadMore}>
        {showImage ? '간략히' : '더보기'}
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
  )
}

export default CctvPage
