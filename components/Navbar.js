"use client"
import React, { useState} from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
   const pathChange = () =>{
    console.log("hii")
    router.push("/dashboard")
   }
  const [showdropdown, setShowdropdown] = useState(false);

  // if(session){
  //     return <>
  //         Signed in as {session.user.name} <br />
  //         <button onClick={() =>signOut()}>Sign out</button>
  //     </>
  // }
  return (
    <nav className="bg-black text-white flex md:justify-between md:flex-row flex-col justify-center px-4 py-3" >
      <div className="logo font-bold flex md:text-xl text-3xl  justify-center  " >
      <Link href={"/"}>  Get Me a Chai</Link>
      
      </div >
      {/* <ul className=="flex gap-3 ">
        <li>Home</li>
        <li>About</li>
        <li>Project</li>
        <li>Sign Up</li>
        <li>Login</li>
      </ul> */}
      
        {session && <div className="flex gap-2 justify-center" >
          


         
             
                <Link href={"/dashboard"}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
             
            
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
             
           
        
           
          </div>
       
        }
      

        {
          session &&
          <button onClick={() => { signOut() }} type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        }
        {
          !session && <Link className="mx-auto md:mx-0 my-3" href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5  py-2.5 text-center me-2 mb-2">Login</button>
          </Link>
        }
   

    </nav>
  )
}

export default Navbar
