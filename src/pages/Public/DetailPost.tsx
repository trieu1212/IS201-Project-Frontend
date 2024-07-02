import React from 'react'
import { useParams } from 'react-router-dom'
import { PostApis } from '../../apis/PostApis'
import { Icons } from '../../ultils/Icons'
interface IImages {
    imageUrl: string
    id: number
}
interface IUser {
    id: number
    username: string
    email: string
    phone: string
    avatar: string
}
interface IPost {
    id: number
    name: string
    description: string
    images: IImages[]
    price: number
    address: string
    arcreage: number
    user: IUser
    serviceId: number
}
const DetailPost = () => {
    const id = useParams<{ id: string }>().id
    const {FaPhone,SiZalo, FaRegHeart, GoDotFill,IoMail } = Icons
    const [post, setPost] = React.useState<IPost | null>(null)
    React.useEffect(() => {
        const getPost = async () => {
            const res = await PostApis.getOne(String(id))
            setPost(res.data)
        }
        getPost()
    }, [id])
    return (
        <div className="container w-[1100px] mx-auto py-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4 flex flex-col gap-8">
            <div className="flex flex-col gap-4 border-b pb-4">
                <img src={post?.images[0].imageUrl} className="w-full h-64 object-cover mx-auto" alt="Main Image" />
                <div className="flex gap-4 mx-auto overflow-x-auto">
                    {post?.images.map((image, index) => (
                        <img key={index} src={image.imageUrl} className="w-24 h-24 object-cover" alt={`Image ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl text-red-500">{post?.name}</h1>
                <section>
                    <h2 className="text-xl font-semibold mb-2">Thông tin mô tả</h2>
                    <div>
                        <p className="text-lg font-semibold">1. Vị trí</p>
                        <p className="text-lg">-- {post?.address}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">2. Mô tả</p>
                        <p className="text-lg">-- Diện tích {post?.arcreage} m<sup>2</sup></p>
                        <p className="text-lg">-- Mô tả chi tiết: {post?.description}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">3. Giá</p>
                        <p className="text-lg">-- {post?.price} triệu/tháng</p>
                        <p className="text-lg">-- Khách dùng bao nhiêu điện, nước thì trả tiền bấy nhiêu theo đồng hồ</p>
                        <p className="text-lg">-- Wifi + Tiền rác: 80.000 VND/ 1 phòng/ tháng</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">4. Tiện ích:</p>
                        <ul className="pl-4 list-disc text-lg">
                            <li>Được phép nấu ăn trong phòng</li>
                            <li>Giờ giấc tự do, không chung chủ</li>
                            <li>Phòng để xe tầng trệt miễn phí</li>
                            <li>Có camera an ninh</li>
                            <li>Có đồng hồ điện, nước riêng</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">5. Liên hệ</p>
                        <p className="text-lg">- Số điện thoại: {post?.user.phone || "Chưa có thông tin"}</p>
                        <p className="text-lg">- Email: {post?.user.email}</p>
                    </div>
                </section>
            </div>
        </div>
        <div className="md:w-1/4 h-[500px] border bg-yellow-500 p-4 rounded-lg flex flex-col items-center gap-4">
            <img 
                src={post?.user.avatar || "https://phongtro123.com/images/default-user.png"} 
                alt="User Avatar" 
                className="w-24 h-24 rounded-full" 
            />
            <p className="text-2xl font-semibold">{post?.user.username}</p>
            <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-green-500" />
                <span className="text-lg">Đang hoạt động</span>
            </div>
            <button className="bg-green-400 text-white w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-600">
                <FaPhone size={20} />
                <span className="text-lg">{post?.user.phone || "000000000"}</span>
            </button>
            <button className="bg-white text-black w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
                <IoMail size={20} />
                <span className="text-lg">{post?.user.email || "Chưa có thông tin"}</span>
            </button>
            <button className="bg-white text-black w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
                <SiZalo size={30} />
                <span className="text-lg">Nhắn ZALO</span>
            </button>
            <button className="bg-white text-black w-full py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
                <FaRegHeart size={20} />
                <span className="text-lg">Yêu thích</span>
            </button>
        </div>
    </div>
    )
}

export default DetailPost