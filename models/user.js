import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    required: [true, 'Email is necessary!'],
  },
  username: {
    type: String,
    required: [true, 'Name is necessary!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: { type: String },
})

// the connection verify the existence of the model in the models object
const User = models.User || model('User', UserSchema)

export default User
