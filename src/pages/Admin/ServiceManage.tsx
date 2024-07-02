import React from 'react'
import { serviceApis } from '../../apis/ServiceApis'
import { Button } from '../../components'
import ServiceModal from './ServiceModal'
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
const ServiceManage = () => {
    const [services, setServices] = React.useState<IServiceApiResult | null >(null)
    const [showModal,setShowModal] = React.useState<boolean>(false)
    const [type, setType] = React.useState<'add' | 'edit'>('add');
    const [selectedService, setSelectedService] = React.useState<IService | null>(null);
    const getAllServices = async()=>{
        const response = await serviceApis.getAll({itemPerPage:'3',page:'1'})
        setServices(response.data)
    }
    React.useEffect(()=>{
        getAllServices()
    },[showModal])
    const handleAdd = () => {
        setType('add');
        setSelectedService(null);
        setShowModal(true);
      };
    
      const handleEdit = (service: IService) => {
        setType('edit');
        setSelectedService(service);
        setShowModal(true);
      };
    
      const handleDelete = async (id: string) => {
        await serviceApis.delete(id);
        toast.success('Xóa dịch vụ thành công');    
        getAllServices();
      };
    
  return (
    <>
      {showModal && (
        <ServiceModal
          type={type}
          setShowModal={setShowModal}
          serviceData={selectedService}
        />
      )}
      <div className="container mx-auto mt-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
          <Button
            name="Thêm dịch vụ"
            style="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            handleSubmit={handleAdd}
          />
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-center">ID</th>
              <th className="py-2 px-4 border text-center">Tên dịch vụ</th>
              <th className="py-2 px-4 border text-center">Mô tả</th>
              <th className="py-2 px-4 border text-center">Giá</th>
              <th className="py-2 px-4 border text-center">Số bài đăng</th>
              <th className="py-2 px-4 border text-center">Trạng thái</th>
              <th className="py-2 px-4 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services?.data.map((service) => (
              <tr key={service.id}>
                <td className="py-2 px-4 border text-center align-middle">{service.id}</td>
                <td className="py-2 px-4 border text-center align-middle">{service.name}</td>
                <td className="py-2 px-4 border text-center align-middle">{service.description}</td>
                <td className="py-2 px-4 border text-center align-middle">{service.price}</td>
                <td className="py-2 px-4 border text-center align-middle">{service.postAmount}</td>
                <td className="py-2 px-4 border text-center align-middle">
                  {service.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                </td>
                <td className="py-2 px-4 border text-center align-middle flex gap-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(service)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(String(service.id))}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ServiceManage