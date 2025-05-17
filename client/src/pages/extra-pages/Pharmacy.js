import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Pharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const token = localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/admin/pharmacies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPharmacies(response.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.error || 'Failed to fetch pharmacies',
          severity: 'error',
        });
      }
    };
    fetchPharmacies();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/pharmacy/admin/pharmacies/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPharmacies((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: 'Approved' } : p))
      );
      setSnackbar({
        open: true,
        message: 'Pharmacy approved successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to approve pharmacy',
        severity: 'error',
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pharmacy/admin/pharmacies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPharmacies((prev) => prev.filter((p) => p._id !== id));
      setSnackbar({
        open: true,
        message: 'Pharmacy removed successfully',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || 'Failed to remove pharmacy',
        severity: 'error',
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Pharmacy Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pharmacies.map((pharmacy) => (
                <TableRow key={pharmacy._id}>
                  <TableCell>{pharmacy.name}</TableCell>
                  <TableCell>{pharmacy.address}</TableCell>
                  <TableCell>{pharmacy.contact}</TableCell>
                  <TableCell>{pharmacy.userId.email}</TableCell>
                  <TableCell>{pharmacy.status}</TableCell>
                  <TableCell>
                    {pharmacy.status === 'Pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleApprove(pharmacy._id)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemove(pharmacy._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Pharmacy;