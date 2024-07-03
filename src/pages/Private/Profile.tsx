import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OrderApis } from '../../apis/OrderApis'
import { NotiApis } from '../../apis/NotiApis'
import ProfileModal from './ProfileModal'

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
  name: string
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
  const [notifies, setNotifies] = React.useState<any>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  useEffect(() => {
    const getNoti = async () => {
      const res = await NotiApis.getNotiByUser(String(user?.id))
      setNotifies(res.data)
    }
    getNoti()
  }, [])
  useEffect(() => {
    const getAllOrder = async () => {
      const res = await OrderApis.getAll()
      setResult(res.data)
    }
    getAllOrder()
  }, [showModal])

  return (
    <>
      {showModal && <ProfileModal user={user} showModal={showModal} setShowModal={setShowModal} />}
      <div className="max-w-6xl mx-auto flex gap-6 mt-6">
        <div className="w-1/3 p-6 bg-blue-900 rounded-md text-white h-[250px]">
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
              <div className='flex justify-between items-center'>
                <div className="flex gap-6">
                  <img
                    src="https://genk.mediacdn.vn/2018/2/16/photo-1-15187575078491091832460.jpg"
                    alt=""
                    className="w-36 h-36 object-cover rounded-full"
                  />
                  <div>
                    <div className='flex gap-2 items-center'>
                    <h3 className="text-xl font-semibold">Tên tài khoản:</h3><span>{user?.name}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                    <h3 className="text-xl font-semibold">Nickname:</h3><span>{user?.username}</span>
                    </div>
                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                    <p className="text-sm text-gray-600">Số điện thoại: {user?.phone}</p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md h-[50px]"
                  onClick={() => setShowModal(true)}
                >Chỉnh sửa</button>
              </div>
            </div>
          )}
          {type === 'Thông báo' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông báo</h2>
              {notifies.length === 0 && <p>Không có thông báo nào</p>}
              {notifies.length > 0 && (
                <div className="divide-y divide-gray-200">
                  {notifies.map((item: any, index: number) => (
                    <div key={index} className="py-4 border p-2">
                      <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                      <p className="text-gray-600 mt-2">{item.message}</p>
                    </div>
                  ))}
                </div>
              )}
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
                          Giá dịch vụ: <span>{order.service.price} triệu</span>
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
    </>
  )
}

export default Profile