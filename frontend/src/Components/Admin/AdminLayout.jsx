import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <>
    <AdminHeader />
    <main>
        <Outlet />
    </main>
    </>
  )
}

export default AdminLayout