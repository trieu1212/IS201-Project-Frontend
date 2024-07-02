import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostApis } from '../../apis/PostApis'
import { Button } from '../../components'
import { toast } from 'react-toastify'
import { NotiApis } from '../../apis/NotiApis'
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
    status: boolean
    user: IUser
    serviceId: number
}
const DetailPostManage = () => {
    const id = useParams<{ id: string }>().id
    const [post,setPost] = React.useState<IPost | null>(null)
    const navigate = useNavigate()
    const getOnePost = async () => {
        const res = await PostApis.getOne(String(id))
        setPost(res.data)
    }
    useEffect(()=>{
        getOnePost()
    },[])
    const handleCreateNotiForApprove = async(id:any) => {
        const data = {
            userId: id,
            title: 'Bài đăng của bạn đã được duyệt',
            message: `Bài đăng #${post?.name} của bạn đã được duyệt và hiển thị trên hệ thống`,
            type: 'success'
          }
            await NotiApis.createNoti(data)
    }
    const handleCreateNotiForHide = async(id:any) => {
        const data = {
            userId: id,
            title: 'Bài đăng của bạn đã bị ẩn',
            message: `Bài đăng #${post?.name} của bạn đã bị ẩn khỏi hệ thống do không phù hợp với chính sách của chúng tôi`,
            type: 'error'
          }
            await NotiApis.createNoti(data)
    }
    const handleApprove = async() => {
        try {
            await PostApis.approve(Number(id))
            toast.success('Duyệt bài đăng thành công')
            handleCreateNotiForApprove(post?.user.id)
            navigate('/admin/posts')
        } catch (error) {
            toast.error('Duyệt bài đăng thất bại')
        }
    }
    const handleHide = async() => {
        try {
            await PostApis.hide(Number(id))
            toast.success('Ẩn bài đăng thành công')
            handleCreateNotiForHide(post?.user.id)
            navigate('/admin/posts')
        } catch (error) {
            toast.error('Ẩn bài đăng thất bại')
        }
    }
  return (
    <div className="container mx-auto mt-12 p-4">
            <h1 className="text-2xl font-bold mb-4">Chi tiết bài đăng</h1>
            <div className="bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Tên bài đăng: {post?.name}</h2>
                    <p><strong>Mô tả:</strong> {post?.description}</p>
                    <p><strong>Giá:</strong> {post?.price}</p>
                    <p><strong>Địa chỉ:</strong> {post?.address}</p>
                    <p><strong>Diện tích:</strong> {post?.arcreage} m²</p>
                    <p><strong>Trạng thái:</strong> {post?.status === 1 ? 'Hiện' : 'Ẩn'}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Hình ảnh:</h3>
                    <div className="flex gap-4">
                        {post?.images.map(image => (
                            <img key={image.id} src={image.imageUrl} alt="Post Image" className="w-32 h-32 object-cover" />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Người dùng:</h3>
                    <p><strong>Tên:</strong> {post?.user.username}</p>
                    <p><strong>Email:</strong> {post
                    ?.user.email}</p>
                    <p><strong>Số điện thoại:</strong> {post?.user.phone}</p>
                </div>
                {post?.status === false && (
                    <Button 
                    name="Duyệt bài đăng" 
                    style="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    handleSubmit={handleApprove}
                    />
                )}
                {
                    post?.status === true && (
                        <Button 
                        name="Ẩn bài đăng" 
                        style="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        handleSubmit={handleHide}
                        />
                    )
                }
            </div>
        </div>
  )
}

export default DetailPostManage