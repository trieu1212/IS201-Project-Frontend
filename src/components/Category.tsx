import React from 'react'
import { Icons } from '../ultils/Icons'

interface CategoryProps {
  setRoomType:React.Dispatch<React.SetStateAction<string>>

}
const Category:React.FC<CategoryProps> = ({setRoomType}) => {
  const {IoMdArrowDropright} = Icons
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h2 className='font-bold text-[20px] mb-2'>Danh mục cho thuê</h2>
        <ul className='ml-6 cursor-pointer flex flex-col gap-3 '>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Phòng trọ')}
          ><IoMdArrowDropright size={28} color='gray' /> Phòng trọ</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Chung cư')}  
          ><IoMdArrowDropright size={28} color='gray' /> Chung cư</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Nhà nguyên căn')}
          ><IoMdArrowDropright size={28} color='gray' /> Nhà nguyên căn</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Nhà trọ')}
          ><IoMdArrowDropright size={28} color='gray' /> Nhà trọ</li>
          <li className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Văn phòng')}
          ><IoMdArrowDropright size={28} color='gray' /> Văn phòng</li>
        </ul>
      </div>
      <div>
      <h2 className='font-bold text-[20px] mb-2'>Theo giá</h2>
        <ul className='ml-6 cursor-pointer flex flex-col gap-3 '>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Phòng trọ')}
          ><IoMdArrowDropright size={28} color='gray' /> trên 1 triệu</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Chung cư')}  
          ><IoMdArrowDropright size={28} color='gray' /> trên 2 triệu</li>
        </ul>
      </div>
      <div>
      <h2 className='font-bold text-[20px] mb-2'>Theo diện tích </h2>
        <ul className='ml-6 cursor-pointer flex flex-col gap-3 '>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Phòng trọ')}
          ><IoMdArrowDropright size={28} color='gray' /> trên 20m<sup>2</sup></li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400 flex items-center gap-2'
            onClick={()=>setRoomType('Chung cư')}  
          ><IoMdArrowDropright size={28} color='gray' /> dưới 20m<sup>2</sup></li>
        </ul>
      </div>
    </div>
  )
}

export default Category