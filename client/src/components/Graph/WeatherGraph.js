import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Loading from "../UI/Loading";

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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const newSocket = io("http://localhost:5000/weather", {
        auth: { token },
      });
      setSocket(newSocket);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("weatherData", (data) => {
        setWeatherData(data);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <React.Fragment>
      {weatherData ? (
        <div>
          <Heading1>실시간 날씨 정보</Heading1>
          <Heading2>위치: {weatherData.user.address}</Heading2>
          <WeatherTable>
            <tbody>
              <tr>
                <th>온도 (현재 기온을 나타냅니다.)</th>
                <td>{weatherData.weather.temperature}°C</td>
              </tr>
              <tr>
                <th>날씨 (현재 날씨 상태를 표현합니다.)</th>
                <td>{weatherData.weather.weather_descriptions[0]}</td>
              </tr>
              <tr>
                <th>풍속 (현재 바람의 세기를 나타냅니다.)</th>
                <td>{weatherData.weather.wind_speed} km/h</td>
              </tr>
              <tr>
                <th>풍향 각도 (바람이 불고 있는 방향을 나타냅니다.)</th>
                <td>{weatherData.weather.wind_degree} km/h°</td>
              </tr>
              <tr>
                <th>
                  풍향 (바람의 방향을 동서남북을 나타내는 약어로 나타냅니다.)
                </th>
                <td>{weatherData.weather.wind_dir}</td>
              </tr>
              <tr>
                <th>기압 (현재 대기의 압력을 나타냅니다.)</th>
                <td>{weatherData.weather.pressure} hPa</td>
              </tr>
              <tr>
                <th>강수량 (현재 강수량을 나타냅니다.)</th>
                <td>{weatherData.weather.precip} mm</td>
              </tr>
              <tr>
                <th>습도 (현재 공기의 습도를 나타냅니다.)</th>
                <td>{weatherData.weather.humidity} %</td>
              </tr>
              <tr>
                <th>구름 덮개 (현재 구름의 양을 나타냅니다.)</th>
                <td>{weatherData.weather.cloudcover} %</td>
              </tr>
              <tr>
                <th>체감 온도 (사람이 느끼는 실제 온도를 나타냅니다.)</th>
                <td>{weatherData.weather.feelslike} °C</td>
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
