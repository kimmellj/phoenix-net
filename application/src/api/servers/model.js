import mongoose, { Schema } from 'mongoose'

const serversSchema = new Schema({
  hostname: {
    type: String
  },
  url: {
    type: String
  },
  key: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

serversSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      hostname: this.hostname,
      url: this.url,
      key: this.key,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Servers', serversSchema)

export const schema = model.schema
export default model
