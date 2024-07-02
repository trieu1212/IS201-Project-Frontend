import React, { useState } from 'react'
import { userApis } from '../../apis/UserApis'
interface IUser {
    id:number
    name:string
    email:string
    isAdmin:string
    phone:string
    avatar:string
}
interface IUserApiResult {
    data:IUser[],
    total:number,
    currentPage:number,
    nextPage:number|null,
    prevPage:number|null,
    lastPage:number
}
const UserManage = () => {
  const [result, setResult] = React.useState<IUserApiResult | null >(null)
  const [showModal,setShowModal] = React.useState<boolean>(false)
  const [type, setType] = React.useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const getAllUsers = async() =>{
    const res = await userApis.getAll({page:'1',itemPerPage:'10',search:''})
    setResult(res.data)
  }
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    getAllUsers();
  };
  console.log(result)
  const handleAdd = () => {
    setType('add');
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user: IUser) => {
    setType('edit');
    setSelectedUser(user);
    setShowModal(true);
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm người dùng..."
          className="px-4 py-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tìm kiếm
        </button>
      </form>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border text-center">ID</th>
            <th className="py-2 px-4 border text-center">Tên</th>
            <th className="py-2 px-4 border text-center">Email</th>
            <th className="py-2 px-4 border text-center">Admin</th>
            <th className="py-2 px-4 border text-center">Điện thoại</th>
            <th className="py-2 px-4 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {result?.data.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border text-center">{user.id}</td>
              <td className="py-2 px-4 border text-center">{user.name}</td>
              <td className="py-2 px-4 border text-center">{user.email}</td>
              <td className="py-2 px-4 border text-center">{user.isAdmin}</td>
              <td className="py-2 px-4 border text-center">{user.phone}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Sửa
                </button>
                {/* Add delete functionality if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to Add User */}
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAdd}
        >
          Thêm người dùng
        </button>
      </div>

      {/* User Modal Component for Add/Edit */}
      {/* Replace with your actual modal component */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">{type === 'add' ? 'Thêm người dùng' : 'Sửa người dùng'}</h2>
            {/* Your modal form content here */}
            {/* Example form structure */}
            {/* <form onSubmit={handleAddOrUpdate}> */}
            {/* Form fields */}
            {/* </form> */}
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManage