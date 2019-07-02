const mongoose = require('mongoose')
const Schema = mongoose.Schema

orderSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  quantity: Number,
}, {
    timestamps: true
  })

const Order = mongoose.model('Order', orderSchema)
module.exports = Order