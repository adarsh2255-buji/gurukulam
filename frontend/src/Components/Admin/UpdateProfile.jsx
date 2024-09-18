import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api'

const UpdateProfile = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({
        name: '',
        class: '',
        syllabus: '',
        medium: '',
        schoolName: '',
        dateOfBirth: '',
        fatherName: '',
        motherName: '',
        address: '',
        contactNumber: '',
        whatsAppNumber: ''
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/admin/student/${id}`, {withCredentials: true});
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student:', error);
                toast.error('Failed to fetch student details');
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.put(`/students/${id}`, student, {withCredentials: true});
            toast.success('Student profile updated successfully');
            setLoading(false);
        } catch (error) {
            console.error('Error updating student:', error);
            toast.error('Failed to update student profile');
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }
  return (
    <>
    <Container maxWidth='sm'>
     <Box sx={{ maxWidth: '600px', width: '100%', mt: 4 }}>
            <Typography variant="h3" sx={{ mb: 4 }}>Update Student Profile</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.name}
                    onChange={handleChange}
                />
                <TextField
                    name="class"
                    label="Class"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.class}
                    onChange={handleChange}
                />
                <TextField
                    name="syllabus"
                    label="Syllabus"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.syllabus}
                    onChange={handleChange}
                />
                <TextField
                    name="medium"
                    label="Medium"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.medium}
                    onChange={handleChange}
                />
                <TextField
                    name="schoolName"
                    label="School Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.schoolName}
                    onChange={handleChange}
                />
                <TextField
                    name="dateOfBirth"
                    label="Date of Birth"
                    variant="outlined"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={student.dateOfBirth}
                    onChange={handleChange}
                />
                <TextField
                    name="fatherName"
                    label="Father's Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.fatherName}
                    onChange={handleChange}
                />
                <TextField
                    name="motherName"
                    label="Mother's Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.motherName}
                    onChange={handleChange}
                />
                <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.address}
                    onChange={handleChange}
                />
                <TextField
                    name="contactNumber"
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.contactNumber}
                    onChange={handleChange}
                />
                <TextField
                    name="whatsAppNumber"
                    label="WhatsApp Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={student.whatsAppNumber}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, bgcolor:'#d50000' }}
                >
                    Update Profile
                </Button>
            </form>
        </Box>
    </Container>
    </>
  )
}

export default UpdateProfile