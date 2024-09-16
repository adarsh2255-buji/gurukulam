import { Box, Button, Container, FormControl, Input, InputLabel } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminContext } from '../../context/AdminContext';
import toast from 'react-hot-toast';
import api from '../../api';

const AdminLogin = () => {

    const navigate = useNavigate();

    const{ handleLogin } = useContext(adminContext)

    const [admin, setAdmin] = useState({
        email: '',
        password: '',
    })
    
    const handleInputChange = (e) => {
        setAdmin({...admin, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!admin.email ||!admin.password) {
            toast.error('Please fill in all fields')
            return
        }

        try {
            const response = await api.post('/admin/login', admin, { withCredentials: true})
            const data = response.data;
            console.log(data)
            if(data){
                handleLogin(data)
                navigate('/');
                toast.success('Logged in successfully')
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error('Error logging in:', error.response? error.response.data : error.message);
        }
    }
  return (
    <>
    <Container maxWidth='sm'>
        <h1>ADMIN LOGIN</h1>
    <form onSubmit={handleSubmit}>
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                type='email'
                name='email'
                value={admin.email}
                onChange={handleInputChange}
                required
                ></Input>
            </FormControl>

            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                type='password'
                name='password'
                value={admin.password}
                onChange={handleInputChange}
                required
                ></Input>
            </FormControl>

            <Button variant='contained' sx={{bgcolor:'#d50000'}} type='submit'>Login</Button>
        </Box>
    </form>
    </Container>
    </>
  )
}

export default AdminLogin