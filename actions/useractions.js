"use server"

import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Razorpay from "razorpay"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
   
    try{

        const u = await User.findOne({name: to_username})
        
        console.log(u)
    
        const Razorpay = require('razorpay');
        // console.log(process.env.RAZO_ID)
        var instance = new Razorpay({ key_id: u.razorpayid, key_secret: u.rezorpaysecret})
        // console.log(amount)
    
        var options = {
            amount: Number.parseInt(amount),  // amount in the smallest currency unit
            currency: "INR",
            
        };
         let x = await instance.orders.create(options);
    
        await Payment.create({
            oid : x.id,
            amount: amount,
            to_user : to_username,
            name : paymentform.name,
            message : paymentform.message
        })
        return x;
    }catch(e){
        console.log(e)
        e = JSON.parse(JSON.stringify(e))
        return e
    }

}

export const fetchUser = async(username) =>{
    await connectDb();
    let u = await User.findOne({name: username})
    let user = u.toObject({flattenObjectIds: true});
    user = JSON.parse(JSON.stringify(user))
    console.log(user)
    return user;
}

export const fetchPayment = async(username) =>{
    await connectDb();
    let p = await Payment.find({to_user: username, done: true }).sort({amount: -1}).limit(5).lean();
    p = JSON.parse(JSON.stringify(p));
    // console.log(p)
    return p;
}

export const updateProfile = async(data, oldusername) =>{
    await connectDb();

    let ndata = Object.fromEntries(data);
    if(oldusername !== ndata.name){

        let u = await User.findOne({name:ndata.name})
        if(u){
            return {error : "username aleready exists"}
        }else{

            await Payment.updateMany({to_user: oldusername} ,{to_user: ndata.name})
        }
    }

    await User.updateOne({email: ndata.email}, ndata);
}