import React, { useEffect } from 'react'
import { serviceApis } from '../../apis/ServiceApis'
import { Button } from '../../components'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
interface IService {
  id: number
  name: string
  description: string
  dateTime: number
  price: number
  postAmount: number
  status: boolean
}
interface IServiceApiResult {
  data: IService[],
  total: number,
  currentPage: number,
  nextPage: number | null,
  prevPage: number | null,
  lastPage: number
}
const Service = () => {
  const { user } = useSelector((state: any) => state.app)
  const [services, setServices] = React.useState<IServiceApiResult | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getAllServices = async () => {
      const response = await serviceApis.getAll({ itemPerPage: '3', page: '1' })
      setServices(response.data)
    }
    getAllServices()
  }, [])
  const handleBuyService = async (id: number) => {
    if (user) {
      navigate(`/private/buy-service/${id}`)
    }
    else {
      toast.error('Vui lòng đăng nhập để mua dịch vụ')
    }
  }
  return (
    <div className="container w-[1100px] mx-auto mt-12">
      {services?.data.length === 0 && <div className="text-center font-bold text-3xl">Không có dữ liệu</div>}
      {services &&
        services.data.length > 0 &&
        services.data
          .filter((service) => service.status)
          .map((service: IService) => (
            <div
              key={service.id}
              className={`border p-4 my-4 flex items-center justify-between ${service.status ? 'border-yellow-500' : 'border-gray-300'
                }`}
            >
              <div>
                <h2 className={`text-xl font-semibold ${service.name == 'Gói Kim Cương' && "text-red-600" ||service.name == 'Gói VIP' && "text-yellow-600" }`}>{service.name}</h2>
                <p className="text-gray-700">Mô tả: {service.description}</p>
                <p className="text-gray-700">Giá dịch vụ: {service.price} triệu</p>
                <p className="text-gray-700">Số lượng bài đăng của dịch vụ: {service.postAmount}</p>
                <p>Thời hạn: {service.dateTime} ngày</p>
                <span className={`${service.status ? 'text-yellow-500' : 'text-gray-500'} font-semibold`}>
                  {service.name == "Gói Vip" || service.name== "Gói Kim Cương" ? 'VIP' : 'Cơ bản'}
                </span>
                
              </div>
              <div>
                <Button
                  name="Mua ngay"
                  style={`bg-blue-500 p-2 rounded-sm text-white text-lg hover:bg-blue-600 ${service.status ? 'ring-yellow-500' : 'ring-blue-500'
                    }`}
                  handleSubmit={() => handleBuyService(service.id)}
                />
              </div>
            </div>
          ))}
    </div>
  )
}

export default Service