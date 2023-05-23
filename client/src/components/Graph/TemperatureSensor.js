import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TemperatureSensor = () => {
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const fetchTemperature = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dht/temperature');
      setTemperature(response.data.data.temperature);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // 주기적으로 fetchTemperature 함수를 호출하여 데이터를 가져옵니다.
    const interval = setInterval(fetchTemperature, 5000); // 5초마다 요청을 보내도록 설정

    return () => {
      // 컴포넌트가 언마운트되면 setInterval을 정리(cleanup)합니다.
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {temperature ? (
        <p>Temperature: {temperature}°C</p>
      ) : (
        <p>Loading temperature...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TemperatureSensor;