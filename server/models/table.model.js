const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
  table_id: Number,
  qr_url: String,
  qr_image: {
    imgName: String,
    imgPath: String
  }
}, {
    timestamps: true
  })

const Table = mongoose.model('Table', tableSchema)
module.exports = Table