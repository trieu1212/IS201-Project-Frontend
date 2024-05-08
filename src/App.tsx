
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Public, Home, Login, Register } from './pages/Public'
import { Path } from './ultils/Path'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      <Routes>
        <Route path={Path.PUBLIC} element={<Public />}>
          <Route path={Path.HOME} element={<Home />} />
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
