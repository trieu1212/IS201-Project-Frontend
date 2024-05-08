import React from 'react'
import logo from '../assets/images/logo.svg'
import { Icons } from '../ultils/Icons'
import { IconType } from 'react-icons'
import Button from './Button'
import { Link } from 'react-router-dom'
const Header = () => {
    const { FaUserPlus, FaRegHeart, FaRegArrowAltCircleRight, CiCirclePlus } = Icons
    return (
        <>
            <div className='flex justify-between items-center w-[1100px] mx-auto p-4'>
                <div>
                    <img src={logo} alt="" className='h-[50px] object-cover' />
                </div>
                <div className='flex gap-6'>
                    <span className='flex items-center gap-2'>
                        <FaRegHeart size={20} />
                        <span>Yêu thích</span>
                    </span>
                    <span className='flex items-center' >
                        <Link to='/login' className='flex items-center gap-2 hover:underline'>
                            <FaUserPlus size={20} />
                            <span>Đăng nhập</span>
                        </Link>
                    </span>
                    <span className='flex items-center gap-2'>
                        <Link to='/register' className='flex items-center gap-2 hover:underline'>
                            <FaRegArrowAltCircleRight size={20} />
                            <span>Đăng ký</span>
                        </Link>
                    </span>
                    <span>
                        <Button
                            name='Đăng tin miễn phí'
                            style='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 hover:underline transition duration-300 ease-in-out'
                            iconAfter={CiCirclePlus}
                        />
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header