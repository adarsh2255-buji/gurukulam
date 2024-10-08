import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Components/Root'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Registration from './Components/Registration'
import Login from './Components/Login'
import StudentProvider from './context/StudentContext'
import Dashboard from './Components/Dashboard'
import AdminProvider from './context/AdminContext'
import GetAllStudents from './Components/Admin/GetAllStudents'
import StudentsDetails from './Components/Admin/StudentsDetails'
import AddMarks from './Components/Admin/AddMarks'
import UpdateProfile from './Components/Admin/UpdateProfile'
import AdminLayout from './Components/Admin/AdminLayout'
import AdminLogin from './Components/Admin/AdminLogin'
import StudentProtectedRoute from './protectedRoute/StudentProtectedRoute'
import AdminProtectedRoute from './protectedRoute/AdminProtectedRoute'
import TeacherLayout from './Components/Teacher/TeacherLayout'
import TeacherProvider from './context/teacherContext'
import TeacherLogin from './Components/Teacher/TeacherLogin'
import TeacherHome from './Components/Teacher/TeacherHome'
import TeacherProtectedRoute from './protectedRoute/TeacherProtectedRoute'



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
      element:( 
        <StudentProtectedRoute><
          Dashboard/>
        </StudentProtectedRoute> 
        )
    },
    {
      path: '/logout',
      element: <Login />
    },  
  ], 
  },
   // Admin section routes
   {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { 
        path : '',
        element: <AdminLogin />},
      { path : '/admin/students',element: (
      <AdminProtectedRoute>
        <GetAllStudents />
      </AdminProtectedRoute> 
    )},
      { path : '/admin/addMarks/:id', element:(
      <AdminProtectedRoute>
        <AddMarks />
      </AdminProtectedRoute>
      )},
      {
        path : '/admin/studentDetails/:id', 
        element: (
          <AdminProtectedRoute>
            <StudentsDetails />
          </AdminProtectedRoute>
        )},
      { 
        path : '/admin/updateStudent/:id',
        element: (
          <AdminProtectedRoute>
            <UpdateProfile />
          </AdminProtectedRoute>
        )},
    ]
   },
   // Teacher section routes
   {
    path: '/teacher',
    element: <TeacherLayout />,
    children :[{
      path: '',
      element: <TeacherLogin />
    }, {
      path: '/teacher/home',
      element: (
        <TeacherProtectedRoute>
          <TeacherHome />
        </TeacherProtectedRoute>
      )
    }]
}
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <TeacherProvider>
      <StudentProvider>
        <RouterProvider router={router}/>
      </StudentProvider>
      </TeacherProvider>
    </AdminProvider>
  </StrictMode>,
)
