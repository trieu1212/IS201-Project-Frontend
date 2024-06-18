import React, { useEffect } from 'react'
import { serviceApis } from '../../apis/ServiceApis'
import { Button } from '../../components'
interface IService {
    id:number
    name:string
    description:string
    dateTime:number
    price:number
    postAmount:number
    status:boolean
}
interface IServiceApiResult {
    data:IService[],
    total:number,
    currentPage:number,
    nextPage:number|null,
    prevPage:number|null,
    lastPage:number
}
const Service = () => {
    const [services, setServices] = React.useState<IServiceApiResult>()
    useEffect(()=>{
        const getAllServices = async()=>{
            const response = await serviceApis.getAll({itemPerPage:'3',page:'1'})
            setServices(response.data)
        }
        getAllServices()
    },[])
  return (
    <div className='w-[1100px] mx-auto mt-12'>
        {services?.data.length===0 && <div className='text-center font-bold text-[36px]'>Không có dữ liệu</div>}
        {
            services?.data?.length>0 && services?.data.map((service:IService)=>(
                <div key={service.id} className='border p-4 my-4 flex items-center justify-between'>
                    <div>
                        <h2 className='text-xl font-semibold'>{service.name}</h2>
                        <p>Mô tả: {service.description}</p>
                        <p>Giá dịch vụ: {service.price}</p>
                        <p>Số lượng bài đăng của dịch vụ: {service.postAmount}</p>
                    </div>
                    <div>
                        <Button 
                            name='Mua ngay' 
                            style='bg-blue-500 p-2 rounded-sm text-white text-[20px] hover:bg-blue-600' 
                        />
                    </div>
                    {/* <p>{service.status}</p> */}
                </div>
            ))
        }
    </div>
  )
}

export default Service