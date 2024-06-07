
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Public, Home, Login, Register, Service } from './pages/Public'
import { Path } from './ultils/Path'
import { ToastContainer } from 'react-toastify'
import { Private, Profile } from './pages/Private'
function App() {

  return (
    <>
      <Routes>
        <Route path={Path.PUBLIC} element={<Public />}>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.SERVICE} element={<Service />} />
        </Route>
        <Route path={Path.PRIVATE} element={<Private />}>
          <Route path={Path.PROFILE} element={<Profile />} />
        </Route>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<Register />} />
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
