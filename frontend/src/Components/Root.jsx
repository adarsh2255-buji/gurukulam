import React from 'react'
import Header from './Header'
import { Outlet} from 'react-router-dom'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
const Root = () => {
  return (
    <>
    <Header />
    <Toaster />
    <Outlet />
    <Footer />
    </>
  )
}

export default Root