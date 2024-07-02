import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex'>
        <div className=''>
            <AdminSidebar/>
        </div>
        <div className='ml-64 p-4'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin