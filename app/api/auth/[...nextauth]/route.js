import User from '@models/user'
import { connectToDB } from '@utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.ID_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user from mongoDb session
      const sessionUser = await User.findOne({
        email: session.user.email,
      })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // serverLess -> Lambda function -> work only on calls dynamodb
        await connectToDB()
        // check if a user already exist
        const userExists = await User.findOne({
          email: profile.email,
        })
        // if the user doesn't exist -> sign a  new user to DB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log(error)
        console.log(
          'Something went wrong checking user existence',
          error.message
        )
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
