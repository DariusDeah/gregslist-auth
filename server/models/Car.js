
import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const CarSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      minLength: 3,
      lowercase: true,
      trim: true
    },
    model: {
      type: String,
      minLenght: 3,
      lowercase: true,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    year: {
      type: Number,
      min: 1990,
      max: 3000
    },
    description: {
      type: String,
      trim: true
    },
    imgs: {
      type: [String],
      default: 'https://proximaride.com/images/car_placeholder2.png'
    },
    postedAt: {
      type: Date,
      default: Date.now()
    },
    bids: {
      type: [Number]
    },
    // RelationShip Here
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
// shows user info for who posted it
CarSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
