import { Container, Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { StudentContext } from '../../context/StudentContext';
import { adminContext } from '../../context/AdminContext';

const ShowMark = ({ studentId }) => {
    const { id } = useParams();
    const [showMark, setShowMark] = useState([]);
    const [loading, setLoading] = useState(true);

    const { admin } = useContext(adminContext);

    useEffect(() => {
        const fetchMark = async () => {
            try {
                const response = await api.get(`/markList/${ id || studentId}`, { withCredentials: true });
                setShowMark(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching mark list');
                setLoading(false);
            }
        };
        fetchMark();
    }, [id]);

    //handle delete mark list
    const handleDeleteMarkList = async (markListId) => {
        try {
            const response = await api.delete(`/markList/${markListId}`, { withCredentials: true });
            if (response.status === 200) {
                toast.success('Mark list deleted successfully');
                // Update the mark list list without the deleted mark list
                setShowMark(showMark.filter((mark) => mark._id!== markListId));
            } else {
                console.error('Failed to delete mark list');
                toast.error('Failed to delete mark list');
            }
        } catch (error) {
            console.error('Error deleting mark list:', error.response?.data?.message || 'Failed to delete mark list');
            toast.error(error.response?.data?.message || 'Failed to delete mark list');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Container>
                {showMark.length > 0 ? (
                    showMark.map((markList, index) => (
                        <Paper key={index} sx={{ marginTop: '20px', padding: '20px' }}>
                            <Typography variant='h4'>Progress Report of {markList.examName}</Typography>
                            <Typography variant='h6'>{new Date(markList.examDate).toDateString()}</Typography>
                            <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '20px' }}>
                                <Table sx={{ minWidth: 650, backgroundColor: '#f0f0f0' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Subjects</TableCell>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Mark Obtained</TableCell>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Maximum Mark</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {markList.marks.map((mark, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{mark.subject}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{mark.markObtained}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{mark.maxMark}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Total Marks Obtained : {markList.totalMarksObtained}</TableCell>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Average Mark: {markList.averageMark}</TableCell>
                                            <TableCell sx={{ backgroundColor: '#d50000', fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>Percentage: {markList.percentage}%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>{
                                    admin && (
                                    <Button
                                    variant='contained'
                                    size='small'
                                    sx={{ bgcolor: '#d50000', color: 'white', marginTop: '.5rem' }}
                                    onClick={() => { handleDeleteMarkList(markList._id) }}
                                    >Delete</Button>
                                    )}
                            </TableContainer>
                        </Paper>
                    ))
                ) : (
                    <Typography>No marks added</Typography>
                )}
            </Container>
        </>
    );
};

export default ShowMark;
