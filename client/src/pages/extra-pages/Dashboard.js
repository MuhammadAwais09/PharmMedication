import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pharmacyCount: 0,
    prescriptionCount: 0,
    pendingPrescriptions: 0,
  });
  const token = localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pharmaciesRes, prescriptionsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/admin/pharmacies`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/prescriptions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const pendingPrescriptions = prescriptionsRes.data.filter(
          (p) => p.status === 'Pending'
        ).length;

        setStats({
          pharmacyCount: pharmaciesRes.data.length,
          prescriptionCount: prescriptionsRes.data.length,
          pendingPrescriptions,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Pharmacies</Typography>
                <Typography variant="h4">{stats.pharmacyCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Prescriptions</Typography>
                <Typography variant="h4">{stats.prescriptionCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Prescriptions</Typography>
                <Typography variant="h4">{stats.pendingPrescriptions}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;