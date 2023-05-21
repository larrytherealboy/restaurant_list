const { response } = require('express')
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 瀏覽全部所有餐廳，並按各級排序
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 按各級排序所有餐廳
router.get('/:sortItem&:sort', (req, res) => {
  const userId = req.user._id
  const sortItem = req.params.sortItem
  const sort = req.params.sort

  Restaurant.find({ userId })
    .lean()
    .sort([[sortItem, sort]])
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
