import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const EnlargedOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const EnlargedImage = styled.img`
  width: 60%;
`

interface ImgShowDetailProps {
  imageUrl: string;
  closeImage: () => void;
}

const ImgShowDetail: React.FC<ImgShowDetailProps> = (props) => {
  const modalRoot = document.getElementById('modal-root') as
    | Element
    | DocumentFragment
    | null

  if (!modalRoot) return null

  return ReactDOM.createPortal(
    <EnlargedOverlay onClick={props.closeImage}>
      <EnlargedImage src={props.imageUrl} />
    </EnlargedOverlay>,
    modalRoot
  )
}

export default ImgShowDetail