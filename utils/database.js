import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('MongoDb is already connected')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB is connected & ready')
  } catch (error) {
    console.log(error)
  }
}
