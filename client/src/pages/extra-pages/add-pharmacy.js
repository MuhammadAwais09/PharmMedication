import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPharmacy = () => {
    const navigate = useNavigate();
    const [pharmacyData, setPharmacyData] = useState({
        name: '',
        location: '',
        credentials: '',
        medicines: '',
        contact: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPharmacyData({
            ...pharmacyData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URI}/pharmacy/add`, pharmacyData)
            .then((response) => {
                setSnackbarMessage('Pharmacy added successfully!');
                setSnackbarOpen(true);
                // Optionally navigate back to the pharmacy management page
                navigate('/pharmacy-management');
            })
            .catch((error) => {
                console.error('Error adding pharmacy', error);
                setSnackbarMessage('Error adding pharmacy. Please try again.');
                setSnackbarOpen(true);
            });
    };

    return (
        <Container>
            <Box mt={4}>
                <h2>Add New Pharmacy</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Pharmacy Name"
                        name="name"
                        value={pharmacyData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={pharmacyData.location}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Credentials"
                        name="credentials"
                        value={pharmacyData.credentials}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Available Medicines (comma separated)"
                        name="medicines"
                        value={pharmacyData.medicines}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Contact"
                        name="contact"
                        value={pharmacyData.contact}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Add Pharmacy
                    </Button>
                </form>
            </Box>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AddPharmacy;