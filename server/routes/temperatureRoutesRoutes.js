const express = require('express')
const router = express.Router()
const temperatureController = require('../controllers/temperatureController')

// 온도 값을 불러오는 코드
router.get('/', temperatureController.getTemperature)

// 희망 온도 값에 따라 색을 표시
router.post('/color', temperatureController.postTemperatureColor)

module.exports = router
