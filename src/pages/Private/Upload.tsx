import React from 'react'
import { Button, InputField } from '../../components'
import { OrderApis } from '../../apis/OrderApis'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PostApis } from '../../apis/PostApis'
import { CreatePost } from '../../types/CreatePost'
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
interface IUser {
  name: string
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
const Upload = () => {
  const [result, setResult] = React.useState<IPostApiResult | null>(null)
  const { user } = useSelector((state: any) => state.app)
  const [postName, setPostName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [acreage, setAcreage] = React.useState<string>('')
  const [roomType, setRoomType] = React.useState<string>('')
  const [imageUrls, setImageUrls] = React.useState<string[]>([])
  const [address, setAddress] = React.useState<string>('')
  const [serviceId, setServiceId] = React.useState<number | null>(null);
  const [price, setPrice] = React.useState<number | null>(null)
  const navigate = useNavigate()
  const getBoughtServices = async () => {
    const res = await OrderApis.getAll()
    setResult(res.data)
  }
  React.useEffect(() => {
    getBoughtServices()
  }, [])
  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  }
  const handleAddImageUrl = () => {
    setImageUrls((prevUrls) => [...prevUrls, '']);
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const handleRemoveImageUrl = (index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
  };
  const validateFields = () => {
    if (!postName || !description || !acreage || !roomType || !address || serviceId === null || imageUrls.length === 0) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return false
    }
    if (isNaN(Number(acreage)) || Number(acreage) <= 0) {
      toast.error('Diện tích phải là một số dương')
      return false
    }
    if (price !== null && (isNaN(price) || price <= 0)) {
      toast.error('Giá phải là một số dương')
      return false
    }
    if (!imageUrls.every(url => url.startsWith('http'))) {
      toast.error('URL hình ảnh không hợp lệ')
      return false
    }
    return true
  }
  const handleUpload = async () => {
    if (!validateFields()) {
      return
    }
    else {
      const data: CreatePost = {
        name: postName,
        arcreage: acreage,
        description,
        price,
        roomType,
        address,
        serviceId,
        imageUrls
      }
      try {
         await PostApis.create(data)
        toast.success('Đăng bài đăng thành công')
        navigate('/thank')
      } catch (error) {
        toast.error('Đăng bài đăng thất bại')
      }
    }
  }
  const uniqueServices = React.useMemo(() => {
    const serviceMap = new Map<string, IService>();
    result?.data.forEach(order => {
      if (!serviceMap.has(order.service.name)) {
        serviceMap.set(order.service.name, order.service);
      }
    });
    return Array.from(serviceMap.values());
  }, [result]);
  return (
    <div className='mx-auto w-[1100px] flex gap-4'>
      <div className='p-2'>
        <h1 className='font-semibold text-[24px] text-center'>Đăng bài đăng</h1>
        <div className='py-2'>
          <div className='flex gap-3 mb-3'>
            <h1 className='font-semibold text-[20px]'>Khu vực</h1>
            <select name="" id="" className='border rounded-md px-2' onChange={(e) => setAddress(e.target.value)}>
              <option value="">Chọn khu vực</option>
              <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
              <option value="Thành phố Hà Nội">Thành phố Hà Nội</option>
              <option value="Thành phố Đà Nẳng">Thành phố Đà Nẳng</option>
            </select>
          </div>
          <p className='font-semibold text-[20px]'>Địa chỉ chính xác</p>
          <input
            type="text"
            className='w-full h-[40px] border border-gray-300 rounded-md px-2'
          />
        </div>
        <hr />
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-[24px] text-center'>Thông tin bài đăng</h1>
          <div className='flex items-center gap-4'>
            <p className='font-semibold'>Tên bài đăng</p>
            <InputField
              type='text'
              placeholder='Nhập tên bài đăng'
              data={postName}
              setData={setPostName}
            />
          </div>
          <div>
            <p className='font-semibold'>Mô tả</p>
            <textarea name="" id="" cols={90} rows={5} className='border p-2' onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <p className='font-semibold'>Diện tích</p>
            <div className='flex items-center gap-2'>
              <InputField
                type='text'
                placeholder='Nhập diện tích'
                data={acreage}
                setData={setAcreage}
              />
              <span>m<sup>2</sup></span>
            </div>
          </div>
          <div>
            <p className='font-semibold'>Loại phòng</p>
            <InputField
              type='text'
              placeholder='Nhập loại phòng'
              data={roomType}
              setData={setRoomType}
            />
          </div>
          <div>
            <p className='font-semibold'>Giá</p>
            <div className='flex gap-3 items-center'>
              <InputField
                type='text'
                placeholder='Nhập giá'
                data={price}
                setData={setPrice}
              />
              <span>triệu/tháng</span>
            </div>
          </div>
          <div className='flex gap-3'>
            <span className='font-semibold'>Dịch vụ bài đăng</span>
            <select name="" id="" className='border' onChange={(e) => setServiceId(Number(e.target.value))}>
              <option value="">Chọn dịch vụ</option>
              {uniqueServices.map((item) => {
                return (
                  <option value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Hình ảnh bài đăng</p>
            <div className="flex flex-col gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="w-[250px] h-[40px] border border-gray-300 rounded-md px-2"
                  />
                  {url && (
                    <img
                      src={url}
                      alt={`Image ${index}`}
                      className="w-[120px] h-[100px] object-cover rounded-md"
                    />
                  )}
                  {index === imageUrls.length - 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-[20px]"
                      onClick={() => handleRemoveImageUrl(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="text-blue-500" onClick={handleAddImageUrl}>
                Thêm URL
              </button>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <Button
            style='bg-blue-500 text-white w-full h-[40px] rounded-md hover:bg-blue-600'
            name='Đăng ngay'
            handleSubmit={handleUpload}
          />
        </div>
      </div>
      <hr />
      <div className='bg-red-300 rounded-lg h-[200px] p-2 flex flex-col'>
        <h1 className='font-semibold text-[24px] text-center'>Thông tin người đăng</h1>
        <div className='flex gap-3'>
          <span className='font-semibold '>Tên người đăng: </span>
          <span>
            {user.name}
          </span>
        </div>
        <div className='flex gap-3'>
          <span className='font-semibold'>Email: </span>
          <span>
            {user.email}
          </span>
        </div>
        <div className='flex gap-3'>
          <span className='font-semibold'>Số bài đăng khả dụng: </span>
          <span>
            {user.postAmount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Upload