import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex gap-2'>
        <div className='w-[25%]'>
            <AdminSidebar/>
        </div>
        <div className='w-[75%]'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin