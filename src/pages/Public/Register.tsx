import React from 'react'
import { Button, InputField } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { authApis } from '../../apis/AuthApis'
import { RegisterUser } from '../../types/RegisterUser'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'


const Register = () => {
  const [username, setUsername] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [phone, setPhone] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const navigate = useNavigate()
  const handleRegister = async() =>{
    const data:RegisterUser = {
      username,
      email,
      phone,
      password
    }
    const response = await authApis.register(data)
    if(response.data.statusCode===201){
      Swal.fire({
        icon:'success',
        title:response.data.message
      }).then(()=>{
        navigate('/login')
      })
    }
    else{
      toast.error(response.data.message)
    }
  }
  return (
    <>
      <div className='flex flex-col items-center gap-4 w-[600px] mx-auto border p-4 mt-12 rounded-lg shadow-xl'>
        <h1 className='text-center font-semibold text-[28px]'>Đăng kí tài khoản</h1>
        <div className='flex flex-col gap-4 justify-center w-[400px]'>
          <div className='flex flex-col gap-3'>
            <label htmlFor="" className='font-semibold'>Họ và tên</label>
            <InputField
              data={username}
              setData={setUsername}
              placeholder='Họ và tên'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="" className='font-semibold'>Email</label>
            <InputField
              data={email}
              setData={setEmail}
              placeholder='Email'
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor="" className='font-semibold'>Số Điện Thoại</label>
            <InputField
              data={phone}
              setData={setPhone}
              type='number'
              placeholder='Số điện thoại'
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
            name='Đăng kí'
            style='px-4 py-2 border font-semibold bg-[#f73859] text-white rounded-md hover:bg-[#f73859] hover:text-black'
            handleSubmit={handleRegister}
          />
        </div>
        <div>
          <p className='text-[14px] mt-4'>
            Bạn đã có tài khoản? <Link to='/login' className='hover:text-[#f73859]'>Đăng nhập ngay!</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register