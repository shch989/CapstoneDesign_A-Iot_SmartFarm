const express = require('express')
const router = express.Router()
const humidityController = require('../controllers/humidityController')

// 습도 값을 불러오는 코드
router.get('/', humidityController.getHumidity)

// 희망 습도 값에 따라 색을 표시
router.post('/humidity/color', humidityController.postHumidityColor);