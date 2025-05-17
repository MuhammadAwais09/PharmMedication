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
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Inventory = () => {
  const [medications, setMedications] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const token = localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/admin/medications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMedications(response.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.error || 'Failed to fetch medications',
          severity: 'error',
        });
      }
    };
    fetchMedications();
  }, [token]);

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Inventory Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Pharmacy</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medications.map((medication) => (
                <TableRow key={medication._id}>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.pharmacyId?.name || 'Unknown'}</TableCell>
                  <TableCell>{medication.description}</TableCell>
                  <TableCell>{medication.price}</TableCell>
                  <TableCell>{medication.stock}</TableCell>
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

export default Inventory;