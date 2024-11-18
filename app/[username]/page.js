import Paymentpage from '@/components/Paymentpage'
import React from 'react'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import connectDb from '@/db/connectDb'
const Username = async({params}) => {
  await connectDb();
  let u = await User.findOne({name:params.username})
  // console.log("page "+u)
  if(!u){
    return notFound()

  }
  return (
    <>
        <Paymentpage params={params} />
    </>
  )
}

export default Username


export async function generateMetadata({params}){
  return {
    title : `${params.username} - Get Me a Chai`
  }
}