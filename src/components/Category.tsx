import React from 'react'
interface CategoryProps {
  setRoomType:React.Dispatch<React.SetStateAction<string>>

}
const Category:React.FC<CategoryProps> = ({setRoomType}) => {
  return (
    <div className='flex'>
      <div>
        <h2 className='font-semibold text-[20px]'>Danh mục</h2>
        <ul className='ml-6 cursor-pointer '>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400'
            onClick={()=>setRoomType('Phòng trọ')}
          >Phòng trọ</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400'
            onClick={()=>setRoomType('Chung cư')}  
          >Chung cư</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400'
            onClick={()=>setRoomType('Nhà nguyên căn')}
          >Nhà nguyên căn</li>
          <li 
            className='text-[14px] text-[#333] hover:text-orange-400'
            onClick={()=>setRoomType('Nhà trọ')}
          >Nhà trọ</li>
          <li className='text-[14px] text-[#333] hover:text-orange-400'
            onClick={()=>setRoomType('Văn phòng')}
          >Văn phòng</li>
        </ul>
      </div>
    </div>
  )
}

export default Category