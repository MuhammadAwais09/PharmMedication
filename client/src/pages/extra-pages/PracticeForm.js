import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PracticeForm = ({ data, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    clearingHouseId: '',
    receiverId: '',
    interChangeReceiverId: '',
    acknowledgementRequested: '',
    submitterName: '',
    submitterEmailAddress: '',
    submitterExchange: '',
    submittedFax: '',
    receiverName: '',
    organizationName: '',
    organizationPhone: '',
    billingProviderLastName: '',
    billingProviderFirstName: '',
    npi: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    identificationCode: '',
    renderingProvider: '',
    lastName: '',
    firstName: '',
    providerTaxonomyCode: '',
    providerG2: '',
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('easyMedication_token');
  const auth = `Bearer ${token}`;

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({
        id: '',
        name: '',
        clearingHouseId: '',
        receiverId: '',
        interChangeReceiverId: '',
        acknowledgementRequested: '',
        submitterName: '',
        submitterEmailAddress: '',
        submitterExchange: '',
        submittedFax: '',
        receiverName: '',
        organizationName: '',
        organizationPhone: '',
        billingProviderLastName: '',
        billingProviderFirstName: '',
        npi: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        identificationCode: '',
        renderingProvider: '',
        lastName: '',
        firstName: '',
        providerTaxonomyCode: '',
        providerG2: '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const validationErrors = {};
    
    // Convert values to strings for validation
    const interChangeReceiverId = String(formData.interChangeReceiverId).trim();
    const npi = String(formData.npi).trim();
    const zipCode = String(formData.zipCode).trim();
    const identificationCode = String(formData.identificationCode).trim();
    
    // Validate fields
    if (isNaN(interChangeReceiverId) || interChangeReceiverId === '') {
      validationErrors.interChangeReceiverId = 'This field must be a valid number.';
    }
    if (zipCode.length > 10) {
      validationErrors.zipCode = 'Zip Code cannot exceed 10 characters.';
    }
    if (isNaN(identificationCode) || identificationCode === '') {
      validationErrors.identificationCode = 'This field must be a valid number.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URI}/practice/addPractice`,
        formData,
        { headers: { Authorization: auth } }
      );
      alert('Data saved successfully');
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const isEditing = !!formData.id;
  return (
    <StyledDialog open={Boolean(data || !data)} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{data?.id ? 'Edit Practice' : 'Add New Practice'}</DialogTitle>
      <DialogContent>
        <Box component="form">
          <div style={{ marginBottom: 6 }}></div>
          <Grid container spacing={3}>
            {isEditing && (
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  label="ID"
                  value={formData.id}
                  name="ID"
                  onChange={handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </Grid>
            )}
                <Grid item xs={12}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Practice Details
  </Typography>
</Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Name"
                value={formData.name}
                name="name"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Clearing House Id"
                value={formData.clearingHouseId}
                name="clearingHouseId"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Receiver Id"
                value={formData.receiverId}
                name="receiverId"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Receiver Name"
                value={formData.receiverName}
                name="receiverName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="InterChange Receiver Id"
                value={formData.interChangeReceiverId}
                name="interChangeReceiverId"
                onChange={handleChange}
                error={Boolean(errors.interChangeReceiverId)}
                helperText={errors.interChangeReceiverId}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Acknowledgement Requested"
                value={formData.acknowledgementRequested}
                name="acknowledgementRequested"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Submitter Name"
                value={formData.submitterName}
                name="submitterName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Submitter Email Address"
                value={formData.submitterEmailAddress}
                name="submitterEmailAddress"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Submitter Exchange"
                value={formData.submitterExchange}
                name="submitterExchange"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Submitted Fax"
                value={formData.submittedFax}
                name="submittedFax"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Organization Name"
                value={formData.organizationName}
                name="organizationName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Organization Phone"
                value={formData.organizationPhone}
                name="organizationPhone"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Billing Provider</Typography>
          </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Billing Provider Last Name"
                value={formData.billingProviderLastName}
                name="billingProviderLastName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Billing Provider First Name"
                value={formData.billingProviderFirstName}
                name="billingProviderFirstName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="NPI"
                value={formData.npi}
                name="npi"
                onChange={handleChange}
                error={Boolean(errors.npi)}
                helperText={errors.npi}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Address 1"
                value={formData.address}
                name="address"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Address 2"
                value={formData.address2}
                name="address2"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="City"
                value={formData.city}
                name="city"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="State"
                value={formData.state}
                name="state"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Zip Code"
                value={formData.zipCode}
                name="zipCode"
                onChange={handleChange}
                error={Boolean(errors.zipCode)}
                helperText={errors.zipCode}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Identification Code"
                value={formData.identificationCode}
                name="identificationCode"
                onChange={handleChange}
                error={Boolean(errors.identificationCode)}
                helperText={errors.identificationCode}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Rendering Provider</Typography>
          </Grid>

            {/* <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Rendering Provider"
                value={formData.renderingProvider}
                name="renderingProvider"
                onChange={handleChange}
                fullWidth
              />
            </Grid> */}


            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Last Name"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>



            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="First Name"
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
                fullWidth
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Provider Taxonomy Code"
                value={formData.providerTaxonomyCode}
                name="providerTaxonomyCode"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            
           

            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Provider G2"
                value={formData.providerG2}
                name="providerG2"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default PracticeForm;
