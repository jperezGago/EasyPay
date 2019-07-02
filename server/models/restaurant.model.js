const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  description: String,
  background_color: String,
  background_image: {
    imgName: String,
    imgPath: String
  },
  logo: String,
  tables: [{
    type: Schema.Types.ObjectId,
    ref: "Table"
  }],
  menu: [{
    type: Schema.Types.ObjectId,
    ref: "Menu"
  }]
}, {
    timestamps: true
  })

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant