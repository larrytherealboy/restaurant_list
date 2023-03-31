const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// const alert = require('alert');

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

  // 如果表單內有任何一個資料沒填，將出現提示
  if (Object.values(req.body).includes('')) {
    return res.render('alert')
  }

  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
    })
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
    .catch(error => {
      const errorMessage = error._message
      res.render('alert', { errorMessage }) // 新增機制：如果修改的資料與該欄要求的type不符，跳回警告頁面，顯示伺服器給的提示
    })
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
