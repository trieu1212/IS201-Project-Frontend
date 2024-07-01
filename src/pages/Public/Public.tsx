import React from 'react'
import { Outlet } from 'react-router-dom'
import {  Footer, Header, Navigation } from '../../components'
const Public = () => {
  return (
    <>
      <div className='font-roboto flex flex-col gap-2'>
        <header>
          <Header />
          <Navigation/>
        </header>
        <div >
          <Outlet />
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </>
  )
}

export default Public