const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const sensor = require('node-dht-sensor')
const cors = require('cors');

// CORS 설정
app.use(cors());

// DHT22 센서에 연결된 GPIO 핀 번호
const sensorPin = 4

// 소켓IO 서버 설정
io.on('connection', (socket) => {
  console.log('Client connected')
})

// 온도 및 습도 데이터를 읽어서 소켓IO 클라이언트에 전송
setInterval(() => {
  sensor.read(22, sensorPin, (err, temperature, humidity) => {
    if (!err) {
      const minTemp = 20
      const maxTemp = 30
      const minHumidity = 40
      const maxHumidity = 70

      let tempColor = ''
      let humidityColor = ''

      if (temperature >= minTemp && temperature <= maxTemp) {
        tempColor = 'green'
      } else if (temperature < minTemp) {
        tempColor = 'blue'
      } else {
        tempColor = 'red'
      }

      if (humidity >= minHumidity && humidity <= maxHumidity) {
        humidityColor = 'green'
      } else if (humidity < minHumidity) {
        humidityColor = 'blue'
      } else {
        humidityColor = 'red'
      }

      io.emit('temperature', {
        value: temperature.toFixed(1),
        color: tempColor,
      })
      io.emit('humidity', {
        value: humidity.toFixed(1),
        color: humidityColor,
      })
    }
  })
}, 2000)

// Express 서버 시작
server.listen(5000, () => {
  console.log('Server started on port 5000')
})
