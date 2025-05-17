import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Tab, Tabs } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import ReactSelect from 'react-select'; // Assuming you are using react-select for dropdown

const Claim = () => {
    const navigate = useNavigate();
    const { control, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [rows, setRows] = useState([]);
    const [submittedRows, setSubmittedRows] = useState([]);
    const [practice, setPractice] = useState([]);
    const [practiceId, setPracticeId] = useState('');
    const [fetchPractice, setFetchPractice] = useState(false);
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [userType, setUserType] = useState('');
    const [medicaidCheckBox, setMedicaidCheckBox] = useState('off');

    const auth = `Bearer ${localStorage.getItem('easyMedication_token')}`;
    const userName = localStorage.getItem('UserName');
    const userTyped = localStorage.getItem('userType');
    const PracticeId = localStorage.getItem('PracticeId');

    const headers = {
        Authorization: auth
    };

    const StyledButton = styled(Button)(({ theme }) => ({
        borderRadius: 24,
        boxShadow: theme.shadows[5],
        textTransform: 'none',
        padding: '10px 20px',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }));

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
    }), []);

    const gridRowStyle = {
        boxShadow: 2,
        border: 2,
        background: 'white',
        fontSize: '13.6px !important',
        color: 'black !important',
        borderColor: 'rgba(5, 152, 236, 0.637) !important',
        '& .MuiDataGrid-cell:hover': {
            color: 'rgba(5, 152, 236, 0.637) !important',
            fontSize: '14.6px !important',
        },
        '& .super-app-theme--header': {
            backgroundColor: '#A574FD',
            color: 'white',
        },
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.1, headerClassName: 'super-app-theme--header' },
        { field: 'uploadedBy', headerName: 'Uploaded By', flex: 0.3, headerClassName: 'super-app-theme--header' },
        { field: 'uploadTime', headerName: 'Upload Time', flex: 0.3, headerClassName: 'super-app-theme--header' },
        { field: 'filename', headerName: 'File Name', flex: 0.3, headerClassName: 'super-app-theme--header' },
        { field: 'noOfClaims', headerName: 'No. of claims', flex: 0.3, headerClassName: 'super-app-theme--header' },
    ];

    useEffect(() => {
        if (!fetchPractice) return;

        const fetchPractices = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URI}/practice/getAllPractice`, { headers });
                let filteredData = response.data;


                // Filter practices based on userType and matching PracticeId
                if (userTyped === "Admin") {
                    filteredData = filteredData.filter(field => field.id === parseInt(PracticeId));
                }

                const res = filteredData.map(field => ({
                    label: field.name,
                    value: field.id
                }));

                setPractice(res);
            } catch (error) {
                console.error("There was an error!", error);
            } finally {
                setIsLoading(false);
                setFetchPractice(false);
            }
        };

        fetchPractices();
    }, [fetchPractice, headers]);


    useEffect(() => {
        if (userType === "Admin") {
            setPractice([]);
        } else {
            setFetchPractice(true);
        }
    }, [userType]);

    useEffect(() => {
        if (!practiceId) {
            setRows([]);
            return;
        }
        const fetchClaimsLogs = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': auth,
                };
                const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URI}/claims/getAllClaimsLogs`, { headers, params: { practiceId } });
                setRows(response.data);
                setSubmittedRows(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching claims logs:', error);
                setIsLoading(false);
            }
        };

        fetchClaimsLogs();
    }, [practiceId, refresh, auth]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        let totalRowsCount = 0;
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('medicaidCheckBox', medicaidCheckBox);
            formData.append('submit', 'submit');
            formData.append('practiceId', practiceId);

            try {
                const uploadResponse = await axios.post(
                    `${process.env.REACT_APP_SERVER_BASE_URI}/practice/generatePracticeFile`,
                    formData,
                    { headers: { Authorization: auth } }
                );
                if(uploadResponse.data?.totalRows)
                {
                    totalRowsCount  = uploadResponse.data.totalRows;
                }

                if (uploadResponse.data?.generatedData) {
                    const blob = new Blob([uploadResponse.data.generatedData], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'SCBatchBilling_.txt';
                    link.click();

                    const logData = {
                        uploadedBy: userName,
                        filename: file.name,
                        filetype: file.type,
                        noOfClaims: totalRowsCount,
                        uploadTime: new Date().toISOString(),
                        practiceId: practiceId
                    };


                    await axios.post(
                        `${process.env.REACT_APP_SERVER_BASE_URI}/claims/addClaimsLogs`,
                        logData,
                        { headers: { Authorization: auth } }
                    );

                    setFile(null);

                    setRefresh(!refresh);

                }

            } catch (error) {
                console.error('Upload or log error:', error);
            }

        }

    };

    const handleDownloadSample = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/sample/sample.xlsx`;
        link.download = 'samplefile.xlsx';
        link.click();
    };

    return (
        <Box>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} aria-label="Claim Tabs">
                <Tab label="New" value={0} />
                <Tab label="Logs" value={1} />
            </Tabs>

            <Grid container spacing={2} mb={2} mt={2}>
                <Grid item xs={2}>
                    <Controller
                        name="practiceId"
                        control={control}
                        render={({ field }) => (
                            <ReactSelect
                                {...field}
                                value={practice.find(option => option.value === field.value)}
                                onChange={value => {
                                    setValue('practiceId', value ? value.value : '');
                                    setPracticeId(value ? value.value : '');
                                }}
                                options={practice}
                                placeholder="Select Practice"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4} mt={-2}>
                        {activeTab === 1 ? (
                            <StyledButton
                                sx={{ width: '80%', margin: 2, height: 40 }}
                                variant='contained'
                                color='primary'
                                onClick={handleDownloadSample}
                                disabled
                            >
                                Download Sample
                            </StyledButton>
                        ) : (
                            <StyledButton
                                sx={{ width: '80%', margin: 2, height: 40 }}
                                variant='contained'
                                color='primary'
                                onClick={handleDownloadSample}
                            >
                                Download Sample
                            </StyledButton>
                        )}
                    </Grid>
            </Grid>


            <Container>
                <Grid container spacing={2} mb={2}>
                    {activeTab === 0 && practiceId && (
                        <Grid item xs={12} sm={6} md={3}>
                            <input
                                accept="*"
                                style={{ display: 'none' }}
                                id="upload-file-input"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="upload-file-input">
                                <StyledButton
                                    component="span"
                                    sx={{ width: '80%', margin: 2, height: 40 }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Convert File Now
                                </StyledButton>
                            </label>
                            {file && (
                                <Box mt={1}>
                                    <Typography variant="body2">Selected file: {file.name}</Typography>
                                    <StyledButton onClick={handleUpload} variant="contained" color="secondary">
                                        Upload File
                                    </StyledButton>
                                </Box>
                            )}
                        </Grid>
                    )}

                </Grid>

            </Container>


            {activeTab === 1 && (
                <Box mt={2}>
                    <div style={{ height: 400 }}>
                        {isLoading ? (
                            <Typography variant="h6" align="center">Loading...</Typography>
                        ) : submittedRows.length === 0 ? (
                            <Typography variant="h6" align="center">No Data Available</Typography>
                        ) : (
                            <DataGrid
                                columns={columns}
                                rows={submittedRows}
                                components={{ Toolbar: GridToolbar }}
                                pageSize={10}
                                getRowId={(row) => row.id}
                                sx={gridRowStyle}
                                disableSelectionOnClick
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 10 },
                                    },
                                }}
                                defaultColDef={defaultColDef}
                            />
                        )}
                    </div>
                </Box>
            )}
        </Box>
    );
};

export default Claim;
