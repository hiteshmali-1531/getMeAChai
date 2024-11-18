"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayment } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';



// import Razorpay from 'razorpay'
// import "https://checkout.razorpay.com/v1/checkout.js"

const Paymentpage = ({ params }) => {
    // <Script id="razor" src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    const { data: session } = useSession();
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setCurrentUser] = useState();
    const [dbPayment, setDbPayments] = useState([]);
    const SearchParams = useSearchParams()
    const router = useRouter();

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })



    }

    useEffect(() => {
        if(!session){
            router.push('/login')
        }
        getData();
        // toast('Payment has been made 👍!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light"
            
        // });
        // console.log(currentUser)
        // console.log(dbPayment)
    }, [])

    useEffect(() => {
        // console.log(SearchParams.get("paymentdone") == "true")
        if (SearchParams.get("paymentdone") == "true" && session) {
            
            console.log(SearchParams.get("paymentdone"))
            toast('Thanks for your donation 👍!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                
            });
            router.push(`/${params.username}`)
        }else{
            console.log("no")
        }
    }, [session])

    const getData = async () => {
        let u = await fetchUser(params.username)
        setCurrentUser(u);
        let dbPayments = await fetchPayment(params.username)
        setDbPayments(dbPayments)

        console.log(currentUser)
        // console.log(u)
        console.log(dbPayments)
        // console.log(dbPayment)
    }
    const pay = async (e, amount) => {
        let a = await initiate(amount, params.username, paymentform)
        if (a.error) {
            // alert(a.error.description)
            toast(`${a.error.description}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                
            });
        } else {
            // console.log(a)
            // console.log(process.env.NEXT_PUBLIC_ID)
            let orderId = a.id;


            var option = {
                "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
                "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": params.username, //your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": "http://localhost:3000/api/razorpay",
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": "Gaurav Kumar", //your customer's name
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },

            }

            var rzp1 = new Razorpay(option);

            // console.log(rzp1.accounts)
            rzp1.open();
        }

        e.preventDefault();
    }
    return (
        <>
            <Script id="razor" src="https://checkout.razorpay.com/v1/checkout.js"></Script>




            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
/>
            <div className="cover">
            {/* Same as */}
          

                <div className="cover w-full bg-red-50 relative">
                    <img className="object-cover w-full h-[350]" src="patreon.gif" alt="" />
                    <div className="rounded-full absolute right-[38%] -bottom-8 border border-white border-2">
                        <img className="rounded-full" width={85} height={85} src="Flaming_Sphere.gif" alt="" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-wrap items-center text-white flex-col gap-2 my-20 ">
                <div className="font-bold text-xl  ">

                    @{params.username}
                </div>
                <div className="px-4 text-center">
                    {dbPayment && dbPayment.length} Payments . {currentUser ? currentUser.email : ""} has   &#8377;{dbPayment && dbPayment.reduce((a, b) => a + Number.parseInt(b.amount), 0) / 100} raised
                </div>

                <div className="payment  mt-10 flex flex-wrap justify-center gap-3 md:w-[80%] w-[100vw] sm:w-[90%] rounded-lg">
                    <div className="supporters w-[90vw] sm:w-[500px] md:w-[49%] bg-slate-900 p-2 text-white sm:p-10   ">
                        <h2 className="text-lg font-bold my-5">top 5 Supporters</h2>
                        <ul className="mx-2 text-lg">
                            {dbPayment && dbPayment.length == 0 && <li>No payment yet</li>}
                            {dbPayment.map((elem) => <li key={elem._id} className="my-2">{elem.name} donated <span className="font-bold">&#8377;{Number.parseInt(elem.amount) / 100}</span>  with a message &quot;{elem.message} ❤️&quot;</li>
                            )}





                        </ul>
                    </div>
                    <div className="makePayment   w-[90vw] sm:w-[500px] md:w-[49%] bg-slate-900 text-white p-10  ">
                        <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex flex-col gap-2">
                            <input type="text" name="name" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Name" value={paymentform.name ? paymentform.name : ""} onChange={handleChange} />
                            <input type="text" name="message" value={paymentform.message ? paymentform.message : ""} className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Message" onChange={handleChange} />
                            <input type="text" name="amount" value={paymentform.amount ? paymentform.amount : ""} className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter amount" onChange={handleChange} />
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-300" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 5 || paymentform.amount?.length < 1} onClick={(e) => pay(e, paymentform.amount * 100)}>Pay</button>
                        </div>

                        <div className="flex gap-2 mt-5">
                            <button onClick={(e) => pay(e, 1000)} className="bg-slate-800 p-3 rounded-lg">Pay  &#8377;10</button>
                            <button onClick={(e) => pay(e, 2000)} className="bg-slate-800 p-3 rounded-lg">Pay  &#8377;20</button>
                            <button onClick={(e) => pay(e, 3000)} className="bg-slate-800 p-3 rounded-lg">Pay  &#8377;30</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default Paymentpage;
