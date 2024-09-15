import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import api from '../api';

const Registration = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: '',
    class: '',
    syllabus: '',
    medium: '',
    schoolName: '',
    dateOfBirth: null,
    fatherName: '',
    motherName: '',
    address: '',
    contactNumber: '',
    whatsAppNumber:'',
  })

  const handleInputChange = (e) => {
    const { name , value } = e.target;
    setStudentData({...studentData, [name] : value })
  }
  
  const handleDateChange = (date) => {
    setStudentData({...studentData, dateOfBirth: date });
  }

  const validateDropDown = () =>{
    if(!studentData.class){
      toast.error('Please select a class');
      return false;
    } else if(!studentData.syllabus){
      toast.error('Please select a syllabus');
      return false;
    } else if(!studentData.medium) {
      toast.error('Please select a medium');
      return false;
    }
    return true;
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      if (validateDropDown()) {
        const response = await api.post('/students', studentData);
      console.log(response.data);
      toast.success('Student registered successfully');
      navigate('/login');
       }

    } catch (error) {
      toast.error('Failed to register student');
      console.error(error);
    }
    
  }

  return (
    <Container maxWidth="sm">
      <h2>REGISTRATION FORM</h2>
      {/* Wrap inside a form tag and add onSubmit */}
      <form onSubmit={submitHandler}>
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              type='text'
              name='name'
              value={studentData.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Class</InputLabel>
            <Select
              name='class'
              value={studentData.class}
              onChange={handleInputChange}
            > 
              <MenuItem value={'I'}>I</MenuItem>
              <MenuItem value={'II'}>II</MenuItem>
              <MenuItem value={'III'}>III</MenuItem>
              <MenuItem value={'IV'}>IV</MenuItem>
              <MenuItem value={'V'}>V</MenuItem>
              <MenuItem value={'VI'}>VI</MenuItem>
              <MenuItem value={'VII'}>VII</MenuItem>
              <MenuItem value={'VIII'}>VIII</MenuItem>
              <MenuItem value={'IX'}>IX</MenuItem>
              <MenuItem value={'X'}>X</MenuItem>
              <MenuItem value={'XI'}>XI</MenuItem>
              <MenuItem value={'XII'}>XII</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Syllabus</InputLabel>
            <Select
              name='syllabus'
              value={studentData.syllabus}
              onChange={handleInputChange}
            > 
              <MenuItem value={'State'}>State</MenuItem>
              <MenuItem value={'CBSE'}>CBSE</MenuItem>
              <MenuItem value={'ICSE'}>ICSE</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Medium</InputLabel>
            <Select
              name='medium'
              value={studentData.medium}
              onChange={handleInputChange}
            > 
              <MenuItem value={'Malayalam'}>Malayalam</MenuItem>
              <MenuItem value={'English'}>English</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>School Name</InputLabel>
            <Input
              type='text'
              name='schoolName'
              value={studentData.schoolName}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                views={['day','month', 'year']}
                value={studentData.dateOfBirth}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <InputLabel>Father's Name</InputLabel>
            <Input
              type='text'
              name='fatherName'
              value={studentData.fatherName}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Mother's Name</InputLabel>
            <Input
              type='text'
              name='motherName'
              value={studentData.motherName}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Address</InputLabel>
            <Input 
              type='text'
              name='address'
              value={studentData.address}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Contact Number</InputLabel>
            <Input 
              type='text'
              name='contactNumber'
              value={studentData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>WhatsApp Number</InputLabel>
            <Input
              type='text'
              name='whatsAppNumber'
              value={studentData.whatsAppNumber}
              onChange={handleInputChange}
              required
            />
          </FormControl>

          <Button variant='contained' sx={{bgcolor:'#d50000'}} type='submit'>Register</Button>
        </Box>
      </form>
    </Container>
  )
}

export default Registration
