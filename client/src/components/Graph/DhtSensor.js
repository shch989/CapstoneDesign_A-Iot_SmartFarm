import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:5000/dht');

const DhtSensor = (props) => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on(`${props.sensor}Data`, (data) => {
      setSensorData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [props.sensor]);

  return (
    <div>
      {sensorData.map((sensor, index) => (
        <p key={index}>{sensor}</p>
      ))}
    </div>
  );
}

export default DhtSensor;
