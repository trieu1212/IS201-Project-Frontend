
import logo from '../assets/images/logo.svg'
import { Icons } from '../ultils/Icons'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authApis } from '../apis/AuthApis'
import { toast } from 'react-toastify'
import { logoutSuccess } from '../redux/slice/appSlice'
const Header = () => {
    const { FaUserPlus, FaRegHeart, FaRegArrowAltCircleRight, CiCirclePlus } = Icons
    const { user } = useSelector((state: any) => state.app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        const response = await authApis.logout()
        if (response.status === 201) {
            toast.success('Đăng xuất thành công')
            dispatch(logoutSuccess())
            navigate('/login')
        }
    }
    return (
        <>
            <div className='flex justify-between items-center w-[1100px] mx-auto p-4'>
                <div>
                    <img src={logo} alt="" className='h-[50px] object-cover cursor-pointer' onClick={() => navigate('/')} />
                </div>
                <div className='flex gap-6'>
                    <span className='flex items-center gap-2'>
                        <FaRegHeart size={20} />
                        <span>Yêu thích</span>
                    </span>
                    {!user && <div className='flex gap-4'>
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
                    </div>}
                    {user &&
                        <div className='flex items-center gap-4'>
                            <span>
                                Xin chào, <span className='font-semibold ml-1'>
                                    <Link to='/private/profile'>
                                        {user?.username}
                                    </Link>
                                </span>
                                <span> {user?.isAdmin ? "- Admin" : ""}</span>
                            </span>
                            <span
                                className='flex items-center gap-2 hover:underline cursor-pointer'
                                onClick={handleLogout}
                            >
                                <FaRegArrowAltCircleRight size={20} />
                                <span>Đăng xuất</span>
                            </span>
                        </div>
                    }
                    <span>
                        <Link to={`/private/upload`}>
                            {user && user?.postAmount > 0 && <Button
                                name='Đăng bài viết'
                                style='bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 hover:underline transition duration-300 ease-in-out'
                                iconAfter={CiCirclePlus}
                            />}
                        </Link>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Header