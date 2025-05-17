import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';


const InsuranceClaimPage = () => {
    const navigate = useNavigate();
    const [value1, setValue1] = React.useState(0);
    const [rows, setRows] = useState(null);
    const [patientIdArr, setPatientIdArr] = useState([]);
    const [updateDisable, setupdateDisable] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [rows1, setRows1] = useState(null);
      const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true
        }
    }, [])
    const handleChange = (event, newValue) => {
        setValue1(newValue);
    };
    const gridRowStyle = {
        boxShadow: 2,
        border: 2,
        background: 'white',
        fontSize: '13.6px !important',
        color: 'black !important',
        borderColor: 'rgba(5, 152, 236, 0.637) !important',
        '& .MuiDataGrid-cell:hover': {
            color: 'rgba(5, 152, 236, 0.637) !important',
            fontSize: '14.6px !important'
        },
        '& .super-app-theme--header': {
            backgroundColor: '#A574FD',
            color: 'white'
        }
    };

    const openInsuranceRegistration = (event, id) => {
        navigate('/InsurancePage', { state: { insuranceId: id } })
    }
  
    const columns = [
        { field: '_id', headerName: 'ID', headerClassName: 'super-app-theme--header', flex: 0.1 },
        {
            field: 'payerName',
            headerName: 'Payer Name',
            headerClassName: 'super-app-theme--header',
            flex: 0.3,
            renderCell: (cellValues) => (
                <Button
                    size="small"
                    variant="text"
                    color="info"
                    onClick={(event) => {

                        openInsuranceRegistration(event, cellValues.row._id)

                        
                    }}
                >{`${cellValues.row.payerName}`}</Button>
            ),

        },

        // { field: 'shortName', headerName: 'Short Name', width: 130 },
        {
            field: 'payerID',
            headerName: 'Payer ID',
            type: 'text',
            headerClassName: 'super-app-theme--header',
            flex: 0.3
        },

        {
            field: 'payerType',
            headerName: 'Payer Type',
            type: 'text',
            headerClassName: 'super-app-theme--header',
            flex: 0.3
        },
        {
            field: 'address',
            headerName: 'Address',
            type: 'text',
            headerClassName: 'super-app-theme--header',
            flex: 0.3
        },
        {
            field: 'city',
            headerName: 'City',
            type: 'text',
            headerClassName: 'super-app-theme--header',
            flex: 0.3
        },
        {
            field: 'state',
            headerName: 'State',
            type: 'text',
            headerClassName: 'super-app-theme--header',
            flex: 0.3
        },

        {
            field: 'zip',
            headerName: 'Zip',
            headerClassName: 'super-app-theme--header',
            flex: 0.3,
        },
        {
            field: 'phoneNo',
            headerName: 'Phone No',
            headerClassName: 'super-app-theme--header',
            flex: 0.5,

        },
        {
            field: 'fax',
            headerName: 'Fax',
            headerClassName: 'super-app-theme--header',
            flex: 0.5,
        

        },

    ];

    const columns1 = [
        { field: '_id', headerName: 'ID', headerClassName: 'super-app-theme--header', flex: 0.1 },
       

    ];

    useEffect(() => {
        // POST request using axios inside useEffect React hook
        axios
            .get(`${process.env.REACT_APP_SERVER_BASE_URI}/insurances`, null)
            .then((response) => {
                setisLoading(false);
                console.log("response checking!!", response.data);
                setRows(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [refresh]);

    return (
        <Box>
        <>
            <TabContext value={value1}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab  value={0} label="New" />
                        <Tab  value={1} label="submitted"/>
                    </TabList>
                </Box> */}
                <TabPanel value={0}>
                <div>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <Button
                                        sx={{ mb: 1, width: 150, height: 32, }}
                                        onClick={openInsuranceRegistration}
                                        variant='contained'
                                        color='primary'
                                    >
                                        Add New
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box mb={2}>
                        <div style={{ height: 400, width: '100%' }}>
                            {rows === null || rows.length === 0 ? null : (
                                <DataGrid
                                    rows={rows}
                                    GridStateColDef={defaultColDef}
                                    headerHeight={37}
                                    columns={columns}
                                    getRowId={row => (row != null ? row._id : 0)}
                                    sx={gridRowStyle}
                                    checkboxSelection
                                    components={{ Toolbar: GridToolbar }}

                                    onSelectionModelChange={e => {
                                        console.log('CHEWEEEEEEEEEEEEEEEEEEEE', e)
                                        setPatientIdArr(e)
                                        setupdateDisable(e.length > 0 ? false : true)
                                    }}

                                />
                            )}
                        </div>
                    </Box>
                </Container>
            </div>
                </TabPanel>
                <TabPanel value={1}>
                    <Container>
                        <Box mb={2}>
                            <div style={{ height: 400, width: '100%' }}>
                                {rows1 === null || rows1.length === 0 ? null : (
                                    <DataGrid
                                        rows={rows1}
                                        GridStateColDef={defaultColDef}
                                        headerHeight={37}
                                        columns={columns1}
                                        getRowId={row => (row != null ? row._id : 0)}
                                        sx={gridRowStyle}
                                        checkboxSelection
                                        components={{ Toolbar: GridToolbar }}

                                    />
                                )}
                            </div>
                        </Box>
                    </Container>

                </TabPanel>
            </TabContext>
        </>
    </Box>

    );
}


export default InsuranceClaimPage;

