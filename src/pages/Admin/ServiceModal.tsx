import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { serviceApis } from '../../apis/ServiceApis';
interface IProps {
  type: 'add' | 'edit';
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  serviceData?: IService; 
  handleSubmit: (service: IService) => void; 
}

interface IService {
  id?: number;
  name: string;
  description: string;
  dateTime: number;
  price: number;
  postAmount: number;
  status: boolean;
}
const ServiceModal:React.FC<IProps> =  ({ type, setShowModal, serviceData}) => {
    const [service, setService] = useState<IService>({
        id: serviceData?.id || undefined,
        name: serviceData?.name || '',
        description: serviceData?.description || '',
        dateTime: serviceData?.dateTime || Date.now(),
        price: serviceData?.price || 0,
        postAmount: serviceData?.postAmount || 0,
        status: serviceData?.status || false,
      });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setService({
          ...service,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
    
      const handleSubmit =  async() => {
        if (type == 'add') {
            if (service.name === '' || service.description === '' || service.price === 0 || service.postAmount === 0) {
                toast.error('Vui lòng điền đầy đủ thông tin');
            }
            else{
                setService({
                    ...service,
                    dateTime: Date.now(),
                });
                await serviceApis.create(service);
                toast.success('Thêm dịch vụ thành công');
            }
        }
        else {
            if (service.name === '' || service.description === '' || service.price === 0 || service.postAmount === 0) {
                toast.error('Vui lòng điền đầy đủ thông tin');
            }
            else{
                setService({
                    ...service,
                    dateTime: Date.now(),
                });
                await serviceApis.update(service?.id.toString(), service);
                toast.success('Sửa dịch vụ thành công');
            }
        }
        setShowModal(false);
      };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">{type === 'add' ? 'Thêm dịch vụ' : 'Sửa dịch vụ'}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
            <input
              type="text"
              name="name"
              value={service.name}
              onChange={handleChange}
              className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              name="description"
              value={service.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Giá</label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số bài đăng</label>
            <input
              type="number"
              name="postAmount"
              value={service.postAmount}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">Trạng thái</label>
            <input
              type="checkbox"
              name="status"
              checked={service.status}
              onChange={handleChange}
              className="rounded p-2 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              {type === 'add' ? 'Thêm' : 'Sửa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceModal