
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Public, Home, Login, Register, Service, DetailPost, ForgotPass } from './pages/Public'
import { Path } from './ultils/Path'
import { ToastContainer } from 'react-toastify'
import { BuyService, PostManage, Private, Profile, Thank, Upload } from './pages/Private'
import { Admin, PostsManage, ServiceManage, UserManage } from './pages/Admin'
import DetailPostManage from './pages/Admin/DetailPostManage'
function App() {

  return (
    <>
      <Routes>
        <Route path={Path.PUBLIC} element={<Public />}>
          <Route index path={Path.HOME} element={<Home />} />
          <Route path={Path.SERVICE} element={<Service />} />
          <Route path={Path.DETAIL_POST} element={<DetailPost/>} />
        </Route>
        <Route path={Path.PRIVATE} element={<Private />}>
          <Route path={Path.PROFILE} element={<Profile />} />
          <Route path={Path.BUY_SERVICE} element={<BuyService />} />
          <Route path={Path.UPLOAD} element={<Upload />} />
          <Route path={Path.MANAGE_POST} element={<PostManage />} />
        </Route>
        <Route path={Path.ADMIN} element={<Admin/>}>
          <Route path={Path.SERVICE_MANAGE} element={<ServiceManage />} />
          <Route path={Path.POST_MANAGE} element={<PostsManage />} />
          <Route path={Path.DETAIL_POST_MANAGE} element={<DetailPostManage />} />
          <Route path={Path.USER_MANAGE} element={<UserManage />} />
        </Route>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<Register />} />
        <Route path={Path.THANK} element={<Thank />} />
        <Route path={Path.FORGOT_PASS} element={<ForgotPass />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
