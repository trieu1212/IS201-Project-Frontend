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
    <div className='w-[1100px] mx-auto flex gap-4 mt-4 '>
      <div className='w-[30%] p-6 bg-[#13308E] rounded-md text-white h-[250px]'>
        <h2 className='text-[24px] text-center mb-4'>Cài đặt</h2>
        <div className='flex flex-col gap-4'>
          <p
            onClick={() => setType('Chỉnh sửa thông tin')}
            className={`cursor-pointer ${type === 'Chỉnh sửa thông tin' ? 'text-[#FFD700]' : ''}`}
          >Chỉnh sửa thông tin</p>
          <p
            onClick={() => setType('Thông báo')}
            className={`cursor-pointer ${type === 'Thông báo' ? 'text-[#FFD700]' : ''}`}
          >Thông báo</p>
          <p
            onClick={() => setType('Dịch vụ đã đăng ký')}
            className={`cursor-pointer ${type === 'Dịch vụ đã đăng ký' ? 'text-[#FFD700]' : ''}`}
          >Dịch vụ đã đăng ký</p>
        </div>
      </div>
      <div className='border-gray-400 p-4'>
        {type === 'Chỉnh sửa thông tin' && (
          <div>
            <h2 className='text-[24px] font-semibold text-[#333]'>Thông tin cá nhân</h2>
            <div className='mt-4'>
              <div className='flex gap-4'>
                <div>
                  <img src="https://genk.mediacdn.vn/2018/2/16/photo-1-15187575078491091832460.jpg" alt="" className='w-[150px] h-[150px] object-cover' />
                </div>
                <div>
                  <h2 className='font-semibold text-[20px]'>
                    {user?.username}
                  </h2>
                  <p className='text-[14px] text-[#333]'>Email: {user.email}</p>
                  <p className='text-[14px] text-[#333]'>Số điện thoại: {user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {type === 'Thông báo' && (
          <div>
            <h2 className='text-[24px] font-semibold text-[#333]'>Thông báo</h2>
            <div>
              <p className='font-semibold text-[32px] text-center'>Chưa có thông báo nào</p>
            </div>
          </div>
        )}
        {type === 'Dịch vụ đã đăng ký' && (
          <div>
            <h2 className='text-[24px] font-semibold text-[#333] text-center'>Dịch vụ đã đăng ký</h2>
            <div className='border w-full mx-auto text-[20px]'>
              {result?.data?.map((order) => {
                return (
                  <div key={order.id} className='p-2'>
                    <h1>Đơn hàng #{order.id}</h1>
                    <div className='flex gap-4'>
                      <div>
                      <div className='flex gap-2'>
                        Tên dịch vụ:
                        <span className='font-semibold'> {order.service.name} </span>
                      </div>
                      <div className='flex gap-2'>
                        Số bài đăng: 
                        <span className='font-semibold'>
                          {order.service.postAmount}
                        </span>
                      </div>
                      </div>   
                      <div className='flex gap-2'>
                        Trạng thái: 
                        <span className='font-semibold'>
                          {order.status}
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        Giá dịch vụ:
                        <span>
                          {order.service.price} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile