import React, { Children, useContext } from 'react'
import { TeacherContext } from '../context/teacherContext'
import { Navigate } from 'react-router-dom';

const TeacherProtectedRoute = ({ children}) => {
    const { teacher } = useContext(TeacherContext);
    if(!teacher) {
        return <Navigate to='/teacher' replace/>
    }
  return children
}

export default TeacherProtectedRoute