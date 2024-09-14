import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/DashboardPage/Sidebar'

const Dashboard = () => {
    
    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)

    if(profileLoading || authLoading) {
        return (
            <div className='text-white mt-12' >
                Loading...
            </div>
        )
    }

  return (
    <div className='flex  min-h-[calc(100vh-3.5rem)] ' >
        <Sidebar/>
        <div className=' min-h-[calc(100vh-3.5rem)] overflow-auto flex-1'>
            <div className='w-11/12 mx-auto max-w-[1000px] py-10' >
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard