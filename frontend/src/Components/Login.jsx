import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import api from '../api';
const Login = () => {
    const navigate = useNavigate();
  return (
    <>
    <Container maxWidth="sm">
      <h2>REGISTRATION FORM</h2>
      {/* Wrap inside a form tag and add onSubmit */}
      <form >
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <FormControl>
            <InputLabel>Admission Number</InputLabel>
            <Input
             required
            />
          </FormControl>

          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                // value={studentData.dateOfBirth}
                // onChange={handleDateChange}
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