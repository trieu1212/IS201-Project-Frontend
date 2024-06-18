import React, { Fragment, useEffect, useState } from 'react'
import { PostApis } from '../apis/PostApis'
import { QueryGetPost } from '../types/QueryGetPosts'
import { Link } from 'react-router-dom'

interface IImages {
    imageUrl: string
    id: number
}
interface IPost {
    id: number
    name: string
    description: string
    images: IImages[]
    price: number
    address: string
    arcreage: number
    userId: number
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
const PostList: React.FC<QueryGetPost> = ({ itemPerPage, page, search, roomType, address, setPage }) => {
    const [result, setResult] = useState<IPostApiResult>()
    useEffect(() => {
        const getAllPost = async () => {
            const response = await PostApis.getAll({ itemPerPage, page, search, roomType, address })
            setResult(response.data)
        }
        getAllPost()
    }, [address, itemPerPage, page, roomType, search])
    console.log(result)
    return (
        <div>
            {result?.data?.length === 0 && <p className='text-center text-[18px]'>Không có bài viết nào</p>}
            {result?.data?.map((post) => {
                return (
                    <Fragment key={post.id}>
                        <div className='flex gap-4 border-b border-red-500 bg-[#FFF9F3] p-4'>
                            <img src={`${post.images.length > 0 ? `${post.images[0].imageUrl}` : "https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/06/12/20240612-165737_1718187074.jpg"}`} alt="" className='w-[300px] h-[200px] object-cover' />
                            <div>
                                <Link to={`/detail-post/${post.id}`}>
                                    <h2
                                        className='font-semibold text-[18px] text-red-500 text-center mb-6 hover:underline cursor-pointer'
                                    >{post.name}</h2>
                                </Link>
                                <div className='flex justify-around gap-3'>
                                    <p className='text-[16px] text-[#25C784] font-semibold'>Diện tích: {post.arcreage}m<sup>2</sup></p>
                                    <p className='text-[16px] font-semibold'>Địa chỉ: {post.address}</p>
                                    <p className='text-[16px] font-semibold '>Giá: {post.price} VND</p>
                                </div>
                                <p className=' text-[#333] text-[14px] mt-4'>{post.description}</p>
                            </div>
                        </div>
                    </Fragment>
                )
            })}
            <div className='text-center'>
                <button
                    onClick={() => setPage(result?.prevPage || 1)}
                    disabled={result?.prevPage ? false : true}
                    className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 mr-4 hover:bg-red-600'
                >Prev</button>
                <button
                    onClick={() => setPage(result?.nextPage || 1)}
                    disabled={result?.nextPage ? false : true}
                    className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600'
                >Next</button>
            </div>
        </div>
    )
}

export default PostList