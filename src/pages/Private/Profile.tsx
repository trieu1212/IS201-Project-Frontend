import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OrderApis } from '../../apis/OrderApis'

interface IService {
  id: number
  name: string
  description: string
  dateTime: number
  price: number
  postAmount: number
  status: boolean
}
interface IUser {
  id: number
  username: string
  avatar: string
  email: string
}
interface IOrder {
  id: number
  dateEnd: number
  dateStart: number
  status: string
  user: IUser
  service: IService
}
interface IPostApiResult {
  data: IOrder[],
  total: number,
  currentPage: number,
  nextPage: number | null,
  prevPage: number | null,
  lastPage: number
}
const Profile = () => {
  const { user } = useSelector((state: any) => state.app)
  const [type, setType] = React.useState<string>('Chỉnh sửa thông tin')
  const [result, setResult] = React.useState<IPostApiResult>()
  useEffect(() => {
    const getAllOrder = async () => {
      const res = await OrderApis.getAll()
      setResult(res.data)
    }
    getAllOrder()
  }, [])
  console.log(result?.data)
  return (
    <div className="max-w-6xl mx-auto flex gap-6 mt-6">
      <div className="w-1/3 p-6 bg-blue-900 rounded-md text-white h-auto">
        <h2 className="text-2xl text-center mb-6">Cài đặt</h2>
        <div className="flex flex-col gap-6">
          <p
            onClick={() => setType('Chỉnh sửa thông tin')}
            className={`cursor-pointer ${type === 'Chỉnh sửa thông tin' ? 'text-yellow-300' : ''}`}
          >
            Chỉnh sửa thông tin
          </p>
          <p
            onClick={() => setType('Thông báo')}
            className={`cursor-pointer ${type === 'Thông báo' ? 'text-yellow-300' : ''}`}
          >
            Thông báo
          </p>
          <p
            onClick={() => setType('Dịch vụ đã đăng ký')}
            className={`cursor-pointer ${type === 'Dịch vụ đã đăng ký' ? 'text-yellow-300' : ''}`}
          >
            Dịch vụ đã đăng ký
          </p>
        </div>
      </div>
      <div className="flex-1 p-6 border rounded-md bg-white">
        {type === 'Chỉnh sửa thông tin' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin cá nhân</h2>
            <div className="flex gap-6">
              <img
                src="https://genk.mediacdn.vn/2018/2/16/photo-1-15187575078491091832460.jpg"
                alt=""
                className="w-36 h-36 object-cover rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{user?.username}</h3>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Số điện thoại: {user.phone}</p>
              </div>
            </div>
          </div>
        )}
        {type === 'Thông báo' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông báo</h2>
            <p className="text-2xl text-center text-gray-600">Chưa có thông báo nào</p>
          </div>
        )}
        {type === 'Dịch vụ đã đăng ký' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Dịch vụ đã đăng ký</h2>
            <div className="border w-full text-lg">
              {result?.data?.map((order) => (
                <div key={order.id} className="p-4 border-b">
                  <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <p className="flex gap-2">
                        Tên dịch vụ: <span className="font-semibold">{order.service.name}</span>
                      </p>
                      <p className="flex gap-2">
                        Số bài đăng: <span className="font-semibold">{order.service.postAmount}</span>
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="flex gap-2">
                        Trạng thái: <span className="font-semibold">{order.status}</span>
                      </p>
                      <p className="flex gap-2">
                        Giá dịch vụ: <span>{order.service.price} VNĐ</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile