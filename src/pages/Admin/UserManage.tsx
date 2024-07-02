import React, { useState } from 'react'
import { userApis } from '../../apis/UserApis'
import UserModal from './UserModal'
import { toast } from 'react-toastify'
interface IUser {
    id:number
    username:string
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
    const res = await userApis.getAll({page:'1',itemPerPage:'10',search:searchTerm})
    setResult(res.data)
  }
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    getAllUsers();
  };
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
  React.useEffect(() => {
    getAllUsers()
  },[showModal])
  console.log(result)
  return (
    <>
      {showModal && <UserModal
                      showModal={showModal}
                      type={type}
                      user={selectedUser}
                      setShowModal={setShowModal}
      />}
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
              <td className="py-2 px-4 border text-center">{user.username}</td>
              <td className="py-2 px-4 border text-center">{user.email}</td>
              <td className="py-2 px-4 border text-center">{user.isAdmin?"Admin":"Người dùng"}</td>
              <td className="py-2 px-4 border text-center">{user.phone?user.phone:"Chưa nhập"}</td>
              <td className="py-2 px-4 border text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAdd}
        >
          Thêm người dùng
        </button>
      </div>
    </div>
    </>
  )
}

export default UserManage