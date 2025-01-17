import React from 'react'
import { Category, Filters, PostList, ProvinceOption } from '../../components'
import { text } from '../../ultils/Constants'
const Home = () => {
    const [address, setAddress] = React.useState<string>('')
    const [page, setPage] = React.useState<number>(1)
    const [roomType, setRoomType] = React.useState<string>('')
    const [search, setSearch] = React.useState<string>('')
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
                        province='Thành phố Hồ Chí Minh'
                        image='https://phongtro123.com/images/location_hcm.jpg'
                    />
                    <ProvinceOption
                        setAddress={setAddress}
                        province='Thành phố Hà Nội'
                        image='https://phongtro123.com/images/location_hn.jpg'
                    />
                    <ProvinceOption
                        setAddress={setAddress}
                        province='Thành phố Đà Nẵng'
                        image='https://phongtro123.com/images/location_dn.jpg'
                    />
                </div>
                 <span className='my-3 font-semibold'>{address}</span>
                <div className='flex gap-6 mt-12'>
                    <div className='w-4/5 border p-2 bg-white rounded-md'>
                        <PostList
                            itemPerPage='6'
                            address={address}
                            page={page.toString()}
                            roomType={roomType}
                            setPage={setPage}
                        />
                    </div>
                    <div className='w-1/5 h-[500px] border p-4 rounded-md'>
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