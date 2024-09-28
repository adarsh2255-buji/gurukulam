import React from 'react'
import TeacherHeader from './TeacherHeader'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const TeacherLayout = () => {
  return (
    <>
    <TeacherHeader />
    <Toaster />
    <main>
        <Outlet />
    </main>
    
    </>
  )
}

export default TeacherLayout