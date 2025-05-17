import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const token = localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/prescriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(response.data);
      } catch (err) {
        setSnackbarMessage(err.response?.data?.error || 'Failed to fetch prescriptions');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };
    fetchPrescriptions();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/prescriptions/${id}/status`,
        { status: 'Completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: 'Completed' } : p))
      );
      setSnackbarMessage('Prescription approved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to approve prescription');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Prescription List
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">All Prescriptions</Typography>
                {prescriptions.length === 0 ? (
                  <Typography>No prescriptions found.</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Medications</TableCell>
                          <TableCell>User Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Created At</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {prescriptions.map((prescription) => (
                          <TableRow key={prescription._id}>
                            <TableCell>{prescription.patientName}</TableCell>
                            <TableCell>
                              {prescription.medications?.map((med, index) => (
                                <div key={index}>
                                  {med.medicationName}, {med.dosage}, {med.instructions}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell>{prescription.userId.email}</TableCell>
                            <TableCell>{prescription.status}</TableCell>
                            <TableCell>{new Date(prescription.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {prescription.status === 'Pending' && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={() => handleApprove(prescription._id)}
                                >
                                  Approve
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
      </Container>
    </Box>
  );
};

export default PrescriptionList;