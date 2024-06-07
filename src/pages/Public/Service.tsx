import React, { useEffect } from 'react'
import { serviceApis } from '../../apis/ServiceApis'
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
            services?.data.length>0 && services?.data.map((service:IService)=>(
                <div key={service.id} className='border p-4 my-4'>
                    <h2 className='text-xl font-semibold'>{service.name}</h2>
                    <p>{service.description}</p>
                    <p>{service.price}</p>
                    <p>{service.postAmount}</p>
                    <p>{service.status}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Service