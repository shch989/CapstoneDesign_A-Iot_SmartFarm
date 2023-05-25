import React from "react";
import styled from "styled-components";

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
  const data = {
    request: {
      type: "LatLon",
      query: "Lat 35.21 and Lon 129.07",
      language: "en",
      unit: "m",
    },
    location: {
      name: "Sajiktong",
      country: "South Korea",
      region: "",
      lat: "35.198",
      lon: "129.064",
      timezone_id: "Asia/Seoul",
      localtime: "2023-05-25 23:50",
      localtime_epoch: 1685058600,
      utc_offset: "9.0",
    },
    current: {
      observation_time: "02:50 PM",
      temperature: 18,
      weather_code: 113,
      weather_icons: [
        "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png",
      ],
      weather_descriptions: ["Clear"],
      wind_speed: 7,
      wind_degree: 190,
      wind_dir: "S",
      pressure: 1018,
      precip: 0,
      humidity: 83,
      cloudcover: 0,
      feelslike: 18,
      uv_index: 1,
      visibility: 10,
      is_day: "no",
    },
  };

  return (
    <div>
      <Heading1>실시간 날씨 정보</Heading1>
      <Heading2>
        위치: {data.location.country} {data.location.name}
      </Heading2>

      <WeatherTable>
        <tbody>
          <tr>
            <th>온도 (현재 기온을 나타냅니다.)</th>
            <td>{data.current.temperature}°C</td>
          </tr>
          <tr>
            <th>날씨 (현재 날씨 상태를 표현합니다.)</th>
            <td>{data.current.weather_descriptions[0]}</td>
          </tr>
          <tr>
            <th>풍속 (현재 바람의 세기를 나타냅니다.)</th>
            <td>{data.current.wind_speed} km/h</td>
          </tr>
          <tr>
            <th>풍향 각도 (바람이 불고 있는 방향을 나타냅니다.)</th>
            <td>{data.current.wind_degree} km/h°</td>
          </tr>
          <tr>
            <th>풍향 (바람의 방향을 동서남북을 나타내는 약어로 나타냅니다.)</th>
            <td>{data.current.wind_dir}</td>
          </tr>
          <tr>
            <th>기압 (현재 대기의 압력을 나타냅니다.)</th>
            <td>{data.current.pressure} hPa</td>
          </tr>
          <tr>
            <th>강수량 (현재 강수량을 나타냅니다.)</th>
            <td>{data.current.precip} mm</td>
          </tr>
          <tr>
            <th>습도 (현재 공기의 습도를 나타냅니다.)</th>
            <td>{data.current.humidity} %</td>
          </tr>
          <tr>
            <th>구름 덮개 (현재 구름의 양을 나타냅니다.)</th>
            <td>{data.current.cloudcover} %</td>
          </tr>
          <tr>
            <th>체감 온도 (사람이 느끼는 실제 온도를 나타냅니다.)</th>
            <td>{data.current.feelslike} °C</td>
          </tr>
        </tbody>
      </WeatherTable>
    </div>
  );
};

export default WeatherGraph;
