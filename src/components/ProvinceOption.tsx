import React from 'react'
interface ProvinceOptionProps {
  province: string,
  image: string,
  setAddress:React.Dispatch<React.SetStateAction<string>>
  page?:string
}
const ProvinceOption:React.FC<ProvinceOptionProps> = ({province,image,setAddress}) => {
  return (
    <div 
      className='cursor-pointer gap-1 flex flex-col border rounded-2xl justify-center items-center shadow-md hover:shadow-2xl text-[#1266dd] hover:text-orange-400 '
      onClick={()=>setAddress(province)}
    >
      <img src={image} alt=""  className='object-cover w-[220px] h-[110px] rounded-t-xl '/>
      <span className=' font-semibold p-2'>
        {province}
      </span>
    </div>
  )
}

export default ProvinceOption