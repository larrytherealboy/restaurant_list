// const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results

const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  await Promise.all(
    SEED_USERS.map(async (user, user_index) => {
      const createdUser = await bcrypt
        .genSalt(10)
        .then(sault => bcrypt.hash(user.password, sault))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
      console.log("user created")

      const userRestaurants = []
      restaurantList.forEach((restaurant, restaurant_index) => {
        if (restaurant_index >= 3 * user_index && restaurant_index < 3 * (user_index + 1)) {
          restaurant.userId = createdUser._id
          userRestaurants.push(restaurant)
        }
      })
      await Restaurant.create(userRestaurants)
      console.log("restaurant created")
    })
  )
  console.log('所有使用者與餐廳資料創建完成')
  process.exit()
})