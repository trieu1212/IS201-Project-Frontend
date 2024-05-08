import React from 'react'
import { Filters,ProvinceOption } from '../../components'
import { text } from '../../ultils/Constants'
const Home = () => {
    return (
        <>
            <div className='max-w-[1100px] mx-auto'>
                <Filters/>
                <div className='w-[1100px] mt-4 mx-auto'>
                    <h1 className='text-center font-semibold text-[28px]'>
                        {text.HOME_TITLE}
                    </h1>
                    <p>
                        {text.HOME_DESCRIPTION}
                    </p>
                </div>
                <div className='flex justify-center gap-6 mt-6'>
                    <ProvinceOption
                        province='Phòng trọ Hồ Chí Minh'
                        image='https://phongtro123.com/images/location_hcm.jpg'
                    />
                    <ProvinceOption
                        province='Phòng trọ Hà Nội'
                        image='https://phongtro123.com/images/location_hn.jpg'
                    />
                    <ProvinceOption
                        province='Phòng trọ Đà Nẵng'
                        image='https://phongtro123.com/images/location_dn.jpg'
                    />
                </div>
                <div className='flex gap-2 mt-6'>
                    <div className='w-3/5 border p-4'>
                        post
                    </div>
                    <div className='w-2/5 border p-4'>
                        category
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home