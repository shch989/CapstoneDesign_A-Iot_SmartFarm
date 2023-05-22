import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000/dht');

const DhtSensor = (props) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // 웹소켓 이벤트 수신
    socket.on(`${props.sensorType}Update`, (data) => {
      setSensorData(data);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 웹소켓 이벤트 리스너 제거
      socket.off(`${props.sensorType}Update`);
    };
  }, [props.sensorType]);

  return (
    <div>
      <h2>{props.sensorType}</h2>
      <ul>
        {sensorData.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default DhtSensor
