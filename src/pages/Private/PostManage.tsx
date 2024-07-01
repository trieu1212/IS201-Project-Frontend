import React from 'react'
import { PostApis } from '../../apis/PostApis'
import { useSelector } from 'react-redux'
interface IImages{
  imageUrl: string
  id: number
}
interface IService{
  id: number
  name: string

}
interface IPost {
  name: string
  arcreage: number
  price: number
  description: string
  id: number
  roomType: string
  status:boolean
  address: string
  images: IImages[]
  service: IService
}
const PostManage = () => {
  const {user} = useSelector((state:any) => state.app)
  const [posts, setPosts] = React.useState<IPost[]>([])
  const getPostByUser = async () => {
    const res = await PostApis.getByUser(user?.id)
    if(res.data){
      setPosts(res.data)
    }
  }
  React.useEffect(()=>{
    getPostByUser()
  },[])
  console.log(posts)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">CÁC BÀI ĐÃ ĐĂNG</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  )
}

export default PostManage