import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import ReactSelect from 'react-select';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import * as Yup from "yup";

const InsurancePage = (props) => {
    const [PayerData, setPayerData] = React.useState([{ 'label': '11 Other Non-Federal Programs', 'value': '11'},
    { 'label': '12 Preferred Provider Organization (PPO)', 'value': '12' },
    {'label': '13 Point of Service (POS)', 'value': '13'},
    {'label': '14 Exclusive Provider Organization (EPO)', 'value': '14'},
    {'label': '15 Indemnity Insurance', 'value': '15'},
    {'label': '16 Health Maintenance Organization (HMO) Medicare Risk', 'value': '16'},
    {'label': '17 Dental Maintenance Organization', 'value': '17'},
    {'label': 'AM Automobile Medical', 'value': 'AM'},
    {'label': 'BL Blue Cross/Blue Shield', 'value':'BL'},
    {'label': 'CH Champus', 'value': 'CH'},
    {'label': 'CI Commercial Insurance Co.', 'value': 'CI'},
    {'label': 'DS Disability', 'value': 'DS'},
    {'label': 'FI Federal Employees Program', 'value':'FI'},
    {'label': 'HM Health Maintenance Organization', 'value': 'HM'},
    {'label': 'LM Liability Medical', 'value': 'LM'},
    {'label': 'MA Medicare Part A', 'value': 'MA'},
    {'label': 'MB Medicare Part B', 'value': 'MB'},
    {'label': 'MC Medicaid', 'value': 'MC'},
    {'label': 'OF Other Federal Program', 'value': 'OF'},
    {'label': '1484 Use code OF when submitting Medicare Part Dclaims.', 'value': '1484'},
    {'label': 'TV Title V', 'value':'TV'},
    {'label': 'VA Veterans Affairs Plan', 'value': 'VA'},
    {'label': 'WC Workers’ Compensation Health Claim', 'value': 'WC'},
    {'label': 'ZZ Mutually Defined', 'value': 'ZZ'},
]);
    const location = useLocation()
    console.log("props", location.state.insuranceId);
    const validationSchema = Yup.object({
        payerName: Yup.string().required('Payer Name is required'),
    });
    const defValues = {
        _id: '',
        payerName: '',
        payerID: '',
        payerType: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNo: '',
        fax: ''
    }
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        context: undefined,
        criteriaMode: 'firstError',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        delayError: undefined,
        resolver: yupResolver(validationSchema),
        defaultValues: defValues,
    });

    const [submitting, setSubmitting] = useState(false)
    const insuranceId = location.state.insuranceId

    const navigate = useNavigate();

    const fields = [
        '_id',
        'payerName',
        'payerID',
        'payerType',
        'address',
        'city',
        'state',
        'zip',
        'phoneNo',
        'fax'
    ]
    const onSubmit = (data) => {
        const postData = data;
        console.log('data Checking......', postData)
        setSubmitting(true)
        console.log('This is post data', postData);
        axios
            .post(
                `${process.env.REACT_APP_SERVER_BASE_URI}/insurances/addInsurance`,
                postData, null
            )
            .then((response) => {
                setSubmitting(false)
                alert.success("Record saved successfully.", {
                    type: "success",
                    onClose: () => {
                        navigate('/insurances')
                    },
                });
            })
            .catch((error) => {
                setSubmitting(false)
                alert.success(`Error ${error.message}`, {
                    type: 'error',
                })
            })
    }

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          width: '250px',
          borderColor: state.isFocused ? '#80bdff' : provided.borderColor,
          boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : provided.boxShadow,
        }),
      };


    const onclickcopy = () => {
        // fields.forEach(field => setValue(field, ''))
        setValue('_id', '')
    }
    function handleCancel() {
        navigate('/insurances')
    }

    useEffect(() => {
        if (insuranceId > 0) {
            var postdate = [insuranceId]
            let isComponentMounted = true
            const fetchData = async () =>
                axios
                    .post(
                        `${process.env.REACT_APP_SERVER_BASE_URI}/insurances/getInsurancesById`,
                        [insuranceId]
                    )
                    .then((response) => {
                        console.log('response.data: ', response.data)
                        if (response.data) {
                            fields.forEach((field) => setValue(field, response.data[0][field]));
                        }
                    })
                    .catch((error) => {
                        console.error('There was an error!', error)
                    })
            fetchData()
            return () => {
                isComponentMounted = false
            }
        }
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [insuranceId])
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={1}
                        //   alignContent="center"
                        //   justifyContent="center"
                        style={{
                            width: '80%',
                            marginBottom: '10px',
                            border: '2px solid ',
                            borderRadius: '20px',
                            marginTop: '10px',
                            marginLeft: '50px',
                            marginRight: '30px',
                            paddingBottom: '20px',
                            borderColor: 'black'
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            style={{
                                borderBottom: '2px solid black',
                                borderRadius: '14px',
                                backgroundColor: '#BAB6E9'
                            }}
                        >
                            <Typography style={{ fontWeight: 'bold', color: 'white', fontSize: '22px' }}>
                            Insurance
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            style={{
                                border: '2px solid ',
                                marginTop: '10px',
                                borderColor: 'black'
                            }}
                        >
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography style={{ marginLeft: '5px' }}> PAYER NAME</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography style={{ marginLeft: '15px' }}> PAYER ID</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>PAYER TYPE</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            {...register('payerName')}
                                            id="standard-basic" 
                                            size="small"
                                            style={{ marginLeft: '5px' }}
                                            variant="filled"
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            {...register('payerID')}
                                            id="standard-basic"
                                            style={{ marginLeft: '15px' }}
                                            size="small"
                                            variant="filled"
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Grid item xs={5}>
                                        <Controller
                                            name='payerType'
                                            {...register('payerType')}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    variant="filled"
                                                    {...field}
                                                    fullWidth
                                                    options={PayerData}
                                                    styles={customStyles}
                                                    value={{ label: getValues('payerType') }}
                                                    onInputChange={(ev) => {
                                                        if (ev && ev.length > 0) {
                                                            console.log('ee:', ev);
                                                            setValue('payerType', ev);
                                                            console.log('ee2:', getValues('payerType'));
                                                        }
                                                    }}
                                                    // tabSelectsValue={true}
                                                    onChange={event => {
                                                        console.log('Event', event)
                                                        // setValue('PayerName', event.label);
                                                        setValue(
                                                            'payerType',
                                                            `${event.label}`
                                                        );

                                                    }}
                                                   


                                                    size='small'
                                                />
                                            )}
                                        />
                                        {/* <TextField
                                            {...register('PayerName')}
                                            id="standard-basic"
                                            size="small"
                                            variant="filled"
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px',
                                                    width: '220px'
                                                }
                                            }}
                                        /> */}


                                    </Grid>
                                        {/* <TextField
                                            {...register('payerType')}
                                            id="standard-basic"
                                            size="small"
                                            variant="filled"
                                            marginLeft='10px'
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px',
                                                    width: '280px'
                                                }
                                            }}
                                        /> */}
                                    </Grid>
                                </Grid>

                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style={{ marginLeft: '5px' }}>PAYER ADDRESS</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('address')}
                                                        id="standard-basic"
                                                        size="small"
                                                        fullWidth
                                                        style={{ marginLeft: '5px' }}
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px',
                                                            
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={5}  borderLeft={1}>
                                        <Typography style={{ marginLeft: '10px'}}>FAX </Typography>
                                        <TextField
                                            {...register('fax')}
                                            style={{ marginLeft: '10px'}}
                                            id="standard-basic"
                                            size="small"
                                            fullWidth
                                            variant="filled"
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px',
                                                 
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={3}>
                                                <Typography style={{ marginLeft: '5px' }}>City</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>STO</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>ZIP</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        {...register('city')}
                                                        style={{ marginLeft: '15px' }}
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        {...register('state')}
                                                        fullWidth
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        {...register('zip')}
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px',
                                                                width: '190px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Typography style={{ marginLeft: '10px' }}> Phone No</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        {...register('phoneNo')}
                                                        style={{ marginLeft: '10px' }}
                                                        id="standard-basic"
                                                        size="small"
                                                        fullWidth
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px',
                                                            
                                                        
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                          

                            <Grid item xs={12} lg={12} sm={12}>
                                        <Button
                                            onClick={handleCancel}
                                            variant="gradient"
                                            // disabled={submitting}
                                            style={{
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                float: 'right',
                                                marginLeft: '20px',
                                                width: '90px',
                                                height: '35px',
                                                backgroundColor: '#A574FD',
                                                color: 'white',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <CancelOutlinedIcon fontSize="medium" style={{ color: 'red', paddingRight: '5px' }}></CancelOutlinedIcon>
                                            Return
                                        </Button>
                                        <Button
                                            onClick={handleSubmit(onSubmit)}
                                            variant="gradient"
                                            // disabled={submitting}
                                            style={{
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                float: 'right',
                                                marginLeft: 'auto',
                                                width: '80px',
                                                height: '35px',
                                                backgroundColor: '#A574FD',
                                                color: 'white',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <SaveOutlinedIcon
                                                fontSize="medium"
                                                style={{
                                                    color: 'white',
                                                    paddingRight: '5px',
                                                    paddingBottom: '2px'
                                                }}
                                            ></SaveOutlinedIcon>
                                            Save
                                        </Button>
                                        <Button
                                            onClick={onclickcopy}
                                            variant="gradient"
                                            // disabled={submitting}
                                            style={{
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                                float: 'right',
                                                marginLeft: 'auto',
                                                marginRight: '19px',
                                                width: '80px',
                                                height: '35px',
                                                backgroundColor: '#A574FD',
                                                color: 'white',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <SaveOutlinedIcon
                                                fontSize="medium"
                                                style={{
                                                    color: 'white',
                                                    marginTop: '10px',
                                                    paddingRight: '5px',
                                                    paddingBottom: '2px'
                                                }}
                                            ></SaveOutlinedIcon>
                                            Copy
                                        </Button>
                                    </Grid>


                          
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};


export default InsurancePage;