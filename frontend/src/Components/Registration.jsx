import React from 'react'
import Container from '@mui/material/Container'
import { Box, FormControl, Input, InputLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
const Registration = () => {
  return (
    <>
    <Container maxWidth="sm">
      <h2>Registration Form</h2>
      <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Class</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Syllabus</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Medium</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>School Name</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date Of Birth" />
          </LocalizationProvider>
        </FormControl>
        <FormControl>
          <InputLabel>Father's Name</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Mother's Name</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Address</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>Contact Number</InputLabel>
          <Input />
        </FormControl>
        <FormControl>
          <InputLabel>WhatsApp Number</InputLabel>
          <Input />
        </FormControl>
      </Box>
    </Container>
    </>
  )
}

export default Registration