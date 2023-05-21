const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 瀏覽一家餐廳的詳細資訊
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// 取得新增餐廳表單
router.get('/', (req, res) => {
  res.render('add')
})


// 新增一家餐廳
router.post('/', (req, res) => {
  const userId = req.user._id
  // 如果表單內有任何一個資料填寫錯誤，將出現提示
  const { id, name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
    })
})


// 取得修改餐廳表單
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})


// 修改一家餐廳的資訊
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const editRestaurant = req.body
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      Object.assign(restaurant, editRestaurant)
      return restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${_id}`)
    })
    .catch(error => {
      console.log(error)
    })
})

// 查詢餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.includes(keyword) || restaurant.category.includes(keyword))

      res.render('index', { restaurants: filterRestaurants })
    })
    .catch(error => console.log(error))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
