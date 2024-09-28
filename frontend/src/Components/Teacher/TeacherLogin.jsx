import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TeacherContext } from '../../context/teacherContext';
import toast from 'react-hot-toast';
import api from '../../api';
import { Box, Button, Container, FormControl, Input,  InputLabel } from '@mui/material';

const TeacherLogin = () => {
    const navigate = useNavigate();
    const { handleLogin } = useContext(TeacherContext);

    const [teacher, setTeacher] = useState({
        email : '',
        password : '',
    });

    const handleInputChange = (e) => {
        setTeacher({...teacher, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!teacher.email || !teacher.password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await api.post('/teacher/login', teacher, { withCredentials: true})
            const data = response.data;
            if(data){
                handleLogin(data)
                navigate('/teacher/home');
                toast.success('Logged in successfully')
                setTeacher({email : '', password : ''})
            }
        } catch (error) {
            toast.error('Invalid credentials');
            console.error('Error logging in:', error.response? error.response.data : error.message);
        }
    }
  return (
    <>
    <Container maxWidth='sm'>
        <h1>TEACHER'S LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                <FormControl>
                    <InputLabel>Email</InputLabel>
                    <Input
                        type='email'
                        name='email'
                        value={teacher.email}
                        onChange={handleInputChange}
                        required
                    ></Input>
                </FormControl>

                <FormControl>
                    <InputLabel>Password</InputLabel>
                    <Input
                        type='password'
                        name='password'
                        value={teacher.password}
                        onChange={handleInputChange}
                        required
                    ></Input>
                </FormControl>
                <Button variant='contained' sx={{bgcolor:'#d50000'}} type='submit'>Log In</Button>
            </Box>
        </form>
    </Container>
    </>
  )
}

export default TeacherLogin