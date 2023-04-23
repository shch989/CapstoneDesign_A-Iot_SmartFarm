import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const HomePage = () => {
  const [maxTemperature, setMaxTemperature] = useState(30)
  const [minTemperature, setMinTemperature] = useState(10)
  const [maxHumidity, setMaxHumidity] = useState(80)
  const [minHumidity, setMinHumidity] = useState(40)
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [temperatureColor, setTemperatureColor] = useState('')
  const [humidityColor, setHumidityColor] = useState('')

  useEffect(() => {
    const socket = io('http://localhost:5000')

    socket.on('temperature', (data) => {
      setTemperature(data.value)
      setTemperatureColor(data.color)
    })

    socket.on('humidity', (data) => {
      setHumidity(data.value)
      setHumidityColor(data.color)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleMaxTemperatureChange = (event) => {
    setMaxTemperature(event.target.value)
  }

  const handleMinTemperatureChange = (event) => {
    setMinTemperature(event.target.value)
  }

  const handleMaxHumidityChange = (event) => {
    setMaxHumidity(event.target.value)
  }

  const handleMinHumidityChange = (event) => {
    setMinHumidity(event.target.value)
  }

  return (
    <div>
      <div>
        <label htmlFor="max-temperature-input">Max Temperature:</label>
        <input
          type="number"
          id="max-temperature-input"
          value={maxTemperature}
          onChange={handleMaxTemperatureChange}
        />
      </div>
      <div>
        <label htmlFor="min-temperature-input">Min Temperature:</label>
        <input
          type="number"
          id="min-temperature-input"
          value={minTemperature}
          onChange={handleMinTemperatureChange}
        />
      </div>
      <div>
        <label htmlFor="max-humidity-input">Max Humidity:</label>
        <input
          type="number"
          id="max-humidity-input"
          value={maxHumidity}
          onChange={handleMaxHumidityChange}
        />
      </div>
      <div>
        <label htmlFor="min-humidity-input">Min Humidity:</label>
        <input
          type="number"
          id="min-humidity-input"
          value={minHumidity}
          onChange={handleMinHumidityChange}
        />
      </div>
      <div>
        <p>Current Temperature: {temperature} &#8451;</p>
        <div style={{ backgroundColor: temperatureColor }}></div>
      </div>
      <div>
        <p>Current Humidity: {humidity} %</p>
        <div style={{ backgroundColor: humidityColor }}></div>
      </div>
    </div>
  )
}

export default HomePage