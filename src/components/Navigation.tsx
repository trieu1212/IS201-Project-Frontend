import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const { user } = useSelector((state: any) => state.app)
    const navigateItems = [
        {
            id: 1,
            name: 'Trang chủ',
            path: '/'
        },
        {
            id: 2,
            name: 'Dịch vụ',
            path: '/service'
        },
        // {
        //     id: 4,
        //     name: 'Liên hệ',
        //     path: '/contact'
        // },
        // {
        //     id: 5,
        //     name: 'Về chúng tôi',
        //     path: '/about'
        // }
    ]
    const authNavigateItems = [
        {
            id: 3,
            name: 'Quản lý bài đăng',
            path: '/private/manage-post',
            auth: true,
        },
    ];
    return (
        <div className='flex justify-around bg-[#f73859] w-full'>
            {navigateItems.map((item) => (
                <div key={item.id} className='hover:bg-blue-600 hover:text-white text-white p-4'>
                    <Link to={item.path}>
                        {item.name}
                    </Link>
                </div>
            ))}
            {user && authNavigateItems.map((item) => (
                <div key={item.id} className='hover:bg-blue-600 hover:text-white text-white p-4'>
                    <Link to={item.path}>
                        {item.name}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Navigation