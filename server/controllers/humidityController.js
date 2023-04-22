const sensor = require('node-dht-sensor')

exports.getHumidity = (req, res, next) => {
  sensor.read(22, 4, function (err, temperature, humidity) {
    if (!err) {
      res.json({ humidity: humidity.toFixed(1) })
    } else {
      res.json({ msg: 'Error' })
    }
  })
}

exports.postHumidityColor = (req, res, next) => {
  const { maxHumidity, minHumidity } = req.body;
  sensor.read(22, 4, function (err, temperature, humidity) {
    if (!err) {
      let color;
      let msg;
      if (humidity > maxHumidity) {
        color = 'red';
        msg = '습도 값이 지정한 값을 초과하였습니다.'
      } else if (humidity < minHumidity) {
        color = 'blue';
        msg = '습도 값이 지정한 값보다 낮습니다.'
      } else {
        color = 'green'
        msg = '현재 습도 값은 안정적입니다.'
      }
      res.json({ color, msg });
    } else {
      res.json({ messge: 'Error' });
    }
  });
};
