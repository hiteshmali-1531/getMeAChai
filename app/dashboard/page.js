"use client"
import React from 'react'
import { useSession  } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DashboardComponent from '@/components/DashboardComponent'

const Dashboard = () => {
    const {data: session } = useSession();
    console.log(session)
    const router = useRouter();
    if(!session){
        router.push('/login');
    }
  return (
    <div className="container w-[60vw] mx-auto ">
      <DashboardComponent />
    </div>
  )
}

export default Dashboard;

