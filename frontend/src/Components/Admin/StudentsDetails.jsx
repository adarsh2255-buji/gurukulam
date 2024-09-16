import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Paper, Container } from '@mui/material'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import api from '../../api';

const StudentsDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/admin/student/${id}`, { withCredentials: true } );
                setStudent(response.data);
            } catch (error) {
                console.error('Error logging in:', error.response ? error.response.data : error.message);
                toast.error("Failed to fetch student details")
            }
        }
        fetchStudent();
        return () => {
            setStudent(null);
        }
    }, [id])
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
    <Typography variant='h3' sx={{ mb: 4 }}>Student Details</Typography>
    <Paper elevation={3} sx={{ maxWidth: '600px', width: '100%', p: 3 }}>
      
      {student ? (

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Name</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.name}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Class</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.class}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Admission Number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.admissionNumber}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Syllabus</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.syllabus}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Medium</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.medium}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">School</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.schoolName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Date Of Birth</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              {new Date(student.dateOfBirth).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Father's Name</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.fatherName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Mother's Name</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.motherName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Address</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.address}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">Contact Number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.contactNumber}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body1" fontWeight="bold">WhatsApp Number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{student.whatsAppNumber}</Typography>
          </Grid>
        </Grid>
        
      ) : (
        <Typography>Loading student details...</Typography>
      )}
    </Paper>
  </Box>
    </>
  )
}

export default StudentsDetails