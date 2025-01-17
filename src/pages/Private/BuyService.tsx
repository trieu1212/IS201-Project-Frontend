import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serviceApis } from '../../apis/ServiceApis'
import timestampToString from '../../ultils/Helpers'
import { InputField } from '../../components'
import { CreateOrder } from '../../types/CreateOrder'
import { OrderApis } from '../../apis/OrderApis'
import { toast } from 'react-toastify'
import { userApis } from '../../apis/UserApis'
import { getCurrentUser, loginSuccess } from '../../redux/slice/appSlice'
import { NotiApis } from '../../apis/NotiApis'
import { addDays, format } from 'date-fns';
interface IService {
  id: number
  name: string
  description: string
  dateTime: number
  price: number
  postAmount: number
  status: boolean
}

const BuyService = () => {
  const { user } = useSelector((state: any) => state.app)
  const id = useParams<{ id: string }>().id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [service, setService] = React.useState<IService>()
  const [email, setEmail] = React.useState<string>(user?.email || '')
  const [phoneNumber, setPhoneNumber] = React.useState<string>(user?.phone || '')
  const getUser = async () => {
    const res = await userApis.getUser(user?.id)
    dispatch(getCurrentUser(res.data))
  }
  const handleBuyService = async () => {
    const today = new Date();
    const dateStart = format(today, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const dateEnd = format(addDays(today, service?.dateTime || 0), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const data: CreateOrder = {
      serviceId: Number(service?.id),
      userId: user.id,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
    try {
      await OrderApis.createOrder(data)
      toast.success("Mua dịch vụ thành công!")
      await getUser()
      await handleCreateNotification()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  const handleCreateNotification = async () => {
    const data = {
      userId: user?.id,
      title: 'Cảm ơn quý khách đã mua dịch vụ của chúng tôi!',
      message: `Bạn đã mua dịch vụ ${service?.name} với số tiền ${service?.price} triệu`,
      type: 'success'
    }
    try {
      await NotiApis.createNoti(data)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    const getOneService = async () => {
      const res = await serviceApis.getOne(id || null)
      setService(res.data)
    }
    getOneService()
  }, [id])
  const today = new Date();
  const dateStart = format(today, "dd-MM-yyyy");
  const dateEnd = format(addDays(today, service?.dateTime || 0), "dd-MM-yyyy");
  return (
    <div className='flex w-full md:w-[1100px] py-2 mx-auto gap-4'>
      <div className='w-full md:w-[40%] h-auto flex flex-col gap-4 items-center border rounded-md shadow-lg py-4'>
        <h1 className='font-semibold text-[24px]'>Thông tin dịch vụ</h1>
        <div className='p-2'>
          <p>Tên dịch vụ: {service?.name}</p>
          <p>Giá: {service?.price}</p>
          <p>Mô tả: {service?.description}</p>
          <p>Số ngày hiệu lực: {service?.dateTime} ngày</p>
          <p>Ngày hiệu lực: Từ {dateStart} đến {dateEnd}</p>
          <p>Số bài đăng: {service?.postAmount}</p>
          <p>Trạng thái: {service?.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
        </div>
      </div>
      <div className='flex flex-col gap-4 border rounded-md shadow-lg py-4 px-6 w-[60%]'>
        <h2 className='font-semibold text-[24px]'>Thông tin thanh toán</h2>
        <p>Tên người dùng: {user?.username}</p>
        <div className='flex items-center gap-16'>
          <p>Email: </p>
          <InputField
            data={email}
            setData={setEmail}
            type='text'
          />
        </div>
        <div className='flex items-center gap-3'>
          <p>Số điện thoại: </p>
          <InputField
            data={phoneNumber}
            setData={setPhoneNumber}
            type='text'
          />
        </div>
        <p>Ngày thanh toán: {timestampToString(Date.now(), "HH:mm DD:MM:YYYY")}</p>
        <div className='flex gap-4'>
          <button
            className='p-2 bg-blue-300 rounded-lg hover:bg-blue-600 hover:text-white'
            onClick={handleBuyService}
          >
            Thanh toán
          </button>
          <button
            className='p-2 bg-red-400 rounded-lg hover:bg-red-600 hover:text-white'
            onClick={() => navigate("/service")}
          >
            Quay về
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyService