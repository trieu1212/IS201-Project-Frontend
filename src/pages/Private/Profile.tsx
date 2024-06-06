import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {user} = useSelector((state:any)=>state.app)
  return (
    <div className='w-[1100px] mx-auto'>
      <h2 className='text-[24px] font-semibold text-[#333]'>Thông tin cá nhân</h2>
      <div className='mt-4'>
        <div className='flex gap-4'>
          <div>
            <img src="https://via.placeholder.com/150" alt="" className='w-[150px] h-[150px] object-cover' />
          </div>
          <div>
            <h2 className='font-semibold text-[20px]'>
              {user?.username}
            </h2>
            <p className='text-[14px] text-[#333]'>Email:</p>
            <p className='text-[14px] text-[#333]'>Số điện thoại:</p>
            <p className='text-[14px] text-[#333]'>Địa chỉ:</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile