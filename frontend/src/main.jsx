import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Components/Root'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Registration from './Components/Registration'
import Login from './Components/Login'
import StudentProvider from './context/StudentContext'
import Dashboard from './Components/Dashboard'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminProvider from './context/AdminContext'
import GetAllStudents from './Components/Admin/GetAllStudents'
import StudentsDetails from './Components/Admin/StudentsDetails'
import AddMarks from './Components/Admin/AddMarks'


const router = createBrowserRouter([
  {
    path: '/',
    element : <Root />,
    children :[{
      path: '/registration',
      element: <Registration />,
    }, {
      path: '/login',
      element: <Login />
    },{
      path: '/dashboard',
      element: <Dashboard/>
    },
    {
      path: '/logout',
      element: <Login />
    },
    {
      path: '/admin',
      element: <AdminLogin />
    },
    {
      path:'/students',
      element:<GetAllStudents />
    },
    {
      path: '/studentDetails/:id',
      element: <StudentsDetails />
    },
    {
      path: '/addMarks/:id',
      element: <AddMarks />
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <AdminProvider>
        <RouterProvider router={router}/>
      </AdminProvider>
    </StudentProvider>
  </StrictMode>,
)
