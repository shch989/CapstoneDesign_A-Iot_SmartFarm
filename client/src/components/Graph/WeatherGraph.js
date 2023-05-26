import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Loading from "../UI/Loading";

const socket = io("ws://localhost:5000/weather");

const WeatherTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    width: 70%;
    text-align: left;
  }

  td {
    text-align: center;
    background-color: #fff;
  }
`;

const Heading1 = styled.h1`
  text-align: center;
  margin: 0;
`;

const Heading2 = styled.h2`
  text-align: right;
`;

const WeatherGraph = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    socket.on("weatherData", (data) => {
      setWeatherData(data);
    });
  });

  return (
    <React.Fragment>
      {weatherData ? (
        <div>
          <Heading1>실시간 날씨 정보</Heading1>
          <Heading2>
            위치: {weatherData.location.country} {weatherData.location.name}
          </Heading2>
          <WeatherTable>
            <tbody>
              <tr>
                <th>온도 (현재 기온을 나타냅니다.)</th>
                <td>{weatherData.current.temperature}°C</td>
              </tr>
              <tr>
                <th>날씨 (현재 날씨 상태를 표현합니다.)</th>
                <td>{weatherData.current.weather_descriptions[0]}</td>
              </tr>
              <tr>
                <th>풍속 (현재 바람의 세기를 나타냅니다.)</th>
                <td>{weatherData.current.wind_speed} km/h</td>
              </tr>
              <tr>
                <th>풍향 각도 (바람이 불고 있는 방향을 나타냅니다.)</th>
                <td>{weatherData.current.wind_degree} km/h°</td>
              </tr>
              <tr>
                <th>
                  풍향 (바람의 방향을 동서남북을 나타내는 약어로 나타냅니다.)
                </th>
                <td>{weatherData.current.wind_dir}</td>
              </tr>
              <tr>
                <th>기압 (현재 대기의 압력을 나타냅니다.)</th>
                <td>{weatherData.current.pressure} hPa</td>
              </tr>
              <tr>
                <th>강수량 (현재 강수량을 나타냅니다.)</th>
                <td>{weatherData.current.precip} mm</td>
              </tr>
              <tr>
                <th>습도 (현재 공기의 습도를 나타냅니다.)</th>
                <td>{weatherData.current.humidity} %</td>
              </tr>
              <tr>
                <th>구름 덮개 (현재 구름의 양을 나타냅니다.)</th>
                <td>{weatherData.current.cloudcover} %</td>
              </tr>
              <tr>
                <th>체감 온도 (사람이 느끼는 실제 온도를 나타냅니다.)</th>
                <td>{weatherData.current.feelslike} °C</td>
              </tr>
            </tbody>
          </WeatherTable>
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default WeatherGraph;
