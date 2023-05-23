import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import io from "socket.io-client";

const socket = io("ws://localhost:5000/dht");

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
    <ApexCharts
      type="line"
      series={[
        {
          name: props.sensor,
          data: sensorData,
          color: props.sensor === "temperature" ? "#FF0000" : "#0000FF",
        },
      ]}
      options={{
        xaxis: {
          categories: [
            "45초 전",
            "40초 전",
            "35초 전",
            "30초 전",
            "25초 전",
            "20초 전",
            "15초 전",
            "10초 전",
            "5초 전",
            "현재",
          ],
        },
        yaxis: {
          min: props.sensor === "temperature" ? -50 : 0,
          max: props.sensor === "temperature" ? 50 : 100,
        },
      }}
    />
  );
};

export default DhtSensor;
