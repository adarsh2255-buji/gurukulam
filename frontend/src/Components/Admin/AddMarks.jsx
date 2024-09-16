import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api';
import { Box, Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const AddMarks = () => {
    const { id } = useParams();
    const [studentId, setStudentId] = useState(id);
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [marks, setMarks] = useState([{ subject: '', markObtained: '' , maxMark: '' }]);
    

    // Handle input change for dynamic marks fields
    const handleMarkChange = (index, event) => {
        const { name, value } = event.target;
        const newMarks = [...marks];
        // Convert markObtained and maxMark to numbers
    newMarks[index][name] = name === 'markObtained' || name === 'maxMark' ? parseFloat(value) : value;
        setMarks(newMarks);
    };

    // Add new mark input fields
    const addMarkField = () => {
        setMarks([...marks, { subject:'', markObtained: '', maxMark: '' }]);
    };

    // Remove mark input fields
    const removeMarkField = (index) => {
        const newMarks = marks.filter((_, i) => i !== index);
        setMarks(newMarks);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/markList', {
                studentId,
                examName,
                examDate,
                marks: marks.filter(mark => mark.subject && mark.markObtained && mark.maxMark) // Filter out empty marks
            }, { withCredentials: true });
            toast.success('Mark list created successfully');
            // Reset form after successful submission
            setExamName('');
            setExamDate('');
            setMarks([{ subject: '', markObtained: '', maxMark: '' }]);
        } catch (err) {
            console.error(err.response?.data?.message || 'Failed to create mark list');
            toast.error(err.response?.data?.message || 'Failed to create mark list');
        }
    };

    return (
        <Paper sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>Add Marks for Student</Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Exam Name"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Exam Date"
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                {marks.map((mark, index) => (
                    <Box key={index} mb={2}>
                        <TextField
                            label="Subject"
                            name="subject"
                            value={mark.subject}
                            onChange={(e) => handleMarkChange(index, e)}
                            required
                        />
                        <TextField
                            label="Mark Obtained"
                            name="markObtained"
                            type="number"
                            value={mark.markObtained}
                            onChange={(e) => handleMarkChange(index, e)}
                            required
                            sx={{ mx: 2 }}
                        />
                        <TextField
                            label="Max Mark"
                            name="maxMark"
                            type="number"
                            value={mark.maxMark}
                            onChange={(e) => handleMarkChange(index, e)}
                            required
                        />
                        <IconButton onClick={() => removeMarkField(index)} color="error" sx={{ ml: 2 }}>
                            <Remove />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="contained" color="primary" onClick={addMarkField} startIcon={<Add />}>
                    Add Subject
                </Button>
                <Box mt={4}>
                    <Button variant="contained" sx={{bgcolor:'#d50000'}} type="submit">Submit</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default AddMarks;
