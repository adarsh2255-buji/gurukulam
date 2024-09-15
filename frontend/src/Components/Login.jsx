import React, { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import api from '../api';
import dayjs from 'dayjs';
import { StudentContext } from '../context/StudentContext';
const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = useContext(StudentContext)

    const [studentData, setStudentData] = useState({
      admissionNumber: '',
      dateOfBirth: null,
    });
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setStudentData({...studentData, [name]: value })
    }

    const handleDateChange = (date) => {
      setStudentData({ ...studentData, dateOfBirth: date});
      }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!studentData.admissionNumber || !studentData.dateOfBirth) {
        toast.error('Please fill in all fields');
        return;
      }
    //   const formattedData = {
    //     admissionNumber: studentData.admissionNumber,
    //     dateOfBirth: studentData.dateOfBirth.toISOString().split('T')[0],
    // };
      try {
        const response = await api.post('/students/login', studentData)
        const data = response.data;
        console.log(data)
        if(data) {
            handleLogin(data)
            navigate('/dashboard')
        }
      } catch (error) {
        toast.error('Invalid credentials')
        console.error('Error logging in:', error.response ? error.response.data : error.message);
      }
    }
  return (
    <>
    <Container maxWidth="sm">
      <h2>LOGIN HERE</h2>
 
      <form onSubmit={handleSubmit} >
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <FormControl>
            <InputLabel>Admission Number</InputLabel>
            <Input
             type='text'
             name='admissionNumber'
             value={studentData.admissionNumber}
             onChange={handleInputChange}
             required
            />
          </FormControl>

          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={studentData.dateOfBirth}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>

          <Button variant='contained' sx={{bgcolor:'#d50000'}} type='submit'>Login</Button>
        </Box>
      </form>
    </Container>
    
    </>
  )
}

export default Login