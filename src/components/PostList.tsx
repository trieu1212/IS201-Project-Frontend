import React, { Fragment, useEffect, useState } from 'react'
import { PostApis } from '../apis/PostApis'
import { QueryGetPost } from '../types/QueryGetPosts'
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
interface IService{
    id:number
    name:string
    description:string
    price:number
    status:boolean
    dateTime:number
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
    service: IService
}
interface IPostApiResult {
    data: IPost[],
    total: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number
}
const PostList: React.FC<QueryGetPost> = ({ itemPerPage, page, search, roomType, address, setPage }) => {
    const [result, setResult] = useState<IPostApiResult>()
    useEffect(() => {
        const getAllPost = async () => {
            const response = await PostApis.getAll({ itemPerPage, page, search, roomType, address })
            setResult(response.data)
        }
        getAllPost()
    }, [address, itemPerPage, page, roomType, search])
    const VIP_SERVICE_ID = 1;
    const DIAMOND_SERVICE_ID = 2;
    const BASIC_SERVICE_ID = 3;
    return (
        <div className='container mx-auto pb-8'>
            {result?.data?.length === 0 && <p className='text-center text-[18px]'>Không có bài viết nào</p>}
            {result?.data
                ?.filter((post) => post.status === true)
                ?.map((post) => (
                    <Fragment key={post.id}>
                        <div 
                            className={`flex gap-4 border-b border-red-500 bg-[#FFF9F3] p-4 
                                ${post.service.id === VIP_SERVICE_ID ? "bg-[#ff6666]": "" }
                                ${post.service.id === DIAMOND_SERVICE_ID ? "bg-[#8b0000]": "" }
                                ${post.service.id === BASIC_SERVICE_ID ? "bg-[#d3d3d3]": "" }
                            `}   
                        >
                            <img
                                src={`${post.images.length > 0 ? `${post.images[0].imageUrl}` : "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/06/12/20240612-165737_1718187074.jpg"}`}
                                alt=''
                                className='w-[250px] h-[200px] object-cover'
                            />
                            <div>
                                <Link to={`/detail-post/${post.id}`}>
                                    <h2 className='font-semibold text-[18px] text-red-500 text-center mb-6 hover:underline cursor-pointer'>{post.name}</h2>
                                    <div className='float-end'>
                                    {post.service.id === VIP_SERVICE_ID && (
                                        <span className='ml-2 bg-yellow-500 text-white px-2 py-1 rounded'>VIP</span>
                                    )}
                                    {post.service.id === DIAMOND_SERVICE_ID && (
                                        <span className='ml-2 bg-blue-500 text-white px-2 py-1 rounded'>Kim Cương</span>
                                    )}
                                    {post.service.id === BASIC_SERVICE_ID && (
                                        <span className='ml-2 bg-gray-500 text-white px-2 py-1 rounded'>Cơ Bản</span>
                                    )}
                                    </div>
                                </Link>
                                <div className='flex justify-around gap-3'>
                                    <p className='text-[16px] text-[#25C784] font-semibold'>
                                        Diện tích: {post.arcreage}m<sup>2</sup>
                                    </p>
                                    <p className='text-[16px] font-semibold'>Địa chỉ: {post.address}</p>
                                    <p className='text-[16px] font-semibold '>Giá: {post.price} triệu/tháng</p>
                                </div>
                                <p className=' text-[#333] text-[14px] mt-4'>{post.description}</p>
                                <div className='flex justify-between border-t mt-2 border-red-200'>
                                    <span>Người đăng: {post?.user.username}</span>
                                    <span>SĐT: {post?.user.phone ? post?.user.phone : ""}</span>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            <div className='text-center'>
                <button
                    onClick={() => setPage && setPage(result?.prevPage || 1)}
                    disabled={!result?.prevPage}
                    className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 mr-4 hover:bg-red-600'
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage && setPage(result?.nextPage || 1)}
                    disabled={!result?.nextPage}
                    className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600'
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default PostList