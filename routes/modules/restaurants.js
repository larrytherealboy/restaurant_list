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
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 取得修改餐廳表單
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})


// 修改一家餐廳的資訊
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      Object.assign(restaurant, editRestaurant)
      return restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${id}`)
    })
    .catch(error => console.log(error))
})


// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
