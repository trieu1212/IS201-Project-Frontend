import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="w-64 h-full shadow-md bg-white fixed">
      <ul className="relative">
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