import mongoose, { Schema } from 'mongoose'

const messagesSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String
  },
  created: {
    type: String
  },
  updated: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

messagesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      text: this.text,
      created: this.created,
      updated: this.updated,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Messages', messagesSchema)

export const schema = model.schema
export default model
