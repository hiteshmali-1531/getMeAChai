import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

import mongoose from "mongoose"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"





export const authoptions =  NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            checks: ['none']
        },
  
    ),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT 
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
            
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        })

    ],
    callbacks: {
        async signIn({user, account , profile , email , credentials}){
            const conn = await mongoose.connect("mongodb://localhost:27017/chai")
            // console.log(conn)
            if(account.provider == "github" || account.provider == "facebook" || account.provider == "google" || account.provider == "twitter"){
           

                const currentUser =await User.findOne({email : user.email})
                // console.log(email)
                // console.log(account)
                // console.log(user)
                if(!currentUser){
                    const newUser = await User.create({
                        email : user.email,
                        name : user.email.split("@")[0],
                        profilepic : user.image
                       

                    })
                    user.name = newUser.name

              }else{

                  user.name = currentUser.name
                  console.log(currentUser)
              }
                return true
            }
        },
    
        async session ({session, user, token}){
            await mongoose.connect("mongodb://localhost:27017/chai")
            // console.log(user)
            // console.log(session)
            const dbUser = await User.findOne({email: session.user.email});
            session.user.name = dbUser.name;
            session.user.image = dbUser.profilepic
            return session;
        }
    }
})

export {authoptions as GET, authoptions as POST};

