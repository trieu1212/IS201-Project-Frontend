import React from 'react'
import { useParams } from 'react-router-dom'
import { PostApis } from '../../apis/PostApis'
interface IImages {
    imageUrl: string
    id: number
}
interface  IPost {
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
const DetailPost = () => {
    const id = useParams<{id:string}>().id
    const [post, setPost] = React.useState<IPost>()
    React.useEffect(()=>{
        const getPost = async () => {
            const res = await PostApis.getOne(String(id))
            setPost(res.data)
        }
        getPost()
    },[id])
    console.log(post)
  return (
    <div className='mx-auto w-[1100px] py-4 flex gap-4'>
        <div className='w-3/5 border'>
            <div>
                <img src={post?.images[0].imageUrl} alt="" />
            </div>
        </div>
        <div className='w-2/5 border'>

        </div>
    </div>
  )
}

export default DetailPost