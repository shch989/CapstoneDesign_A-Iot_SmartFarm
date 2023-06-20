import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function FeedBackPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [socket, setSocket] = useState(null);

  // 웹 소켓 연결 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io('http://localhost:5000/cctv', {
        auth: { token },
      });
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        await axios.post('http://localhost:8080/cctv/upload/6491ebc4643108debf2b63c8', formData);
        console.log('Image uploaded successfully');

        // 이미지 업로드 후 서버에 이미지 처리 요청
        if (socket) {
          socket.emit('processImage');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
}

export default FeedBackPage;
