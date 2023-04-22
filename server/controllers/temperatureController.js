const sensor = require('node-dht-sensor')

exports.getTemperature = (req, res, next) => {
  sensor.read(22, 4, function (err, temperature, humidity) {
    if (!err) {
      res.json({ temperature: temperature.toFixed(1) })
    } else {
      res.json({ messge: 'Error' })
    }
  })
}

exports.postTemperatureColor = (req, res, next) => {
  const { maxTemp, minTemp } = req.body
  sensor.read(22, 4, function (err, temperature, humidity) {
    if (!err) {
      let color
      let msg
      if (temperature > maxTemp) {
        color = 'red'
        msg = '온도 값이 지정한 값을 초과하였습니다.'
      } else if (temperature < minTemp) {
        color = 'blue'
        msg = '온도 값이 지정한 값보다 낮습니다.'
      } else {
        color = 'green'
        msg = '현재 온도 값은 안정적입니다.'
      }
      res.json({ color, msg })
    } else {
      res.json({ messge: 'Error' })
    }
  })
}
