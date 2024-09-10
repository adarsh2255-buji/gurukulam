import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Components/Root'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Registration from './Components/Registration'
import Login from './Components/Login'


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
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
