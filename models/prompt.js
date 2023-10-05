import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  //one many relationship
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    reqired: [true, 'Tag is required'],
  },
})

// the connection verify the existence of the model in the models object
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
