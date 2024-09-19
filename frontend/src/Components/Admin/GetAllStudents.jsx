import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../api';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const GetAllStudents = () => {
  const [ students, setStudents ] = useState([]);
  const [ search, setSearch ] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchStudents = async()=>{
      try{
        const response = await api.get('/admin/getAllStudents', { withCredentials: true});
        setStudents(response.data);
      
      } catch(err){
        console.error(err.response?.data?.message || 'Failed to fetch students');
        toast.error('Failed to fetch students');
      }
    }
    fetchStudents()
  }, [])

  //handle more button
  const handleMoreButton = (studentId) =>{
    navigate(`/studentDetails/${studentId}`)
  }
  return (
    <div>
      <Box>
        <TextField
        name="class"
        label="Search Student"
        variant="outlined"
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {students.filter((student) => {
            return student.class.toLowerCase().includes(search.toLowerCase()) || student.name.toLowerCase().includes(search.toLowerCase()) || student.schoolName.toLowerCase().includes(search.toLowerCase())
          }).map((student) => (
            <Paper key={student._id} sx={{ padding: 2 }}>
              <Typography variant="h6">{student.name}</Typography>
              <Typography>Class: {student.class}</Typography>
              <Typography>School: {student.schoolName}</Typography>
              <Typography>Contact: {student.contactNumber}</Typography>
              <Button variant='contained' sx={{bgcolor:'#d50000', mt:'1rem'}} size="small" onClick={()=>handleMoreButton(student._id)} >More</Button>
            </Paper>
          ))}
        </Box>
      )}
    </div>
  )
}

export default GetAllStudents