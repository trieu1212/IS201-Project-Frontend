import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const NavigateItems = [
        {
            id:1,
            name:'Trang chủ',
            path:'/home'
        },
        {
            id:2,
            name:'Tin tức',
            path:'/news'
        },
        {
            id:3,
            name:'Danh mục',
            path:'/category'
        },
        {
            id:4,
            name:'Liên hệ',
            path:'/contact'
        },
        {
            id:5,
            name:'Về chúng tôi',
            path:'/about'
        }
    ]
  return (
    <div className='flex justify-around bg-[#f73859] w-full'>
        {NavigateItems.map((item)=>{
            return (
                <Fragment key={item.id}>
                    <div className='hover: hover:bg-blue-600 hover:text-white text-white p-4'>
                        <Link to={item.path}>
                            {item.name}
                        </Link>
                    </div>
                </Fragment>
            )
        })}
    </div>
  )
}

export default Navigation