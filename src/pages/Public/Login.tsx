import React from 'react'
import { Button, InputField } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { authApis } from '../../apis/AuthApis'
import { LoginUser } from '../../types/LoginUser'
import { useDispatch } from 'react-redux'
import { getCurrentUser, loginSuccess } from '../../redux/slice/appSlice'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
const Login = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async () => {
    const data: LoginUser = {
      username,
      password
    }
    try {
      const response = await authApis.login(data)
    if(response.status===201){
      dispatch(loginSuccess(response.data))
      dispatch(getCurrentUser(response.data.user))
      Swal.fire({
        icon:'success',
        title:'Đăng nhập thành công!'
      }).then(()=>{
        navigate('/')
      })
    }
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Lỗi server! Vui lòng thử lại sau!');
      } 
    }
  }
  return (
    <>
      <div className='flex flex-col items-center gap-4 w-[600px] mx-auto border p-4 mt-12 rounded-lg shadow-xl'>
        <h1 className='text-center font-semibold text-[28px]'>Đăng nhập</h1>
        <div className='flex flex-col gap-4 justify-center w-[400px]'>
          <div className='flex flex-col gap-3'>
            <label htmlFor="" className='font-semibold'>Tên tài khoản</label>
            <InputField
              data={username}
              setData={setUsername}
              placeholder='Tên đăng nhập'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="" className='font-semibold'>Mật khẩu</label>
            <InputField
              data={password}
              setData={setPassword}
              type='password'
              placeholder='Mật khẩu'
            />
          </div>
        </div>
        <div className='mt-4'>
          <Button
            name='Đăng nhập'
            style='px-4 py-2 border font-semibold bg-[#f73859] text-white rounded-md hover:bg-[#f73859] hover:text-black'
            handleSubmit={handleLogin}
          />
        </div>
        <div className='flex flex-col items-center'>
          <p 
            className='hover:text-[#f73859]'
            onClick={() => navigate('/forgot-pass')}
          >Quên mật khẩu</p>
          <p className='text-[14px] mt-4'>
            Bạn chưa có tài khoản? <Link to='/register' className='hover:text-[#f73859]'>Đăng kí ngay!</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login