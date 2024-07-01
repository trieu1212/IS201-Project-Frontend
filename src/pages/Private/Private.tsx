import React, { useEffect } from 'react'
import { Footer, Header, Navigation } from '../../components'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Private = () => {
  const { user } = useSelector((state: any) => state.app)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])
  return (
    <div className='font-roboto flex flex-col gap-2'>
      <header>
        <Header />
        <Navigation />
      </header>
      <div >
        <Outlet />
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Private