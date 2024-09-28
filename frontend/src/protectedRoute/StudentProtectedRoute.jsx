import React, { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'
import { Navigate } from 'react-router-dom';

const StudentProtectedRoute = ({ children }) => {
    const { student } = useContext(StudentContext);
    if(!student) {
        return <Navigate to='/login' replace/> 
    }
    return children;
}

export default StudentProtectedRoute