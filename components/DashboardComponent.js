"use client"
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { fetchUser, updateProfile } from '@/actions/useractions';
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const DashboardComponent = () => {
    const {data:session, update} = useSession();
    const router = useRouter();
    const [form, setForm] = useState({});

    useEffect(() =>{
        document.title = "Dashboard - Get Me a Chai"
        getData();  
        console.log(session)
        if(!session){
            router.push('/login')
        }
    },[])
    const getData = async() =>{
        if(session){

            let u = await fetchUser(session.user.name)
            
            setForm(u);
        }

    }
    const handleSubmit = async(e) =>{
        console.log("hii")
        // e.preventDefault();
        let u = await updateProfile(e, session.user.name);
        await update(e)
        
       
        console.log(u)
        
        toast('profile updated ✅!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            
        });
    }

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value});
    }
  return (
    <>

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
    <form action={handleSubmit} >
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >Name :</label>
        <input  onChange={handleChange} type="text" name='name' value={form.name?form.name: ""} className="w-full p-3 rounded-lg bg-slate-800 "   />
    </div>
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >Email :</label>
        <input onChange={handleChange} type="text" name="email" value={form.email?form.email: ""}  className="w-full p-3 rounded-lg bg-slate-800 "   />
    </div>
    
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >Profile Picture :</label>
        <input onChange={handleChange} type="text" value={form.profilepic?form.profilepic: ""}  name="profilepic" className="w-full p-3 rounded-lg bg-slate-800 "   />
        </div>
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >cover Picture :</label>
        <input onChange={handleChange} type="text" value={form.coverpic?form.coverpic: ""}  name="coverpic" className="w-full p-3 rounded-lg bg-slate-800 "   />
    </div>
   
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >Razopay Id :</label>
        <input onChange={handleChange} type="text" name="razorpayid" value={form.razorpayid?form.razorpayid: ""}  className="w-full p-3 rounded-lg bg-slate-800 "   />
    </div>
    <div  className="text-white flex flex-col gap-2">
       <label  htmlFor="name" >Razopay Secret :</label>
        <input onChange={handleChange} type="text" name="rezorpaysecret" value={form.rezorpaysecret?form.rezorpaysecret: ""}  className="w-full p-3 rounded-lg bg-slate-800 "   />
    </div>
    <div className="my-2">

        <button type="submit" className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Save</button>
    </div>

    </form>

        </>
  )
}

export default DashboardComponent;
