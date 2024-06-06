import React from 'react'
import { Category, Filters, PostList, ProvinceOption } from '../../components'
import { text } from '../../ultils/Constants'
const Home = () => {
    const [address, setAddress] = React.useState<string>('')
    const [page, setPage] = React.useState<number>(1)
    const [roomType, setRoomType] = React.useState<string>('')
    return (
        <>
            <div className='max-w-[1100px] mx-auto'>
                <Filters />
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
                        setAddress={setAddress}
                        province='Phòng trọ Hồ Chí Minh'
                        image='https://phongtro123.com/images/location_hcm.jpg'
                    />
                    <ProvinceOption
                        setAddress={setAddress}
                        province='Phòng trọ Hà Nội'
                        image='https://phongtro123.com/images/location_hn.jpg'
                    />
                    <ProvinceOption
                        setAddress={setAddress}
                        province='Phòng trọ Đà Nẵng'
                        image='https://phongtro123.com/images/location_dn.jpg'
                    />
                </div>
                 <span className='my-3 font-semibold'>{address}</span>
                <div className='flex gap-2 mt-12'>
                    <div className='w-3/5 border p-4 bg-white rounded-md'>
                        <PostList
                            itemPerPage='6'
                            address={address}
                            page={page.toString()}
                            roomType={roomType}
                        />
                    </div>
                    <div className='w-2/5 border p-4 rounded-md'>
                        <Category 
                            setRoomType={setRoomType}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home