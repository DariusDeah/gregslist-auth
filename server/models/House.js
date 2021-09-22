import { Schema } from 'mongoose'

export const House = new Schema({
  style: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }

})
