import React, { useContext, useState, useEffect } from 'react'
import { adminContext } from '../context/AdminContext'
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const { admin } = useContext(adminContext);
    const [ loading, setLoading ]  = useState(true) 

    useEffect(() => {
        const loggedInAdmin = localStorage.getItem('admin');
        if (loggedInAdmin) {
          setLoading(false); // Admin is loaded
        } else {
          setLoading(false); // Admin is not logged in
        }
      }, []);

    if(loading) {
        return <div>Loading...</div>
    }

    if(!admin) {
        return <Navigate to='/admin' />
    }
    return children
  
}

export default AdminProtectedRoute