import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ApexCharts from "react-apexcharts";
import io from "socket.io-client";

const socket = io("ws://localhost:5000/dht");

const GraphWrapper = styled.div`
  width: 100%;
  p {
    text-align: center;
    font-weight: 700;
  }
`;

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
    <GraphWrapper>
      <p>
        {props.sensor === "temperature" ? "실내 온도" : "실내 습도"} :
        {sensorData[sensorData.length - 1]}{props.sensor === "temperature" ? "°C" : "%"}
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
              "-45",
              "-40",
              "-35",
              "-30",
              "-25",
              "-20",
              "-15",
              "-10",
              "-5",
              "now",
            ],
            title: {
              text: "Sec(초)",
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
