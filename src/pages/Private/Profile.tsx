import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state: any) => state.app)
  const [type, setType] = React.useState<string>('Chỉnh sửa thông tin')

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
          </div>
        )}
        {type === 'Dịch vụ đã đăng ký' && (
          <div>
            <h2 className='text-[24px] font-semibold text-[#333]'>Dịch vụ đã đăng ký</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile