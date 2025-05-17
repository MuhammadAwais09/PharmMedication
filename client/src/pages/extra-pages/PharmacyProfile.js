import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, TextField, Button, Snackbar, Alert, Card, CardContent } from '@mui/material';
import axios from 'axios';

const PharmacyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    contact: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('easyMedication_token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setSnackbarMessage(err.response?.data?.error || 'Failed to fetch profile');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('easyMedication_token');
      await axios.put(`${process.env.REACT_APP_API_URL}/pharmacy/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbarMessage('Profile updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to update profile');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Pharmacy Profile
        </Typography>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Pharmacy Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Contact Number"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PharmacyProfile;