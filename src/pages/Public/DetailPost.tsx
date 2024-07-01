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
    const [post, setPost] = React.useState<IPost>()
    React.useEffect(() => {
        const getPost = async () => {
            const res = await PostApis.getOne(String(id))
            setPost(res.data)
        }
        getPost()
    }, [id])
    console.log(post)
    return (
        <div className='mx-auto w-[1100px] py-4 flex gap-4'>
            <div className='w-[70%] flex flex-col gap-4'>
                <div className='flex flex-col gap-4pb-2 border-b'>
                    <img src={post?.images[0].imageUrl} className='w-[400px] h-[250px] mx-auto py-2 border-b' alt="" />
                    <div className='flex gap-4 mx-auto'>
                        {post?.images.map((image, index) => (
                            <img key={index} src={image.imageUrl} className='w-[100px]' alt="" />
                        ))}
                    </div>
                </div>
                <div>
                    <div className='flex gap-4'>
                        <p className='text-red-500 text-[28px]'>{post?.name}</p>
                    </div>
                    <h1 className=' font-semibold text-[20px] my-2'>Thông tin mô tả</h1>
                    <div>
                        <p className='font-semibold text-[28px]'>1.Vị trí</p>
                        <ul>
                            <li className='text-[20px]'>
                                -- {post?.address}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='font-semibold text-[28px]'>2.Mô tả</p>
                        <ul>
                            <li className='text-[20px]'>
                                -- Diện tích {post?.arcreage} m<sup>2</sup>
                            </li>
                            <li>
                                <span className='text-[20px]'>-- Mô tả chi tiết: </span>
                                {post?.description}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='font-semibold text-[28px]'>3.Giá</p>
                        <ul>
                            <li className='text-[20px]'>
                                -- {post?.price} triệu/tháng
                            </li>
                            <li className='text-[20px]'>
                                -- Khách dùng bao nhiêu điện, nước thì trả tiền bấy nhiêu theo đồng hồ
                            </li>
                            <li className='text-[20px]'>
                                -- Wifi + Tiền rác: 80.000 VND/ 1 phòng/ tháng
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='font-semibold text-[28px]'>4. Tiện ích:</p>
                        <p className='pl-4 text-[20px]'>- Được phép nấu ăn trong Phòng</p>
                        <p className='pl-4 text-[20px]'>- Giờ giấc tự do, không chung chủ.</p>
                        <p className='pl-4 text-[20px]'>- Phòng để xe tầng trệt miễn phí  </p>
                        <p className='pl-4 text-[20px]'>- Có camera an ninh</p>
                        <p className='pl-4 text-[20px]'>- Có đồng hồ điện, nước riêng</p>
                    </div>
                    <div>
                        <p className='font-semibold text-[28px]'>5. Liên hệ</p>
                        <p className='pl-4 text-[20px]'>- Số điện thoại: {post?.user.phone ? post?.user.phone : "Chưa có thông tin"}</p>
                        <p className='pl-4 text-[20px]'>- Email: {post?.user.email}</p>
                    </div>
                </div>
            </div>
            <div className='w-[30%] border bg-yellow-500 h-[460px] rounded-lg'>
                <img 
                    src={post?.user.avatar ? post?.user.avatar : "https://phongtro123.com/images/default-user.png"} 
                    alt=""
                    className='w-[100px] h-[100px] rounded-full mx-auto mt-4' 
                />
                <p className='font-semibold text-[24px] text-center mt-2'>{post?.user.username}</p>
                <div>
                    <p className=' mx-auto rounded-md w-[300px] p-1 text-black flex gap-2 items-center mt-2 justify-center'>
                        <GoDotFill size={20} color='green'/>
                        <span>Đang hoạt động</span>
                    </p>
                </div>
                <p className='bg-green-400 mx-auto rounded-md w-[300px] p-3 text-white flex gap-2 items-center mt-2 cursor-pointer hover:bg-green-600 justify-center'>
                    <FaPhone size={20}/>
                    <span className='text-[20px]'>
                        {post?.user.phone ? post.user.phone : "000000000"}
                    </span>
                </p>
                <p className='bg-white text-black mx-auto rounded-md w-[300px] p-3  flex gap-2 items-center mt-2 cursor-pointer hover:bg-gray-200 justify-center'>
                    <IoMail size={20}/>
                    <span className='text-[18px] hover:underline'>
                        {post?.user.email ? post.user.email : "Chưa có thông tin"}
                    </span>
                </p>
                <p className='bg-white text-black mx-auto rounded-md w-[300px] p-3  flex gap-2 items-center mt-2 cursor-pointer hover:bg-gray-200 justify-center'>
                    <SiZalo size={30}/>
                    <span className='text-[18px] hover:underline'>
                        Nhắn ZALO
                    </span>
                </p>
                <p className='bg-white text-black mx-auto rounded-md w-[300px] p-3  flex gap-2 items-center mt-2 cursor-pointer hover:bg-gray-200 justify-center'>
                    <FaRegHeart size={20}/>
                    <span className='text-[18px] hover:underline'>
                        Yêu thích
                    </span>
                </p>
            </div>
        </div>
    )
}

export default DetailPost