import React, { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'
import { Navigate, useNavigate } from 'react-router-dom';

const StudentProtectedRoute = ({ children }) => {
    const { student } = useContext(StudentContext);
    const navigate = useNavigate()
    if(!student) {
        return <Navigate to='/login' replace/> 
    }
    return children;
}

export default StudentProtectedRoute