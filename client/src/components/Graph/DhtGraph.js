import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import io from "socket.io-client";

const socket = io("ws://localhost:5000/dht");

const DhtGraph = (props) => {
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
          categories: ["-20", "-15", "-10", "-5", "now"],
          title: {
            text: 'Second(초)'
          }
        },
        yaxis: {
          min: props.sensor === "temperature" ? -50 : 0,
          max: props.sensor === "temperature" ? 50 : 100,
        },
        title: {
          text: props.sensor === "temperature" ? "실내 온도" : "실내 습도",
          align: 'top'
        },
      }}
    />
  );
};

export default DhtGraph;
