const express = require('express')
const app = express()

const temperatureRoutes = require('./routes/temperatureRoutesRoutes');
const humidityRoutes = require('./routes/humidityRoutes')

// 온습도 센서의 온도값 관련 Routes
app.use('/temperature', temperatureRoutes)

// 온습도 센서의 습도값 관련 Routes
app.use('/humidity', humidityRoutes)

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000/`)
})