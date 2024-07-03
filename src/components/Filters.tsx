import React from 'react'
import Button from './Button'
import FilterItems from './FilterItems'
import {Icons} from '../ultils/Icons'
interface IFilterItems {
    search?:string
    setSearch?:React.Dispatch<React.SetStateAction<string>>
}
const Filters:React.FC<IFilterItems> = ({search,setSearch}) => {
    const {TfiBackRight,IoBackspaceOutline,FcDepartment,CiLocationOn,GiMoneyStack,AiOutlineColumnWidth,IoIosSearch} =Icons
    return (
        <div className='lg:flex-row flex flex-col gap-2 items-center justify-between py-2 bg-yellow-400 px-2 rounded-xl'>
            <FilterItems
                text='Loại phòng'
                iconAfter={IoBackspaceOutline}
                iconBefore={FcDepartment}
            />
            <FilterItems
                text='Toàn quốc'
                iconAfter={TfiBackRight}
                iconBefore={CiLocationOn}
            />
            <FilterItems
                text='Giá tiền'
                iconAfter={TfiBackRight}
                iconBefore={GiMoneyStack}
            />
            <FilterItems
                text='Diện tích'
                iconAfter={TfiBackRight}
                iconBefore={AiOutlineColumnWidth}
            />
            <span className=''>
                <Button
                    iconBefore={IoIosSearch}
                    name='Tìm kiếm'
                    style='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600  transition duration-300 ease-in-out'
                />
            </span>
        </div>
    )
}

export default Filters