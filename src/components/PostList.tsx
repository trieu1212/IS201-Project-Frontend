import React, { Fragment, useEffect, useState } from 'react'
import { PostApis } from '../apis/PostApis'
import { QueryGetPost } from '../types/QueryGetPosts'
interface IPost {
    id: number
    name: string
    description: string
    imageUrls: string[]
    price: number
    address: string
    arcreage:number
    userId:number
    serviceId:number
}
interface IPostApiResult {
    data: IPost[],
    total:number,
    currentPage:number,
    nextPage:number|null,
    prevPage:number|null,
    lastPage:number 
}
const PostList:React.FC<QueryGetPost> = ({itemPerPage,page,search,roomType,address}) => {
    const [result,setResult]= useState<IPostApiResult>()
    useEffect(()=>{
        const getAllPost = async()=>{
            const response = await PostApis.getAll({itemPerPage,page,search,roomType,address})
            setResult(response.data)
        }
        getAllPost()
    },[address, itemPerPage, page, roomType, search])   
  return (
    <div>
        {result?.data?.length===0 && <p className='text-center text-[18px]'>Không có bài viết nào</p>}
        {result?.data?.map((post)=>{
            return(
                <Fragment key={post.id}>
                    <div className='flex gap-4 border-b p-4'>
                        <img src={post.imageUrls[0]} alt="" className='w-[200px] h-[150px] object-cover'/>
                        <div>
                            <h2 className='font-semibold text-[20px]'>{post.name}</h2>
                            <p className='text-[14px] text-[#333]'>{post.description}</p>
                            <p className='text-[14px] text-[#333]'>Diện tích: {post.arcreage} m2</p>
                            <p className='text-[14px] text-[#333]'>Địa chỉ: {post.address}</p>
                            <p className='text-[14px] text-[#333]'>Giá: {post.price} VND</p>
                        </div>
                    </div>
                </Fragment>
            )
        })}
    </div>
  )
}

export default PostList