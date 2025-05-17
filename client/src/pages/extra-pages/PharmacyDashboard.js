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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    pharmacyName: '',
    prescriptionCount: 0,
    pendingPrescriptions: 0,
  });
  const [medications, setMedications] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [addMedicineModalOpen, setAddMedicineModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addPharmacyModalOpen, setAddPharmacyModalOpen] = useState(false);
  const [hasPharmacy, setHasPharmacy] = useState(null);
  const [searchText, setSearchText] = useState('');
  const token = localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const checkPharmacy = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasPharmacy(true);
      } catch (err) {
        if (err.response?.status === 404) {
          setHasPharmacy(false);
        } else {
          setSnackbarMessage('Failed to check pharmacy status');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }
    };
    checkPharmacy();
  }, [token]);

  useEffect(() => {
    if (hasPharmacy) {
      const fetchDashboardData = async () => {
        try {
          const [dashboardResponse, medicationsResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/dashboard`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/medications`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
          setDashboardData(dashboardResponse.data);
          setMedications(medicationsResponse.data);
        } catch (err) {
          setSnackbarMessage(err.response?.data?.error || 'Failed to fetch data');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      };
      fetchDashboardData();
    }
  }, [hasPharmacy, token]);

  const handleDeleteMedication = async (medicationId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/pharmacy/medications/${medicationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedications(medications.filter((med) => med._id !== medicationId));
      setSnackbarMessage('Medication deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to delete medication');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddPharmacy = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/pharmacy/profile`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      resetForm();
      setAddPharmacyModalOpen(false);
      navigate('/login');
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to add pharmacy');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSubmitting(false);
    }
  };

  const columns = [
    // {
    //   field: 'image',
    //   headerName: 'Image',
    //   width: 100,
    //   renderCell: (params) =>
    //     params.value ? (
    //       <img
    //         src={`${process.env.REACT_APP_API_URL}${params.value}`}
    //         alt="Medicine"
    //         style={{ width: 50, height: 50, objectFit: 'cover' }}
    //       />
    //     ) : (
    //       <Typography variant="body2">No Image</Typography>
    //     ),
    // },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', width: 100, type: 'number' },
    { field: 'stock', headerName: 'Stock', width: 100, type: 'number' },
  ];

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (hasPharmacy === null) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (hasPharmacy === false) {
    return (
      <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
        <Container>
          <Typography variant="h4" color="#004d40" gutterBottom>
            Pharmacy Setup
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddPharmacyModalOpen(true)}
            >
              Add Pharmacy
            </Button>
          </Box>

          {/* Add Pharmacy Modal */}
          <Dialog open={addPharmacyModalOpen} onClose={() => setAddPharmacyModalOpen(false)}>
            <DialogTitle>Add Pharmacy Details</DialogTitle>
            <Formik
              initialValues={{
                name: '',
                address: '',
                contact: '',
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required('Pharmacy name is required'),
                address: Yup.string().required('Address is required'),
                contact: Yup.string().required('Contact is required'),
              })}
              onSubmit={handleAddPharmacy}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <TextField
                      fullWidth
                      label="Pharmacy Name"
                      name="name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Contact"
                      name="contact"
                      value={values.contact}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.contact && errors.contact)}
                      helperText={touched.contact && errors.contact}
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setAddPharmacyModalOpen(false)} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                      Save
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>

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
  }

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" color="#004d40" gutterBottom>
          Pharmacy Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pharmacy Name</Typography>
                <Typography variant="body1">{dashboardData.pharmacyName || 'N/A'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Prescriptions</Typography>
                <Typography variant="body1">{dashboardData.prescriptionCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Prescriptions</Typography>
                <Typography variant="body1">{dashboardData.pendingPrescriptions}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddMedicineModalOpen(true)}
              sx={{ mb: 2 }}
            >
              Add Medicine
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setViewModalOpen(true)}
              sx={{ mb: 2, ml: 2 }}
            >
              See All Medicines
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Medicines</Typography>
                {medications.length === 0 ? (
                  <Typography>No medicines added yet.</Typography>
                ) : (
                  <List>
                    {medications.slice(0, 5).map((med) => (
                      <ListItem key={med._id}>
                        {/* {med.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}${med.image}`}
                            alt={med.name}
                            style={{ width: 50, height: 50, marginRight: 16, objectFit: 'cover' }}
                          />
                        )} */}
                        <ListItemText
                          primary={med.name}
                          secondary={`Price: $${med.price} | Stock: ${med.stock}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteMedication(med._id)}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Add Medicine Modal */}
      <Dialog open={addMedicineModalOpen} onClose={() => setAddMedicineModalOpen(false)}>
        <DialogTitle>Add New Medicine</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: '',
            stock: '',
            image: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required'),
            price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
            stock: Yup.number().required('Stock is required').min(0, 'Stock must be positive'),
            image: Yup.mixed()
              .nullable()
              .test('fileType', 'Only PNG or JPEG images are allowed', (value) =>
                !value || ['image/png', 'image/jpeg'].includes(value?.type)
              )
              .test('fileSize', 'Image must be less than 2MB', (value) =>
                !value || value?.size <= 2 * 1024 * 1024
              ),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('description', values.description);
              formData.append('price', values.price);
              formData.append('stock', values.stock);
              if (values.image) {
                formData.append('image', values.image);
              }

              const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/pharmacy/medications`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                  },
                }
              );
              setMedications([...medications, response.data.medication]);
              setSnackbarMessage('Medicine added successfully');
              setSnackbarSeverity('success');
              setSnackbarOpen(true);
              resetForm();
              setAddMedicineModalOpen(false);
            } catch (err) {
              setSnackbarMessage(err.response?.data?.error || 'Failed to add medicine');
              setSnackbarSeverity('error');
              setSnackbarOpen(true);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={values.price}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={values.stock}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.stock && errors.stock)}
                  helperText={touched.stock && errors.stock}
                  margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/png,image/jpeg"
                      onChange={(event) => setFieldValue('image', event.target.files[0])}
                    />
                  </Button>
                  {values.image && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected: {values.image.name}
                    </Typography>
                  )}
                  {touched.image && errors.image && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.image}
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddMedicineModalOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Add
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      {/* View All Medicines Modal */}
      <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>All Medicines</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Search Medicines"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredMedications}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row._id}
              disableSelectionOnClick
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModalOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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

export default PharmacyDashboard;