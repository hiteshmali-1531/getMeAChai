import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async( req) =>{
    try{
    await connectDb();
    let body = await req.formData()
    body = Object.fromEntries(body);
    console.log(body)

    let p  = await Payment.findOne({oid : body.razorpay_order_id});
    let u = await User.findOne({name: p.to_user})
    console.log(u)
    console.log(u.rezorpaysecret)
    if(!p){
        return NextResponse.error({success: false,message:"Order is not found"});
    }

    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id" : body.razorpay_payment_id,   }, body.razorpay_signature,u.rezorpaysecret);

    if(xx){
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: "true"},{new: true})
        return NextResponse.redirect(`${process.env.URL}/${updatedPayment.to_user}?paymentdone=true`)
    }else{
        return NextResponse.error({success : false, mesage:"Payment Verification Failed"})
    }
 }catch(e){
    console.log(e)
    return NextResponse.error({success : false , message : "some errore occure"})
 }
}