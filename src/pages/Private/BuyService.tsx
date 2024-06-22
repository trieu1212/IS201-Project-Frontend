import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { serviceApis } from '../../apis/ServiceApis'
import  timestampToString  from '../../ultils/Helpers'
interface IService {
  id:number
  name:string
  description:string
  dateTime:number
  price:number
  postAmount:number
  status:boolean
}

const BuyService = () => {
    const {user} = useSelector((state:any)=>state.app)
    const id = useParams<{id:string}>().id
    const [service, setService] = React.useState<IService>()
    useEffect(()=>{
      const getOneService = async()=>{
        const res = await serviceApis.getOne(id||null)
        setService(res.data)
      }
      getOneService()
    },[id])
    console.log(service)
  return (
    <div className='flex w-[1100px] py-2 mx-auto gap-4'>
        <div className='w-[40%] h-[280px] flex flex-col gap-4 items-center border rounded-md shadow-lg py-4'>
          <h1 className='font-semibold text-[24px]'>Thông tin dịch vụ</h1>
          <div>
            <p>Tên dịch vụ: {service?.name}</p>
            <p>Giá: {service?.price}</p>
            <p>Mô tả: {service?.description}</p>
            <p>Số ngày hiệu lực: {service?.dateTime} ngày</p>
            <p>Số bài đăng: {service?.postAmount}</p>
            <p>Trạng thái: {service?.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 items-center border rounded-md shadow-lg py-4 w-full'>
          <h2 className='font-semibold text-[24px]'>Thông tin thanh toán</h2> 
          <p>Tên người dùng: {user?.username}</p>
          <p>Email: {user?.email}</p>
          <p>Số điện thoại: {user?.phoneNumber}</p>
          <p>Ngày thanh toán: {timestampToString(Date.now(),"HH:mm DD:MM:YYYY")}</p>
        </div>
    </div>
  )
}

export default BuyService