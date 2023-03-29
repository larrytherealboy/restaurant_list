const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 查詢餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.includes(keyword) || restaurant.category.includes(keyword))

      res.render('index', { restaurants: filterRestaurants })
    })
    .catch(error => console.log(error))
})

module.exports = router