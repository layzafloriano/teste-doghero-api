import mongoose, { Schema } from 'mongoose'

const sizes = ['mini', 'small', 'medium', 'large', 'extralarge']

const petSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  size: {
    type: String,
    enum: sizes
  },
  picture: {
    type: String
  },
  ownerID: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

petSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      age: this.age,
      bearing: this.bearing,
      picture: this.picture,
      ownerID: this.ownerID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Pet', petSchema)

export const schema = model.schema
export default model
