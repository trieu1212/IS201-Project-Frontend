import React, { useEffect, useState } from 'react'
import { PostApis } from '../../apis/PostApis'
import { QueryGetPost } from '../../types/QueryGetPosts'
import { Link } from 'react-router-dom'
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
    status: number
    user: IUser
    serviceId: number
}
interface IPostApiResult {
    data: IPost[],
    total: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number
}
const PostsManage = () => {
    const [result, setResult] = useState<IPostApiResult>()
    const query:QueryGetPost = {
        itemPerPage: '15',
        page: '1',
        search: '',
        roomType: '',
        address: '',
    } 
    useEffect(() => {
        const getAllPost = async () => {
            const response = await PostApis.getAll(query)
            setResult(response.data)
        }
        getAllPost()
    }, [])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">CÁC BÀI ĐÃ ĐĂNG</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {result?.data.map((post) => (
          <Link to={`/admin/approve-post/${post.id}`}>
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {post.images.length > 0 && (
              <img src={post.images[0].imageUrl} alt={post.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.name}</h3>
              <p className="text-red-500 text-sm mb-2">{post.price} triệu/tháng</p>
              <p className="text-sm text-gray-600">{post.address}</p>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PostsManage