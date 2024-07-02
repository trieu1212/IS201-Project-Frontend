import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.svg'
const AdminSidebar = () => {
  return (
    <div className="w-64 h-full shadow-md bg-gray-300 fixed">
      <div className="flex items-center justify-center py-4">
        <NavLink to="/">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-32 h-auto"
          />
        </NavLink>
      </div>
    <ul className="relative py-3">
      <li className="relative">
        <NavLink 
          to="/admin/services" 
          className={({ isActive }) => 
            `block py-3 px-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Quản lý dịch vụ
        </NavLink>
      </li>
      <li className="relative">
        <NavLink 
          to="/admin/posts" 
          className={({ isActive }) => 
            `block py-3 px-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Quản lý bài đăng
        </NavLink>
      </li>
      <li className="relative">
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => 
            `block py-3 px-4 ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Quản lý người dùng
        </NavLink>
      </li>
    </ul>
  </div>
  )
}

export default AdminSidebar