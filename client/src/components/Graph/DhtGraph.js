import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ApexCharts from "react-apexcharts";
import io from "socket.io-client";

const GraphWrapper = styled.div`
  width: 100%;
  p {
    text-align: center;
    font-weight: 700;
  }
`;

const DhtGraph = (props) => {
  const [sensorData, setSensorData] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const newSocket = io("http://localhost:5000/dht", {
        auth: { token },
      });
      setSocket(newSocket);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("temperatureData", handleTemperatureData);
      socket.on("humidityData", handleHumidityData);
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const handleTemperatureData = (data) => {
    if (props.sensor === "temperature") {
      setSensorData(data);
    }
  };

  const handleHumidityData = (data) => {
    if (props.sensor === "humidity") {
      setSensorData(data);
    }
  };

  return (
    <GraphWrapper>
      <p>
        {props.sensor === "temperature" ? "실내 온도" : "실내 습도"} :
        {sensorData[sensorData.length - 1]}
        {props.sensor === "temperature" ? "°C" : "%"}
      </p>
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
              "-9",
              "-8",
              "-7",
              "-6",
              "-5",
              "-4",
              "-3",
              "-2",
              "-1",
              "now",
            ],
            title: {
              text: "Min(분)",
            },
          },
          stroke: {
            curve: "smooth", // 곡선 형태로 변경
          },
        }}
      />
    </GraphWrapper>
  );
};

export default DhtGraph;