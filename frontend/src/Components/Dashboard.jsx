import React, { useContext } from 'react'
import StudentProfile from './StudentProfile'
import MarkList from './MarkList'
import ShowMark from './Admin/ShowMark'
import { StudentContext } from '../context/StudentContext'

const Dashboard = () => {
  const { student } = useContext(StudentContext)
  if (!student) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  return (
    <>
    <StudentProfile />
    <ShowMark studentId={student.id}/>
    
    </>
  )
}

export default Dashboard