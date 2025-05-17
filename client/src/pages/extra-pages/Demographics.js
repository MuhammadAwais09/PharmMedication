import { useState, useEffect, useRef } from 'react';
import {
    Grid,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Card,
    CardContent,
    CardActions,
    Tabs,
    Tab,
    CardHeader,
    Select,
    FormControlLabel,
    Snackbar,
    Alert,
    Checkbox
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import InputMask from 'react-input-mask';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { AlignHorizontalCenter, Margin } from '../../../node_modules/@mui/icons-material/index';
import Patient from './Pharmacy';
const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 24,
    boxShadow: theme.shadows[5],
    textTransform: 'none',
    padding: '10px 20px',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));


const Demographics = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const PatientId = location.state?.Patientid || '';
    const hideDocumentsTab = location.state?.hideDocumentsTab || false;
    const [submitting, setSubmitting] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [patientDocuments, setPatientDocuments] = useState([]);
    const shouldFetchDocuments = useRef(false);
    const [open, setOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const fileInputRef = useRef(null);
    const [emailAddress, setEmailAddress] = useState(null);

    const token = localStorage.getItem('easyMedication_token');
    const auth = `Bearer ${token}`;
    const headers = { Authorization: auth };

    const usStates = [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' },
    ];

    const defValues = {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        city: '',
        state: '',
        zip: '',
        status: '',
        emailAddress: '',
        phoneNumber: '',
        trackingNumber: '',
        firstNameTo: '',
        lastNameTo: '',
        dobTo: '',
        genderTo: '',
        cityTo: '',
        stateTo: '',
        zipTo: '',
        statusTo: '',
        emailAddressTo: '',
        phoneNumberTo: '',
        trackingNumberTo: '',
    };

    const [patientData, setPatientData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: defValues
    });


    const handleOpenDialog = () => {
        setOpenModel(true);
    };

    const handleCloseDialog = () => {
        setOpenModel(false);
    };

    useEffect(() => {
        if (open) {
            return;
        }
        axios
            .get(`${process.env.REACT_APP_SERVER_BASE_URI}/Patient/getPatients/${PatientId}`, { headers })
            .then((response) => {
                const patientData = response.data;
                const formattedDob = patientData.dob
                    ? new Date(patientData.dob).toISOString().split('T')[0]
                    : '';
                setEmailAddress(patientData.emailAddress);
                reset({
                    ...patientData,
                    dob: formattedDob
                });
                const formatDob = patientData.dob
                    ? new Date(patientData.dob).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })
                    : '';
                setPatientData({
                    firstName: patientData.firstName,
                    lastName: patientData.lastName,
                    dob: formatDob,
                });
            })
            .catch((error) => {
                console.error('Error fetching patient data:', error);
            });
    }, [PatientId, reset]);
    useEffect(() => {
        // Skip fetching documents on the first load
        if (!shouldFetchDocuments.current) {
            shouldFetchDocuments.current = true;
            return;
        }

        // Fetch patient documents when PatientId changes or tabIndex is set to 1
        if (tabIndex === 1) {
            fetchPatientDocuments();
        }
    }, [PatientId, tabIndex]);

    const fetchPatientDocuments = async (docId) => {
        if (open) {
            return; // Prevent fetching if the dialog is already open
        }
        try {
            const endpoint = docId
                ? `${process.env.REACT_APP_SERVER_BASE_URI}/patient/getPatientDocument/${PatientId}/${docId}`
                : `${process.env.REACT_APP_SERVER_BASE_URI}/patient/getPatientDocument/${PatientId}`;

            const response = await axios.get(endpoint, { headers });

            // Check if the response indicates no active documents
            if (response.status === 200 && response.data.includes("No active documents found for patient ID:")) {
                // Do not show snack message
                return;
            }

            // Set the patient documents state if documents are found
            setPatientDocuments(response.data);
        } catch (error) {
            console.error('Error fetching patient documents:', error);
            setSnackbarMessage('Error fetching patient documents.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };




    const handleDeleteDocument = async (documentId) => {
        try {

            const documentIdInt = parseInt(documentId, 10);
            console.log('Original documentId:', documentId);
            console.log('Converted documentIdInt:', documentIdInt);

            // Check if the conversion was successful
            if (isNaN(documentIdInt)) {
                throw new Error('Invalid document ID: Must be a valid integer.');
            }

            await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URI}/deletePatientDocument`, {
                headers,
                params: {
                    documentId: documentIdInt // Pass the integer to the API
                }
            });

            setSnackbarMessage('Document deleted successfully.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Refresh the document list after deletion
            setPatientDocuments(prevDocs => prevDocs.filter(doc => doc._id !== documentIdInt));
        } catch (error) {
            console.error('Error deleting document:', error);
            setSnackbarMessage('Error deleting document: ' + error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };




    const onSubmitDemographics = (data) => {
        setSubmitting(true);
        axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URI}/Patient/addPatients`, data, { headers })
            .then((response) => {
                const patientData = response.data;
                reset({
                    id: PatientId,
                    ...patientData,
                    dob: patientData.dob ? new Date(patientData.dob).toISOString().split('T')[0] : '' // Format date
                }); // Prefill form with API data
                setSuccess('Patient saved successfully.');
                setSnackbarSeverity('success');
                setSnackbarMessage('Patient information saved successfully.');
                setSnackbarOpen(true);
                setSubmitting(false);
                setTimeout(() => {
                    navigate('/patient');
                }, 3000);
            })
            .catch((error) => {
                console.error('Error saving patient data:', error);
                setError('Error saving patient data.');
                setSnackbarSeverity('error');
                setSnackbarMessage('Error saving patient information.');
                setSnackbarOpen(true);
                setSubmitting(false);
            });
    };

    const StyledDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialog-paper': {
            borderRadius: 16,
            boxShadow: theme.shadows[24],
            padding: theme.spacing(2),
            width: '500px',
        },
    }));

    const handleClickOpen = (doc) => {
        setSelectedDocument(doc);
        setOpen(true);
        PatientId = selectedDocument.Patientid;
        fetchPatientDocuments(doc._id);
    };

    const handleClose = () => {
        setRefresh(!refresh)
        setOpen(false);
        setSelectedDocument(null);

    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onUploadDocument = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        if (!selectedOption) {
            setError('Please select a document type.');
            return;
        }

        if (!selectedDate) {
            setError('Please select a date.');
            return;
        }

        // Check if emailAddress is null or empty only when isChecked is true
        if (isChecked && (!emailAddress || emailAddress.trim() === "")) {
            setSnackbarSeverity('warning');
            setSnackbarMessage("Please add an email address for the patient.");
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('patientId', PatientId);
        formData.append('emailAddress', emailAddress);
        formData.append('documentType', selectedOption);
        formData.append('date', selectedDate);
        formData.append('isChecked', isChecked);

        try {
            setSnackbarSeverity('info');
            setSnackbarMessage('Uploading document, please wait...');
            setSnackbarOpen(true);

            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_BASE_URI}/upload`,
                formData,
                {
                    headers
                }
            );

            setSnackbarSeverity('success');
            setSnackbarMessage('Document uploaded successfully.');
            setSnackbarOpen(true);
            setOpenModel(false);
            await fetchPatientDocuments();

        } catch (error) {
            setError('Error uploading document.');
            setSnackbarSeverity('error');
            setSnackbarMessage('Error uploading document.');
            setSnackbarOpen(true);
        }
    };





    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const { firstName, lastName, dob } = patientData;


    return (

        <Box p={3}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <StyledButton
                    startIcon={<ArrowBackIcon />}
                    variant="contained"
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    style={{ backgroundColor: 'primary', color: 'white' }}
                >
                    Back
                </StyledButton>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={snackbarSeverity}
                        sx={{
                            width: '100%',
                            backgroundColor: snackbarSeverity === 'info'
                                ? '#333'
                                : snackbarSeverity === 'success'
                                    ? '#71b499'
                                    : snackbarSeverity === 'error'
                                        ? '#f44336'
                                        : '#1976d2',
                            color: '#fff'
                        }}
                    >
                        {snackbarMessage}
                    </Alert>

                </Snackbar>
                <CardHeader
                    title={
                        <Typography style={{ fontWeight: 'bold' }}>
                            {firstName && lastName && dob ? `${firstName} ${lastName} - (${dob})` : ""}
                        </Typography>
                    }
                />
            </div>

            <Card>



                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                    <Tab label="Demographics" />
                    {!hideDocumentsTab && <Tab label="Document" />}
                </Tabs>

                {tabIndex === 0 && (
                    <CardContent>
                        <Grid container spacing={2}>
                            {/* First Name */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="First Name"
                                            size="small"
                                            placeholder="Enter first name"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Last Name */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Last Name"
                                            size="small"
                                            placeholder="Enter last name"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Date of Birth */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="dob"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Date of Birth"
                                            type="date"
                                            size="small"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            InputLabelProps={{
                                                shrink: true, // Keep the label above the field when it has a value
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>


                            {/* Email */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="emailAddress"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            size="small"
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            </Grid>



                            {/* Gender */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <ReactSelect
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Other', label: 'Other' }
                                            ]}
                                            onChange={(option) => setValue('gender', option?.value)}
                                            value={field.value ? { label: field.value } : null}
                                            placeholder="Select Gender"
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    zIndex: 10, // Set a higher zIndex value
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 20, // Set a higher zIndex for the dropdown menu
                                                }),
                                            }}
                                            isError={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                        />
                                    )}
                                />
                            </Grid>


                            {/* City */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="City"
                                            size="small"
                                            placeholder="Enter city"
                                            fullWidth
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* State */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="state"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label="State"
                                            size="small"
                                            fullWidth
                                            {...field}
                                        >
                                            {usStates.map((state) => (
                                                <MenuItem key={state.code} value={state.code}>
                                                    {state.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>



                            {/* Phone number */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\(\d{3}\) \d{3}-\d{4}$/,
                                            message: "Enter a valid phone number (e.g., (123) 456-7890)"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <InputMask
                                            mask="(999) 999-9999"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        >
                                            {(inputProps) => (
                                                <TextField
                                                    {...inputProps}
                                                    label="Phone Number"
                                                    size="small"
                                                    placeholder="Enter phone number"
                                                    fullWidth
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                            </Grid>

                            {/* Zip */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="zip"
                                    control={control}
                                    render={({ field }) => (
                                        <InputMask
                                            mask="99999" // Mask for 5-digit and optional 4-digit extension
                                            value={field.value}
                                            onChange={(e) => setValue('zip', e.target.value)}
                                        >
                                            {() => (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Zip Code"
                                                    placeholder="Enter zip code"
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                            </Grid>


                            {/* Status */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <ReactSelect
                                            options={[
                                                { value: 'Active', label: 'Active' },
                                                { value: 'Inactive', label: 'Inactive' },
                                                { value: 'Discharge', label: 'Discharge' }
                                            ]}
                                            onChange={(option) => setValue('status', option?.value)}
                                            value={field.value ? { value: field.value, label: field.value } : null}
                                            placeholder="Select Status"
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000,
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000,
                                                }),
                                                menuPortal: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000000, // Ensure a higher z-index for the dropdown menu
                                                }),
                                            }}
                                            menuPortalTarget={document.body}
                                            isError={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                        />
                                    )}
                                />
                            </Grid>


                            {/* {Tracking Number} */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="trackingNumber"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Tracking Number"
                                            size="small"
                                            placeholder="Enter tracking number"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            </Grid>
                            {/* SubmittedTo */}
                            <Tab label="Additional Party:" style={{ margin: '10px', color: '#000000', fontSize: '18px', fontWeight: 'bold' }} />

                            <Grid container spacing={2}>
                            
                               {/* First Name */}
                               <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="firstNameTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="First Name"
                                            size="small"
                                            placeholder="Enter first name"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Last Name */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="lastNameTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Last Name"
                                            size="small"
                                            placeholder="Enter last name"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Date of Birth */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="dobTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Date of Birth"
                                            type="date"
                                            size="small"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            InputLabelProps={{
                                                shrink: true, // Keep the label above the field when it has a value
                                            }}
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>


                            {/* Email */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="emailAddressTo"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Enter a valid email address to"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            size="small"
                                            placeholder="Enter email address To"
                                            fullWidth
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                        />
                                    )}
                                />
                            </Grid>



                            {/* Gender */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="genderTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <ReactSelect
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Other', label: 'Other' }
                                            ]}
                                            onChange={(option) => setValue('genderTo', option?.value)}
                                            value={field.value ? { label: field.value } : null}
                                            placeholder="Select Gender"
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    zIndex: 10, // Set a higher zIndex value
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 20, // Set a higher zIndex for the dropdown menu
                                                }),
                                            }}
                                            isError={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                        />
                                    )}
                                />
                            </Grid>


                            {/* City */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="cityTo"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="City"
                                            size="small"
                                            placeholder="Enter city to"
                                            fullWidth
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* State */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="stateTo"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            select
                                            label="State"
                                            size="small"
                                            fullWidth
                                            {...field}
                                        >
                                            {usStates.map((state) => (
                                                <MenuItem key={state.code} value={state.code}>
                                                    {state.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>



                            {/* Phone number */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="phoneNumberTo"
                                    control={control}
                                    rules={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\(\d{3}\) \d{3}-\d{4}$/,
                                            message: "Enter a valid phone number (e.g., (123) 456-7890)"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <InputMask
                                            mask="(999) 999-9999"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        >
                                            {(inputProps) => (
                                                <TextField
                                                    {...inputProps}
                                                    label="Phone Number"
                                                    size="small"
                                                    placeholder="Enter phone number to"
                                                    fullWidth
                                                    error={!!error}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                            </Grid>

                            {/* Zip */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="zipTo"
                                    control={control}
                                    render={({ field }) => (
                                        <InputMask
                                            mask="99999" // Mask for 5-digit and optional 4-digit extension
                                            value={field.value}
                                            onChange={(e) => setValue('zipTo', e.target.value)}
                                        >
                                            {() => (
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Zip Code"
                                                    placeholder="Enter zip code"
                                                />
                                            )}
                                        </InputMask>
                                    )}
                                />
                            </Grid>


                            {/* Status */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="statusTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <ReactSelect
                                            options={[
                                                { value: 'Active', label: 'Active' },
                                                { value: 'Inactive', label: 'Inactive' },
                                                { value: 'Discharge', label: 'Discharge' }
                                            ]}
                                            onChange={(option) => setValue('statusTo', option?.value)}
                                            value={field.value ? { value: field.value, label: field.value } : null}
                                            placeholder="Select Status"
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000,
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000,
                                                }),
                                                menuPortal: (provided) => ({
                                                    ...provided,
                                                    zIndex: 1000000, // Ensure a higher z-index for the dropdown menu
                                                }),
                                            }}
                                            menuPortalTarget={document.body}
                                            isError={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                        />
                                    )}
                                />
                            </Grid>


                            {/* {Tracking Number} */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Controller
                                    name="trackingNumberTo"
                                    control={control}
                                    rules={{ required: 'Required' }} // Validation rule
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            label="Tracking Number"
                                            size="small"
                                            placeholder="Enter tracking number to"
                                            fullWidth
                                            error={!!error} // Show error state if validation fails
                                            helperText={error ? error.message : ''} // Display error message
                                            {...field}
                                        />
                                    )}
                                />
                            </Grid>


                        </Grid>
                        <CardActions>
                            <Button
                                onClick={handleSubmit(onSubmitDemographics)}
                                variant="contained"
                                disabled={submitting}
                                startIcon={<SaveOutlinedIcon />}
                                style={{ backgroundColor: '#1e2b55', color: 'white' }}
                            >
                                Save
                            </Button>
                            {/* <Button
                                variant="contained"
                                disabled={submitting}
                                startIcon={<CancelOutlinedIcon />}
                                style={{ backgroundColor: '#F50B5E', color: 'white' }}
                            >
                                Cancel
                            </Button> */}
                        </CardActions>
                    </CardContent>
                )}

                {tabIndex === 1 && (
                    <CardContent>
                        {/* <Box mb={2}>
                            <Typography variant="h6">Upload Document</Typography>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ marginTop: '16px' }}
                            />
                        </Box> */}
                        <CardActions>
                            <Button
                                onClick={handleOpenDialog}
                                variant="contained"
                                startIcon={<NoteAddIcon />}
                                style={{ backgroundColor: '#1e2b55', color: 'white' }}
                            >
                                Add
                            </Button>
                        </CardActions>
                        {/* Patient Documents List */}
                        <Typography variant="h6" gutterBottom>Documents</Typography>
                        {patientDocuments.length > 0 ? (
                            <Grid container spacing={1}> {/* Reduced spacing */}
                                {patientDocuments.map((doc, index) => ( // Added index for numbering
                                    <Grid item xs={12} sm={6} md={4} key={doc._id}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                padding: '8px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' // Added shadow
                                            }}
                                        >
                                            <CardContent style={{ padding: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                                    {`${index + 1}. ${doc.filename || 'Untitled Document'}`} {/* Display numbering */}
                                                </Typography>
                                                <DeleteOutlineIcon
                                                    onClick={() => handleDeleteDocument(doc._id)} // Call the delete handler
                                                    style={{ cursor: 'pointer', color: '#f44336' }} // Add a red color to the icon
                                                />
                                            </CardContent>
                                            <Typography variant="caption" color="textSecondary">
                                                <a href="#" onClick={() => handleClickOpen(doc)} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                                                    View Document
                                                </a>
                                            </Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body2" color="textSecondary">No documents found for this patient.</Typography>
                        )}
                    </CardContent>
                )}
                <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                    <DialogTitle>Document Preview</DialogTitle>
                    <DialogContent>
                        {selectedDocument && (
                            <>
                                {/* Use iframe for PDFs and direct links for images */}
                                {selectedDocument.url.endsWith('.pdf') ? (
                                    <iframe
                                        src={selectedDocument.presignedUrl}
                                        width="100%"
                                        height="600px"
                                        title="Document Preview"
                                    />
                                ) : (
                                    <img
                                        src={selectedDocument.presignedUrl}
                                        alt={selectedDocument.filename}
                                        style={{ width: '100%', maxHeight: '600px' }}
                                    />
                                )}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ backgroundColor: '#eaba2b', color: 'white' }}>Close</Button>
                    </DialogActions>
                </Dialog>


            </Card>
            <Dialog open={openModel} onClose={handleClose}>
                <DialogTitle>Add Document</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Document Type Dropdown */}
                        <Grid item xs={12}>
                            <Select
                                fullWidth
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Select Document Type</MenuItem>
                                <MenuItem value="DNA Lab Results">DNA Lab Results</MenuItem>
                                <MenuItem value="Other Lab Results">Other Lab Results</MenuItem>
                                <MenuItem value="Insurance Card">Insurance Card</MenuItem>
                                <MenuItem value="Intake Form">Intake Form</MenuItem>
                            </Select>
                        </Grid>

                        {/* Date Picker */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Select Date"
                                InputLabelProps={{ shrink: true }}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </Grid>

                        {/* File Input */}
                        <Grid item xs={12}>
                            <Box mb={2}>
                                <Typography variant="h6">Upload Document</Typography>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ marginTop: '16px' }}
                                />
                            </Box>
                        </Grid>

                        {/* Send Email Checkbox */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                    />
                                }
                                label="Send email to patient"
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>

                    {/* Upload Button */}
                    <Button
                        onClick={onUploadDocument}
                        variant="contained"
                        disabled={!file}
                        startIcon={<SaveOutlinedIcon />}
                        style={{ backgroundColor: '#1e2b55', color: 'white' }}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>

    );
};

export default Demographics;
