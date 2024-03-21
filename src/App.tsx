
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
