const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Restaurant = require('../models/restaurant.model')
const Table = require('../models/table.model')
const Menu = require('../models/menu.model.js')
const Order = require('../models/order.model')



router.post('/newRestaurant', (req, res) => {
  const { name, address, phone, logo, tables_quantity, description } = req.body.restaurant
  const user = req.body.user
  let indexTable = 1

  let tables_array = []

  createTables = (restaurant) => Table.create({ table_id: indexTable, qr_url: `${restaurant._id}/${indexTable}` })

  pupulateTables = (restaurant) => {
    return Restaurant.findByIdAndUpdate({ _id: restaurant._id }, { tables: tables_array }, { new: true })
      .populate({
        path: 'tables',
      })
      .then(updatedRestaurant => {
        return updatedRestaurant
      })
  }

  recursive = (restaurant) => {
    return createTables(restaurant)
      .then(table => {
        tables_array.push(table._id)
        indexTable++

        if (indexTable <= tables_quantity)
          return recursive(restaurant)
        else
          return pupulateTables(restaurant)
      })
      .catch(error => console.log(error))
  }


  Restaurant.create({ name, address, phone, logo, description })
    .then(restaurant => {

      if (tables_quantity > 0) {
        recursive(restaurant)
          .then((restaurant) => {
            req.user.restaurant = restaurant
            res.json(req.user)
          })

        User.findByIdAndUpdate({ _id: user._id }, { restaurant: restaurant._id }, { new: true })
          .then(updatedUser => console.log('Usuario actualizado con el restaurante', updatedUser))

      } else {
        res.status(401).json({ msg: 'Tienes que añadir al menos una mesa' })
      }

    })

    .catch(error => console.log(error))

})



router.post('/updateRestaurant', (req, res) => {

  const { name, address, phone, logo, description, id } = req.body

  Restaurant.findByIdAndUpdate({ _id: id }, { name, address, phone, logo, description }, { new: true })
    .populate({
      path: 'restaurant',
      populate: { path: 'tables menu' }
    })
    .then(updatedRestaurant => {
      req.user.restaurant = updatedRestaurant
      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))
})



router.post('/newPlate', (req, res) => {

  const { type, name, price, image, description } = req.body.menu

  Menu.create({ type, name, price, image, description })
    .then(menu => {
      return Restaurant.findByIdAndUpdate({ _id: req.body.restaurant_id }, { $push: { menu: menu._id } }, { new: true })
        .populate({ path: 'menu' })
    })
    .then(updatedRestaurant => {
      req.user.restaurant = updatedRestaurant
      res.json(req.user)
    })

    .catch(err => console.log('Error:', err))
})


router.post('/updateMenu', (req, res) => {

  const { name, price, image, description, id } = req.body.menu

  Menu.findByIdAndUpdate({ _id: id }, { name, price, image, description }, { new: true })
    .then(updatedCourse => {
      req.user.restaurant.menu.forEach((course, index) => {
        if (course._id == id) {
          req.user.restaurant.menu[index] = updatedCourse
        }
      })
      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))
})


router.post('/deleteMenu', (req, res) => {
  const { menu } = req.body

  Menu.findByIdAndDelete(menu._id)
    .then(() => {

      req.user.restaurant.menu.forEach((course, idx) => {
        if (course._id == menu._id) {
          req.user.restaurant.menu.splice(idx, 1)
        }
      })

      res.json(req.user)
    })
    .catch(err => console.log('Error:', err))

})

router.get('/getRestaurantMenu/:menu_id', (req, res) => {

  Restaurant.findById(req.params.menu_id)
    .populate({
      path: 'menu',
    })
    .then(restaurant => {
      res.json(restaurant.menu)
    })
    .catch(err => console.log('Error:', err))
})



// Order

router.post('/newOrder', (req, res) => {
  const { name, price, description, image, quantity } = req.body.order
  const user = req.user

  Order.create({ name, price, description, image, quantity })
    .then(order => {
      return User.findByIdAndUpdate({ _id: user._id }, { $push: { order: order._id } }, { new: true })
        .populate({ path: 'order' })
    })
    .then(updatedUser => res.json(updatedUser.order[updatedUser.order.length - 1]))
    .catch(err => console.log('Error:', err))
})



router.post('/updateOrder', (req, res) => {
  const { order } = req.body

  Promise.all(order.map(o => Order.findByIdAndUpdate({ _id: o._id }, { quantity: +(o.quantity) }, { new: true })))
    .then(arrOrder => res.json(arrOrder))
    .catch(err => {
      console.log(err)
      res.status(500).json({ msg: 'algo mal' })
    })
})


router.post('/updateCourse', (req, res) => {
  console.log('req body of updateCourse', req.body)
  const { order } = req.body

  Order.findByIdAndUpdate({ _id: order._id }, { quantity: +(order.quantity) }, { new: true })
    .then(courseUpdated => res.json(courseUpdated))
    .catch(err => console.log('Error:', err))
})



router.get('/getOrder', (req, res) => {

  const user = req.user

  User.findById({ _id: user._id })
    .populate({
      path: 'order',
    })
    .then(user => {
      res.json(user.order)
    })
    .catch(err => console.log('Error:', err))

})


router.post('/clearOrder', (req, res) => {

  const { order_id } = req.body

  User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { order: order_id } }, { new: true })
    .then(userUpdated => {
      req.user.order = userUpdated.order
      res.json(req.user.order)
    })
    .catch(error => console.log(error))

})


router.get('/clearAllOrder', (req, res) => {
  // const { order_id } = req.body

  User.findByIdAndUpdate({ _id: req.user._id }, { $set: { order: [] } }, { new: true })
    .then(() => {
      console.log('order borrado', req.user.order)
      res.json(req.user.order)
    })
    .catch(error => console.log(error))

})



// User

router.post('/setRestaurant', (req, res) => {
  const currentRestaurant = req.body

  User.findByIdAndUpdate({ _id: req.user._id }, { currentRestaurant }, { new: true })
    .then(user => {
      res.json(user.currentRestaurant)
    })
    .catch(error => console.log(error))

})


router.get('/getCurrentRestaurant', (req, res) => {
  User.findById({ _id: req.user._id })
    .then(user => {
      res.json(user.currentRestaurant)
    })
    .catch(err => console.log('Error:', err))
});




module.exports = router