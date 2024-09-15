import { Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { StudentContext } from '../context/StudentContext'

const Dashboard = () => {
  const { student } = useContext(StudentContext)
  return (
    <>
    <Container maxWidth=''>
    <Typography variant='h3'>STUDENT PROFILE</Typography>
      { student ? (<>
        <Typography >Name :{student.name}</Typography>
        <Typography>Class : {student.class}</Typography>
        <Typography>Admission Number : {student.admissionNumber}</Typography>
        <Typography>Syllabus : {student.syllabus}</Typography>
        <Typography>Medium : {student.medium}</Typography>
        <Typography>school : {student.schoolName}</Typography>
        <Typography>Date Of Birth : {new Date(student.dateOfBirth).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}</Typography>
        <Typography>Father's Name : {student.fatherName}</Typography>
        <Typography>Mother's Name : {student.motherName}</Typography>
        <Typography>Address : {student.address}</Typography>
        <Typography>Contact Number : {student.contactNumber}</Typography>
        <Typography>Whatsapp Number {student.whatsAppNumber}</Typography>
      </>) : (<></>) }
      
      {/* {new Date(bookingDetails.dropOffDateAndTime).toDateString()} */}
     
    </Container>
    </>
  )
}

export default Dashboard