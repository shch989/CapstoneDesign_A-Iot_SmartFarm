import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ApexCharts from 'react-apexcharts'
import io, { Socket } from 'socket.io-client'

const GraphWrapper = styled.div`
  width: 100%;
  p {
    text-align: center;
    font-weight: 700;
  }
`

interface DhtGraphProps {
  sensor: 'temperature' | 'humidity'
}

const DhtGraph: React.FC<DhtGraphProps> = (props) => {
  const [sensorData, setSensorData] = useState<number[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const newSocket = io('http://localhost:5000/dht', {
        auth: { token },
      })
      setSocket(newSocket)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('temperatureData', handleTemperatureData)
      socket.on('humidityData', handleHumidityData)
      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  const handleTemperatureData = (data: number[]) => {
    if (props.sensor === 'temperature') {
      setSensorData(data)
    }
  }

  const handleHumidityData = (data: number[]) => {
    if (props.sensor === 'humidity') {
      setSensorData(data)
    }
  }

  return (
    <GraphWrapper>
      <p>
        {props.sensor === 'temperature' ? '실내 온도' : '실내 습도'}:
        {sensorData[sensorData.length - 1]}
        {props.sensor === 'temperature' ? '°C' : '%'}
      </p>
      <ApexCharts
        type="line"
        series={[
          {
            name: props.sensor,
            data: sensorData,
          },
        ]}
        options={{
          xaxis: {
            categories: Array.from({ length: 10 }, (_, i) =>
              i === 9 ? 'now' : ''
            ),
          },
          stroke: {
            curve: 'smooth',
          },
          colors: [props.sensor === 'temperature' ? '#FF0000' : '#0000FF'],
        }}
      />
    </GraphWrapper>
  )
}

export default DhtGraph
