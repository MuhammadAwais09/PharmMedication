import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ReactSelect from 'react-select';
import { Container } from '@mui/system';
import { Typography, CircularProgress } from '@mui/material';
import Moment from 'moment'
import { useAlert } from "react-alert";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Height } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useNavigate } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const fields = [
    '_id',
    'patientID',
    'PayerType',
    'code',
    'BillingProviderFirstName',
    'BillingProviderLastName',
    'BillingProviderIdentificationCode',
    'BillingProviderAddress',
    'BillingProviderCity',
    'BillingProviderState',
    'BillingProviderZIP',
    'SubscriberRelationShip',
    'SubscriberName',
    'SubscriberFirstName',
    'SubscriberLastName',
    'SubscriberIdentificationCode',
    'SubscriberAddress',
    'SubscriberCity',
    'SubscriberState',
    'SubscriberZIP',
    'SubscriberDOB',
    'SubscriberGender',
    'PayerName',
    'PayerID',
    'BillingProviderSecondaryIdentificationCode',
    'RenderingProviderFirstName',
    'RenderingProviderLastName',
    'RenderingProviderCode',
    'ClaimIndentifier',
    'Claimamount',
    'TotalUnits',
    'placeOfService',
    'DateOfService',
    'ICDs',
    'dateOfServiceFrom',
    'dateOfServiceTo',
    'CPTs',
    'dosfrom',
    'dosto',
    'authorizationNumber',
    'RenderingProviderCode',
    'facilityName',
    'facilitynpi',
    'facilityAddress1',
    'facilityAddress2',
    'facilityCity',
    'facilityState',
    'facilityZip',
    'facilityId',
    'refferingnpi',
    'refferingFirstName',
    'refferingLastName',
    'RenderingProviderTaxonomy',




]
const defValues = {
    _id: '',
    patientID: '',
    PayerType: '',
    BillingProviderFirstName: '',
    BillingProviderLastName: '',
    authorizationNumber: '',
    BillingProviderIdentificationCode: '',
    BillingProviderAddress: '',
    BillingProviderCity: '',
    BillingProviderState: '',
    BillingProviderZIP: '',
    SubscriberRelationShip: '',
    SubscriberName: '',
    SubscriberFirstName: '',
    SubscriberLastName: '',
    SubscriberIdentificationCode: '',
    SubscriberAddress: '',
    SubscriberCity: '',
    SubscriberState: '',
    SubscriberZIP: '',
    SubscriberDOB: '',
    SubscriberGender: '',
    PayerName: '',
    PayerID: '',
    BillingProviderSecondaryIdentificationCode: '',
    RenderingProviderFirstName: '',
    RenderingProviderLastName: '',
    RenderingProviderCode: '',
    ClaimIndentifier: '',
    Claimamount: '',
    TotalUnits: '',
    placeOfService: '',
    DateOfService: '',
    RenderingProviderCode: '',
    facilityName: '',
    facilitynpi: '',
    facilityAddress1: '',
    facilityAddress2: '',
    facilityCity: '',
    facilityState: '',
    facilityZip: '',
    facilityId: "",
    refferingnpi: '',
    refferingFirstName: '',
    refferingLastName: '',
    RenderingProviderTaxonomy: '',
    ICDs: [],
    CPTs: [{
        amount: '',
        quantity: '',
        code: '',
        placeOfService: '',
        DateOfServiceFrom: '',
        dateOfServiceTo: '',
        mod1: '',
        mod2: '',
        mod3: '',
        mod4: '',
        pointer1: '',
        pointer2: '',
        pointer3: '',
        pointer4: '',
    },
    {
        amount: '',
        quantity: '',
        code: '',
        placeOfService: '',
        dateOfServiceFrom: '',
        dateOfServiceTo: '',
        mod1: '',
        mod2: '',
        mod3: '',
        mod4: '',
        pointer1: '',
        pointer2: '',
        pointer3: '',
        pointer4: '',
    }],
}
const ClaimPage = (props) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const location = useLocation()
    const claimId = location.state.claimId;
    const insuranceName = location.state.payerName;
    const [patientNamee, setPatientNamee] = useState('');
    const [payerNamee, setPayerNamee] = useState('');
    const [payerId, setPayerId] = useState('');
    const [payerType, setPayerType] = useState('');
    const [patient, setPatient] = React.useState(false);
    const [payerName, setPayerName] = React.useState(false);
    const [patientremove, setPatientremove] = React.useState(false);
    const [Dob, setDob] = React.useState(Moment().format('YYYY-MM-DD'))
    const [patientData, setPatientData] = React.useState([]);
    const [payerNameData, setPayerNameData] = React.useState([]);
    const [searchText, setSearchText] = useState('');
    const [firstselect, setFirstselect] = React.useState('');
    const [Gender, setGender] = React.useState('');
    const [firstselect3, setFirstselect3] = React.useState('');
    const [submitting, setSubmitting] = useState(false)
    const diagArr = ["Diag1", "Diag2", "Diag3", "Diag4", "Diag5", "Diag6",
        "Diag7", "Diag8", "Diag9", "Diag10", "Diag11", "Diag12"]
    const [diagId0, setdiagId0] = useState('')
    const [diagId1, setdiagId1] = useState('')
    const [diagId2, setdiagId2] = useState('')
    const [diagId3, setdiagId3] = useState('')
    const [diagId4, setdiagId4] = useState('')
    const [diagId5, setdiagId5] = useState('')
    const [diagId6, setdiagId6] = useState('')
    const [diagId7, setdiagId7] = useState('')
    const [diagId8, setdiagId8] = useState('')
    const [diagId9, setdiagId9] = useState('')
    const [diagId10, setdiagId10] = useState('')
    const [diagId11, setdiagId11] = useState('')
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [PayerData, setPayerData] = React.useState([{ 'label': 'Medicaid Massachusetts', 'PayerId': 'SKMA0', 'PayerType': 'MC' }, { 'label': 'Community Health Plan', 'PayerId': '22254', 'PayerType': 'Cl' }]);
    const validationSchema = Yup.object({
        SubscriberFirstName: Yup.string().required('First Name is required'),
        SubscriberLastName: Yup.string().required('Last Name is required'),
    });
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
    const [value1, setValue1] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue1(newValue);
    };
    const patientListStyle = {
        cursor: 'pointer',
        hover: {
            background: '#3b3b3b !important',
            color: 'rgba(5, 152, 236, 0.637) !important'
        },
        color: 'green',
        selection: {
            background: '#D7624E',
            color: 'white'
        }
    };
    ///Calling ClaimsByID
    useEffect(() => {
        if (claimId > 0) {
            var postdate = [claimId]
            let isComponentMounted = true
            const fetchData = async () =>
                axios
                    .post(
                        `${process.env.REACT_APP_SERVER_BASE_URI}/claims/getClaimsById`, postdate,
                        null
                    )
                    .then((response) => {
                        console.log('response.data: ', response.data)
                        if (response.data) {
                            fields.forEach((field) => setValue(field, response.data[0][field]))
                            // diagArr= getValues(response.data[0].ICDs);
                            var ICD = response.data[0].ICDs
                            setdiagId0(typeof ICD[0] != undefined ? ICD[0] : '')
                            setdiagId1(typeof ICD[1] != undefined ? ICD[1] : '')
                            setdiagId2(typeof ICD[2] != undefined ? ICD[2] : '')
                            setdiagId3(typeof ICD[3] != undefined ? ICD[3] : '')
                            setdiagId4(typeof ICD[4] != undefined ? ICD[4] : '')
                            setdiagId5(typeof ICD[5] != undefined ? ICD[5] : '')
                            setdiagId6(typeof ICD[6] != undefined ? ICD[6] : '')
                            setdiagId7(typeof ICD[7] != undefined ? ICD[7] : '')
                            setdiagId8(typeof ICD[8] != undefined ? ICD[8] : '')
                            setdiagId9(typeof ICD[9] != undefined ? ICD[9] : '')
                            setdiagId10(typeof ICD[10] != undefined ? ICD[10] : '')
                            setdiagId11(typeof ICD[11] != undefined ? ICD[11] : '')
                            var duedateYMD = Moment(response.data.SubscriberDOB).format('YYYY-MM-DD')
                            setDob(duedateYMD)
                            // typeof data[1].diagId != undefined ? setdiagId2(data[1].diagId) : null
                            var CPTs = response.data[0].CPTs
                            var datefrom = Moment(CPTs[0].dateOfServiceFrom).format('YYYY-MM-DD')
                            var datefrom1 = Moment(CPTs[1].dateOfServiceFrom).format('YYYY-MM-DD')
                            var dateto = Moment(CPTs[0].dateOfServiceTo).format('YYYY-MM-DD')
                            var dateto1 = Moment(CPTs[1].dateOfServiceTo).format('YYYY-MM-DD')
                            setValue('placeOfService', CPTs[0].placeOfService)
                            setValue('dosfrom', datefrom)
                            setValue('dosto', dateto)
                            setValue('procedure', CPTs[0].code)
                            setValue('mod1', CPTs[0].mod1)
                            setValue('mod2', CPTs[0].mod2)
                            setValue('mod3', CPTs[0].mod3)
                            setValue('mod4', CPTs[0].mod4)
                            setValue('pointer1', CPTs[0].pointer1)
                            setValue('pointer2', CPTs[0].pointer2)
                            setValue('pointer3', CPTs[0].pointer3)
                            setValue('pointer4', CPTs[0].pointer4)
                            setValue('Charges', CPTs[0].amount)
                            setValue('TotalUnits', CPTs[0].quantity)
                            setValue('placeOfService2', CPTs[1].placeOfService)
                            setValue('dosfrom2', datefrom1)
                            setValue('dosto2', dateto1)
                            setValue('procedure2', CPTs[1].code)
                            setValue('mod11', CPTs[1].mod1)
                            setValue('mod22', CPTs[1].mod2)
                            setValue('mod33', CPTs[1].mod3)
                            setValue('mod44', CPTs[1].mod4)
                            setValue('pointer11', CPTs[1].pointer1)
                            setValue('pointer22', CPTs[1].pointer2)
                            setValue('pointer33', CPTs[1].pointer3)
                            setValue('pointer44', CPTs[1].pointer4)
                            setValue('Charges2', CPTs[1].amount)
                            setValue('TotalUnits2', CPTs[1].quantity)
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
    }, [claimId])
    function handleCancel() {
        navigate('/Claim')
    }
    const onclickcopy = () => {
        // fields.forEach(field => setValue(field, ''))
        setValue('_id', '')
    }
    const onChangeHandle = async (value) => {
        // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions
        console.log(value);
        const sendData = {
            id: 0,
            lastName: value,
            firstName: '',
            ssn: '',
            status: '',
            cellPhone: '',
            address: '',
            dob: ''
        };
        axios
            // .post(`${process.env.NEXT_PUBLIC_API_URL}/Patients/searchPatient`, sendData,
            // { headers },
            .get(`${process.env.REACT_APP_SERVER_BASE_URI}/patients?firstName=${''}&lastName=${value}`, null)

            .then((response) => {
                setPatientData(response.data);
                setPatient(true);

            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };


    const onChangeHandleInsurance = async (value) => {
        // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions
        console.log(value);
        var postdate = [insuranceName]
        let isComponentMounted = true
        const sendData = {
            id: 0,
            payerName: value,
            payerType: '',
            address: '',
            zip: '',
            city: '',
            fax: '',
            phoneNo: ''
        };
        const fetchData = async () =>
        axios
            // .post(`${process.env.NEXT_PUBLIC_API_URL}/Patients/searchPatient`, sendData,
            // { headers },
            .post(`${process.env.REACT_APP_SERVER_BASE_URI}/insurances/getInsuranceByName?`
            ,[value])
            .then((response) => {
                console.log("fetching name", response.data);
                setPayerNameData(response.data);
                setPayerName(true);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            })
            fetchData()
            return () => {
                isComponentMounted = false
            }
    };


    const onSubmit = (data) => {
        const postData = data;
        console.log('data Checking......', postData)
        setSubmitting(true)
        /* eslint-disable */
        // diagArr.map((d) =>
        //     postData[d] != "" ? postData.ICDs.push(postData[d]) : ""
        // )
        const diagArr = [];


        if (diagId0 != null && diagId0.length > 0) {
            diagArr.push(diagId0)
        }
        if (diagId1 != null && diagId1.length > 0) {
            diagArr.push(diagId1)
        }
        if (diagId2 != null && diagId2.length > 0) {
            diagArr.push(diagId2)
        }
        if (diagId3 != null && diagId3.length > 0) {
            diagArr.push(diagId3)
        }
        if (diagId4 != null && diagId4.length > 0) {
            diagArr.push(diagId4)
        }
        if (diagId5 != null && diagId5.length > 0) {
            diagArr.push(diagId5)
        }
        if (diagId6 != null && diagId6.length > 0) {
            diagArr.push(diagId6)
        }
        if (diagId7 != null && diagId7.length > 0) {
            diagArr.push(diagId7)
        }
        if (diagId8 != null && diagId8.length > 0) {
            diagArr.push(diagId8)
        }
        if (diagId9 != null && diagId9.length > 0) {
            diagArr.push(diagId9)
        }
        if (diagId10 != null && diagId10.length > 0) {
            diagArr.push(diagId10)
        }
        if (diagId11 != null && diagId11.length > 0) {
            diagArr.push(diagId11)
        }
        postData.ICDs = diagArr
        for (var i = 0; i < 2; i++) {
            if (i == 0) {
                if (postData.Charges != "") {

                    let cptitems = {
                        amount: postData.Charges,
                        quantity: postData.TotalUnits,
                        code: postData.procedure,
                        placeOfService: postData.placeOfService,
                        dateOfServiceFrom: postData.dosfrom,
                        dateOfServiceTo: postData.dosto,
                        mod1: postData.mod1,
                        mod2: postData.mod2,
                        mod3: postData.mod3,
                        mod4: postData.mod4,
                        pointer1: postData.pointer1,
                        pointer2: postData.pointer2,
                        pointer3: postData.pointer3,
                        pointer4: postData.pointer4,
                    }
                    postData.CPTs[i] = cptitems;
                }

            } else {
                let cptitems = {
                    amount: postData.Charges2,
                    quantity: postData.TotalUnits2,
                    code: postData.procedure2,
                    placeOfService: postData.placeOfService2,
                    dateOfServiceFrom: postData.dosfrom2,
                    dateOfServiceTo: postData.dosto2,
                    mod1: postData.mod11,
                    mod2: postData.mod22,
                    mod3: postData.mod33,
                    mod4: postData.mod44,
                    pointer1: postData.pointer11,
                    pointer2: postData.pointer22,
                    pointer3: postData.pointer33,
                    pointer4: postData.pointer44,
                }
                postData.CPTs[i] = cptitems;
            }
        }
        console.log('This is post data', postData);
        axios
            .post(
                `${process.env.REACT_APP_SERVER_BASE_URI}/claims/addClaim`,
                postData, null
            )
            .then((response) => {
                setSubmitting(false)
                alert.success("Record saved successfully.", {
                    type: "success",
                    onClose: () => {
                        navigate('/Claim')
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
    const handleGender = (event) => {
        setGender(event.target.value);
    };
    const handleChange3 = (event) => {
        setFirstselect3(event.target.value);
    };
    const selectstyle = {
        height: '30px'
    };
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true
        }
    }, [])
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
    // useEffect(() => {
    //     document.addEventListener("mousedown", () => {
    //         setPatient(false);
    //     })
    //   },[])
    return (
        <>
            {submitting ? (
                <CircularProgress
                    style={{
                        width: '50px',
                        height: '50px',
                        position: 'absolute',
                        left: '50%',
                        top: '270%',
                        marginLeft: '-25px',
                        marginTop: '-25px',
                        zIndex: 1000,
                        color: '#1677FF',
                    }}
                />
            ) : null}
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={1}
                        //   alignContent="center"
                        //   justifyContent="center"
                        style={{
                            width: '100%',
                            marginBottom: '10px',
                            border: '2px solid ',
                            borderRadius: '20px',
                            marginTop: '10px',
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
                            <Button onClick={handleCancel}>
                            <ArrowBackIcon fontSize="medium" style={{ color: 'red'}}></ArrowBackIcon>
                            </Button>
                                Professional Claim
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
                            <Grid item xs={8}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography style={{ marginLeft: '5px' }}>1. PAYER NAME</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography style={{ marginLeft: '45px' }}> PAYER ID</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography >PayerType</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* <TextField
                                                        {...register('SubscriberLastName')}
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
                                                        error={errors.SubscriberLastName}
                                                    />
                                                     <p style={{ color: "red", fontSize: "14px" }}>
                                                        {errors.SubscriberLastName?.message}
                                                    </p> */}
                                        <ClickAwayListener onClickAway={() => setPayerName(false)}>
                                            <TextField
                                                {...register('payerName')}
                                                size="small"
                                                fullWidth
                                                variant="filled"
                                                autoComplete="off"
                                                style={{ marginLeft: '5px' }}
                                                placeholder="Payer Name"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                onKeyUp={(eve) => {
                                                    // console.log('ee:', ev.target.value);
                                                    setSearchText(eve.target.value);
                                                    setPayerNameData([]);
                                                    // dont fire API if the user delete or not entered anything
                                                    if (eve.target.value !== null && eve.target.value !== '' && eve.target.value.length > 0) {
                                                        onChangeHandleInsurance(eve.target.value);
                                                    } else {
                                                        setPayerName(false);

                                                    }
                                                }}
                                            />
                                        </ClickAwayListener>
                                        {payerName ? (
                                            <div
                                                className="col-xs-6"
                                                style={{
                                                    height: 150,
                                                    overflowY: 'scroll',
                                                    padding: '14px 16px',
                                                    fontSize: '0.875rem',
                                                    color: '#67748e',
                                                    borderRadius: '5px',
                                                    background: 'white',
                                                    textAlign: 'justify',
                                                    textJustify: 'inter-word',
                                                    position: 'absolute',
                                                    zIndex: '99',
                                                    width: '39%',
                                                    border: '1px solid #6cb5f9'
                                                }}
                                            >
                                                {payerName ? (
                                                    payerNameData.length > 0 ? (
                                                        payerNameData.map((s1, index) => {
                                                            var patt = `${s1.payerName}`;
                                                            var pattLower = patt.toLowerCase();
                                                            var i = pattLower.indexOf(searchText);
                                                            console.log('patt:', patt)
                                                            console.log('searchText:', searchText);
                                                            console.log('i:', i)
                                                            var pat1 = patt.substring(0, i);
                                                            console.log("p1",pat1);
                                                            var pa = patt.substring(i,searchText.length + i);
                                                            console.log("p", pa);
                                                            var pa2 = patt.substring(i + pa.length, pattLower.length);
                                                            console.log('p2', pa2);
                                                            return (
                                                                <>
                                                                <p
                                                                    style={patientListStyle}
                                                                    onClick={(e) => {
                                                                        setValue('payerName', `${payerNameData[index].payerName}`);
                                                                        setPayerNameData([]);
                                                                        setPayerName(false);
                                                                        setPayerNamee(`${payerNameData[index].payerName}`);
                                                                        setPayerId(`${payerNameData[index].payerID}`);
                                                                        setPayerType(`${payerNameData[index].payerType}`);
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        setPayerNameData([]);
                                                                        setPayerName(false);
                                                                    }}
                                                                    onChange={(e) => {
                                                                        setPayerNameData([]);
                                                                        setPayerName(false);
                                                                        setPayerNamee('');
                                                                    }}
                                                                >
                                                                    <span>{pat1}</span>
                                                                    <span style={{ backgroundColor: 'yellow' }}>{pa}</span>
                                                                    <span>{pa2}</span>
                                                                </p>
                                                            </>
                                                            );
                                                        })
                                                    ) : (
                                                        <Typography>No Record found</Typography>
                                                    )
                                                ) : null}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            {...register('PayerID')}
                                            id="standard-basic"
                                            style={{ marginLeft: '45px' }}
                                            size="small"
                                            variant="filled"
                                            value= {payerId}
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
                                            {...register('PayerType')}
                                            id="standard-basic"
                                            size="small"
                                            fullWidth
                                            variant="filled"
                                            marginLeft='10px'
                                            value= {payerType}
                                            inputProps={{
                                                style: {
                                                    minHeight: '30px',
                                                    padding: '0 1px'
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style={{ marginLeft: '5px' }}>2. PATIENTS NAME</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    {/* <TextField
                                                        {...register('SubscriberLastName')}
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
                                                        error={errors.SubscriberLastName}
                                                    />
                                                     <p style={{ color: "red", fontSize: "14px" }}>
                                                        {errors.SubscriberLastName?.message}
                                                    </p> */}
                                                    <ClickAwayListener onClickAway={() => setPatient(false)}>
                                                        <TextField
                                                            {...register('SubscriberLastName')}
                                                            size="small"
                                                            variant="filled"
                                                            autoComplete= "off"
                                                            style={{ marginLeft: '5px' }}
                                                            placeholder="Last Patient"
                                                            inputProps={{
                                                                style: {
                                                                    minHeight: '30px',
                                                                    padding: '0 1px'
                                                                }
                                                            }}
                                                            onKeyUp={(ev) => {
                                                                console.log('ee:', ev.target.value);
                                                                setSearchText(ev.target.value);
                                                                setPatientData([]);

                                                                // dont fire API if the user delete or not entered anything
                                                                if (ev.target.value !== null && ev.target.value !== '' && ev.target.value.length > 0) {
                                                                    onChangeHandle(ev.target.value);
                                                                } else {
                                                                    setPatient(false);

                                                                }
                                                            }}
                                                        />
                                                    </ClickAwayListener>
                                                    {patient ? (
                                                        <div
                                                            className="col-xs-6"
                                                            style={{
                                                                height: 150,
                                                                overflowY: 'scroll',
                                                                padding: '14px 16px',
                                                                fontSize: '0.875rem',
                                                                color: '#67748e',
                                                                borderRadius: '5px',
                                                                background: 'white',
                                                                textAlign: 'justify',
                                                                textJustify: 'inter-word',
                                                                position: 'absolute',
                                                                zIndex: '99',
                                                                width: '39%',
                                                                border: '1px solid #6cb5f9'
                                                            }}
                                                        >
                                                            {patient ? (
                                                                patientData.length > 0 ? (
                                                                    patientData.map((s, index) => {
                                                                        var pat = `${s.lastName}, ${s.firstName}`;
                                                                        var patLower = pat.toLowerCase();
                                                                        var i = patLower.indexOf(searchText);
                                                                        // console.log('pat:', patLower)
                                                                        console.log('searchText:', searchText);
                                                                        // console.log('i:', i)
                                                                        var p1 = pat.substring(0, i);
                                                                        // console.log('p1:', p1)
                                                                        var p = pat.substring(i, searchText.length + i);

                                                                        var p2 = pat.substring(i + p.length, patLower.length);

                                                                        return (
                                                                            <>
                                                                                <p
                                                                                    style={patientListStyle}
                                                                                    onClick={(e) => {
                                                                                        setValue(
                                                                                            'SubscriberLastName',
                                                                                            `${patientData[index].lastName}`
                                                                                        );
                                                                                        setValue('SubscriberFirstName', `${patientData[index].firstName}`)
                                                                                        setPatientData([]);
                                                                                        setPatient(false);
                                                                                        setPatientNamee(
                                                                                            `${patientData[index].lastName},${patientData[index].firstName}}`
                                                                                        );
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        setPatientData([]);
                                                                                        setPatient(false);
                                                                                    }}
                                                                                    onChange={(e) => {
                                                                                        setPatientData([]);
                                                                                        setPatient(false);
                                                                                        setPatientNamee('');
                                                                                    }}
                                                                                >
                                                                                    <span>{p1}</span>
                                                                                    <span style={{ backgroundColor: 'yellow' }}>{p}</span>
                                                                                    <span>{p2}</span>
                                                                                    {s.SubscriberFirstName}
                                                                                    {/* <Divider variant="hard" /> */}
                                                                                </p>
                                                                            </>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    <Typography>No Record found</Typography>
                                                                )
                                                            ) : null}
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        {...register('SubscriberFirstName')}
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
                                                        error={errors.SubscriberFirstName}
                                                    />
                                                    <p style={{ color: "red", fontSize: "14px" }}>
                                                        {errors.SubscriberFirstName?.message}
                                                    </p>

                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style={{ marginLeft: '5px' }}>3. PATIENTS BIRTH DAY / SEX</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        // {...register('SubscriberDOB')}
                                                        fullWidth
                                                        type="date"
                                                        id="standard-basic"
                                                        style={{ marginLeft: '5px', marginTop: '7px' }}
                                                        size="small"
                                                        variant="filled"
                                                        value={Dob}
                                                        onChange={e => {
                                                            setValue('SubscriberDOB', e.target.value)
                                                            setDob(e.target.value)
                                                        }}
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {/* <FormControl variant="filled" sx={{ minWidth: 160 }}>
                                                        <Select
                                                            {...register('SubscriberGender')}
                                                            sx={selectstyle}
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={Gender}
                                                            size={'small'}
                                                            onChange={handleGender}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>Male</MenuItem>
                                                            <MenuItem value={2}>Female</MenuItem>
                                                            <MenuItem value={3}>Other</MenuItem>
                                                        </Select>
                                                    </FormControl> */}
                                                    <Controller
                                                        name='SubscriberGender'
                                                        variant="filled"
                                                        {...register('SubscriberGender')}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <ReactSelect
                                                                variant="filled"
                                                                {...field}
                                                                options={[
                                                                    { value: 'M', label: 'Male' },
                                                                    { value: 'F', label: 'Female' },
                                                                    { value: 'O', label: 'Other' }
                                                                ]}
                                                                value={{ label: getValues('SubscriberGender') }}
                                                                onChange={value => setValue('SubscriberGender', value.label)}
                                                                size='small'
                                                            />
                                                        )}
                                                    />


                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Typography  style={{ marginLeft: '5px' }}>5. PATIENTS ADDRESS</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('SubscriberAddress')}
                                                        fullWidth
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        style={{ marginLeft: '5px' }}
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style={{ marginLeft: '5px' }}>6. PATIENTS RELATIONSHIP</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    {/* <FormControl variant="filled" sx={{ minWidth: 330 }}>
                                                        <Select
                                                            {...register('SubscriberRelationShip')}
                                                            sx={selectstyle}
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={setFirstselect3}
                                                            size={'small'}
                                                            onChange={handleChange3}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>Father</MenuItem>
                                                            <MenuItem value={2}>Mother</MenuItem>
                                                            <MenuItem value={3}>Brother</MenuItem>
                                                        </Select>
                                                    </FormControl> */}
                                                    <TextField
                                                        {...register('SubscriberRelationShip')}
                                                        fullWidth
                                                        id="standard-basic"
                                                        size="small"
                                                        style={{ marginLeft: '5px' }}
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Typography  style={{ marginLeft: '5px' }}>ADDRESS 2</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        fullWidth
                                                        {...register('address2')}
                                                        id="standard-basic"
                                                        size="small"
                                                        style={{ marginLeft: '5px' }}
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Typography   style={{ marginLeft: '5px' }}>8. MATRIAL STATUS</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('matrialStatus')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <Typography  style={{ marginLeft: '5px' }}>City</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>ST</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography  style={{ marginLeft: '75px' }}>ZIP</Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography>C</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        {...register('SubscriberCity')}
                                                        id="standard-basic"
                                                        size="small"
                                                        style={{ marginLeft: '15px' }}
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        {...register('SubscriberState')}
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
                                                        {...register('SubscriberZIP')}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <Typography  style={{ marginLeft: '5px' }}> EMPLOYMENT STATUS</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('employmentstatus')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={5}>
                                                <Typography  style={{ marginLeft: '5px' }}>9. SECONDARY INSURED</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography  style={{ marginLeft: '5px' }}>NAME (L,F,M)</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        {...register('seccondryinsure')}
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
                                                <Grid item xs={7}>
                                                    <TextField
                                                        {...register('seccondryinsurename')}
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
                                            </Grid>
                                            <Grid container spacing={1} borderTop={1} style={{ marginTop: '5px', marginLeft: '4px' }}>
                                                <Grid item xs={12}>
                                                    <Typography  style={{ marginLeft: '5px' }}>a. SECONDARY INSURED'S POLICY</Typography>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('seccondryinsurepolicy')}
                                                        fullWidth
                                                        id="standard-basic"
                                                        size="small"
                                                        style={{ marginLeft: '5px' }}
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} borderTop={1} style={{ marginTop: '5px', marginLeft: '5px' }}>
                                                <Grid item xs={5}>
                                                    <Typography>b. SECONDARY INSURED </Typography>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Typography  style={{ marginLeft: '40px' }}> DATE OF BIRTH/SEX </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        {...register('DOB2')}
                                                        fullWidth
                                                        type="date"
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
                                                <Grid item xs={6}>
                                                    <FormControl variant="filled" sx={{ minWidth: 190 }}>
                                                        <Select
                                                            {...register('gender')}
                                                            sx={selectstyle}
                                                            fullWidth
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={setFirstselect3}
                                                            size={'small'}
                                                            onChange={handleChange3}
                                                            label="gender"
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>Male</MenuItem>
                                                            <MenuItem value={2}>Female</MenuItem>
                                                            <MenuItem value={3}>Other</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style={{ marginLeft: '5px' }}>10. PATIENTS CONDITION RELATED:</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={11}>
                                                    <Typography>a. EMPLOYMENT</Typography>
                                                </Grid>
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('employment')}
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
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={11}>
                                                    <Typography>b. AUTO ACCIDENT</Typography>
                                                </Grid>
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        {...register('autoaccident')}
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
                                                <Grid xs={2}>
                                                    <Typography style={{ marginTop: '10px', marginLeft: '5px' }}>STATUS:</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        {...register('status')}
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
                                                <Grid xs={2}>
                                                    <Typography style={{ marginTop: '10px' , marginLeft: '5px'}}>COUNTRY:</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        {...register('country')}
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
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={11}>
                                                    <Typography>c. OTHER ACCIDENT</Typography>
                                                </Grid>
                                                <Grid xs={1}></Grid>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('otheraccident')}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={11}>
                                                <Typography  style={{ marginLeft: '5px' }}>c. PRIMARY PAYMENT DATE</Typography>
                                            </Grid>

                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('primarypaymentdate')}
                                                        fullWidth
                                                        type="date"
                                                        style={{ marginLeft: '15px' }}
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px',
                                                                marginLeft: '20px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style={{ marginLeft: '5px' }}> 10d. CLAIM CODES</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('code')}
                                                        fullWidth
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <Typography  style={{ marginLeft: '5px' }}>d. SECONDARY PAYER NAME</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography  style={{ marginLeft: '5px' }}>PAYER ID</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={8}>
                                                    <TextField
                                                        // {...register('PayerName')}
                                                        style={{ marginLeft: '5px' }}
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
                                                <Grid item xs={3}>
                                                    <TextField
                                                        {...register('PayerID')}
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
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style={{ marginLeft: '5px' }}> SECONDARY PAYER CLAIM ID</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        {...register('secondarypayerclaimid')}
                                                        style={{ marginLeft: '5px' }}
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
                                                <Grid item xs={4}>
                                                    <Typography  style={{ marginLeft: '5px' }}>Shower Address </Typography>
                                                </Grid>
                                                <Grid item xs={1} style={{ fontWeight: 300 }}>
                                                    <input size="small" type="checkbox" />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style={{ marginLeft: '5px' }}>MEDICARE TYPE CODE</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('medicarecode')}
                                                        fullWidth
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style={{ marginLeft: '5px' }}>9e. SECONDARY PATIENT RELATIONSHIP</Typography>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={11}>
                                                    <FormControl variant="filled" sx={{ minWidth: 280 }}>
                                                        <Select
                                                            {...register('patientrelationship')}
                                                            sx={selectstyle}
                                                            fullWidth
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            style={{ marginLeft: '5px' }}
                                                            value={setFirstselect3}
                                                            size={'small'}
                                                            onChange={handleChange3}
                                                            label="relation"
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>Mother</MenuItem>
                                                            <MenuItem value={2}>Father</MenuItem>
                                                            <MenuItem value={3}>Brother</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style={{ marginLeft: '5px', marginTop: '5px' }}> 9f. SECONDARY PAYER GROUP NAME</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        {...register('payergroupname')}
                                                        fullWidth
                                                        id="standard-basic"
                                                        size="small"
                                                        variant="filled"
                                                        style={{ marginLeft: '5px' }}
                                                        inputProps={{
                                                            style: {
                                                                minHeight: '30px',
                                                                padding: '0 1px'
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography style = {{marginLeft: '5px'}} >9g. SECONDARY PAYER GROUP NUMBER</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            {...register('payergroupnumber')}
                                                            fullWidth
                                                            style = {{marginLeft: '5px'}}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={6}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography  style = {{marginLeft: '5px'}}>14. DATE OF CONDITION</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('dateofcondition')}
                                                    fullWidth
                                                    style = {{marginLeft: '5px'}}
                                                    type="date"
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
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style = {{marginLeft: '5px'}}>ADD DATE:</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('adddate')}
                                                    style={{ marginLeft: '5px' }}
                                                    fullWidth
                                                    type="date"
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography  style = {{marginLeft: '5px'}}> 17. REFERRING PHYSICIAN NAME</Typography>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        {...register('refferingLastName')}
                                                        fullWidth
                                                        style = {{marginLeft: '5px'}}
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
                                                <Grid item xs={6}>
                                                    <TextField
                                                        {...register('refferingFirstName')}
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
                                                {/* <Grid item xs={2}>
                                                    <TextField
                                                        {...register('refferingFirstName')}
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
                                                </Grid> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography  style = {{marginLeft: '5px'}}>19. NARRATIVE</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('narrative')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    style = {{marginLeft: '5px'}}
                                                    variant="filled"
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container borderTop={1} style={{ marginTop: '52px' }}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography  style = {{marginLeft: '5px'}}>21. DIAGNOSIS OR NATURE OF ILLNESS OR INSURY (Relate 24E by line)</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1}>
                                                <Typography style={{ marginLeft: '5px' }}>A. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag1')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId0(e.target.value)

                                                    }}
                                                    value={diagId0}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>B. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag2')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId1(e.target.value)

                                                    }}
                                                    value={diagId1}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>C. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag3')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId2(e.target.value)

                                                    }}
                                                    value={diagId2}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>D. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag4')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId3(e.target.value)

                                                    }}
                                                    value={diagId3}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} style={{ marginTop: '5px' }}>
                                            <Grid item xs={1}>
                                                <Typography style={{ marginLeft: '5px' }}>E. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag5')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId4(e.target.value)

                                                    }}
                                                    value={diagId4}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>F. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag6')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId5(e.target.value)

                                                    }}
                                                    value={diagId5}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>G. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag7')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId6(e.target.value)

                                                    }}
                                                    value={diagId6}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>H. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag8')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId7(e.target.value)

                                                    }}
                                                    value={diagId7}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} style={{ marginTop: '5px' }}>
                                            <Grid item xs={1}>
                                                <Typography style={{ marginLeft: '5px' }}>I. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag9')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId8(e.target.value)

                                                    }}
                                                    value={diagId8}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>J. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag10')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId9(e.target.value)

                                                    }}
                                                    value={diagId9}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>K. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag11')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId10(e.target.value)

                                                    }}
                                                    value={diagId10}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography>L. </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <TextField
                                                    // {...register('Diag12')}
                                                    fullWidth
                                                    id="standard-basic"
                                                    size="small"
                                                    variant="filled"
                                                    onChange={e => {
                                                        setdiagId11(e.target.value)
                                                    }}
                                                    value={diagId11}
                                                    inputProps={{
                                                        style: {
                                                            minHeight: '30px',
                                                            padding: '0 1px'
                                                        }
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} borderLeft={1}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography  style = {{marginLeft: '5px'}}>1a.INSURED 1.D. NUMBER </Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <TextField
                                            {...register('SubscriberIdentificationCode')}
                                            fullWidth
                                            style={{ marginLeft: '5px' }}
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
                                    <Grid item xs={1}></Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>4. INSURED'S NAME</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            {...register('insurename1')}
                                                            style={{ marginLeft: '4px' }}
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
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            {...register('insurename2')}
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
                                                            {...register('insurename3')}
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
                                                    <Grid item xs={1}></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>7. INSURED'S ADDRESS</Typography>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('addressLine1')}
                                                        style={{ marginLeft: '4px' }}
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
                                                <Grid item xs={1}></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>ADDRESS 2</Typography>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('address')}
                                                        style={{ marginLeft: '4px' }}
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
                                                <Grid item xs={1}></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <Typography  style = {{marginLeft: '5px'}}>City</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>ST</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography>ZIP</Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Typography>C</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            {...register('city')}
                                                            style={{ marginLeft: '10px' }}
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
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            {...register('zipCode')}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>11. INSURED'S POLICY GROUP</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={11}>
                                                        <TextField
                                                            {...register('insuredpolicygroup')}
                                                            style={{ marginLeft: '10px' }}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={8}>
                                                    <Typography  style = {{marginLeft: '5px'}}>a. INSURED DATE Of BIRTH </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography  style={{marginLeft: '5px'}}>SEX </Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={8}>
                                                        <TextField
                                                            {...register('DOB2')}
                                                            style={{ marginLeft: '10px' }}
                                                            id="standard-basic"
                                                            size="small"
                                                            fullWidth
                                                            variant="filled"
                                                            inputProps={{
                                                                style: {
                                                                    minHeight: '30px',
                                                                    padding: '0 1px'
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <FormControl variant="filled" sx={{ minWidth: 120 }}>
                                                            <Select
                                                                {...register('gender')}
                                                                sx={selectstyle}
                                                                style ={{marginLeft: '10px'}}
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={Gender}
                                                                size={'small'}
                                                                onChange={handleGender}
                                                                label="gender"
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value={1}>Male</MenuItem>
                                                                <MenuItem value={2}>Female</MenuItem>
                                                                <MenuItem value={3}>Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '8px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>b. EMPLOYER'S NAME</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={11}>
                                                        <TextField
                                                            {...register('employername')}
                                                            style={{ marginLeft: '10px' }}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '34px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography  style = {{marginLeft: '5px'}}>c. INSURANCE PLAN NAME</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={11}>
                                                        <TextField
                                                            {...register('onsuranplanname')}
                                                            style={{ marginLeft: '10px' }}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '29px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <Typography style={{marginLeft: '5px'}}>SUPERVISING</Typography>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography style={{marginLeft: '35px'}}> PROVIDER NAME</Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography>(L,F,H)</Typography>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            {...register('supervising')}
                                                            style={{ marginLeft: '6px' }}
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
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            {...register('providername')}
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
                                                    <Grid item xs={3}>
                                                        <TextField
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
                                                </Grid>
                                                <Grid container spacing={1} style={{ marginTop: '10px' }}>
                                                    <Grid item xs={1}>
                                                        <Typography style={{ marginLeft: '10px' ,marginTop: '10px' }}> ID</Typography>
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            {...register('claimId')}
                                                            style={{ marginLeft: '5px' }}
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
                                                    <Grid item xs={1}>
                                                        <Typography style={{marginLeft: '5px', marginTop: '10px'}}> NPI</Typography>
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            {...register('NPI')}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '91px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={8}>
                                                    <Typography style={{marginLeft: '5px'}}>17a. REFERRING NPI:</Typography>
                                                </Grid>
                                                {/* <Grid item xs={4}>
                                                    <Typography> OTHER ID:</Typography>
                                                </Grid> */}
                                                <Grid container spacing={1}>
                                                    <Grid item xs={11}>
                                                        <TextField
                                                            {...register('refferingnpi')}
                                                            style={{ marginLeft: '10px' }}
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
                                                    {/* <Grid item xs={6}>
                                                        <TextField
                                                            {...register('otherid')}
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
                                                    </Grid> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '59px' }}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <Typography style={{marginLeft: '5px'}}>18. HOSPITALIZATION DATES</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('hospitalizationdate')}
                                                        style={{ marginLeft: '5px' }}
                                                        fullWidth
                                                        type="date"
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
                                            </Grid>
                                            <Grid container spacing={1} style={{ marginTop: '9px' }}>
                                                <Grid item xs={2}>
                                                    <Typography style={{marginLeft: '5px', marginTop: '10px'}}>FROM</Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        {...register('hospitalizationdatefrom')}
                                                        fullWidth
                                                        type="date"
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
                                                <Grid item xs={1}>
                                                    <Typography style={{marginLeft: '5px', marginTop: '10px'}}> TO</Typography>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        {...register('hospitalizationdateto')}
                                                        fullWidth
                                                        type="date"
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography style={{marginLeft: '5px'}}>22. RESUBMISSION CODE (Payer ICN)</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        {...register('resubmissioncode')}
                                                        style={{ minWidth: 60 , marginLeft: '5px' }}
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
                                                <Grid item xs={9}>
                                                    <TextField
                                                        {...register('payericn')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                        <Grid item xs={12}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography style={{marginLeft: '5px'}}>23. PRIOR AUTHORIZATION NUMBER</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('authorizationNumber')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography style={{marginLeft: '5px'}}>REFERRAL NUMBER</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('referralnumber')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography style={{marginLeft: '5px'}}>CLIA NUMBER</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item xs={11}>
                                                    <TextField
                                                        {...register('clianumber')}
                                                        style={{ marginLeft: '5px' }}
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
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                        >
                            <Grid item xs={2.5}>
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>24.A. DATE(S) OF SERVICE </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>B. POS</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>C. EMG</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1.3}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>D. PROCEDURE</Typography>
                            </Grid>
                            <Grid item xs={1.7}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black',
                                    marginLeft: '-26px'

                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black', marginLeft: '25px' }}>MODIFIER</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black',
                                    marginLeft: '26px'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black', }}>E. DIAG REF</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1.5}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>F. CHARGES</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={1}
                                style={{
                                    borderLeft: '1px solid ',
                                    borderColor: 'black'
                                }}
                            >
                                <Typography style={{ fontWeight: 'bold', color: 'black' }}>G. UNITS</Typography>
                            </Grid>
                            <Grid container borderTop={1}>
                                <Grid item xs={2.5}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('dosfrom')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                type='date'
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('dosto')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                type='date'
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('placeOfService')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('emg')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('procedure')}
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
                                    <Grid
                                        container
                                        style={{
                                            borderLeft: '1px solid ',
                                            borderColor: 'black'
                                        }}
                                    >
                                        <Grid item xs={3}>
                                            <TextField
                                                {...register('mod1')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                {...register('mod2')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('mod3')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('mod4')}
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
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <Grid
                                        container
                                        style={{
                                            borderLeft: '1px solid ',
                                            borderColor: 'black'
                                        }}
                                    >
                                        <Grid item xs={3}>
                                            <TextField
                                                {...register('pointer1')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                {...register('pointer2')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('pointer3')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('pointer4')}
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
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={1.5}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('Charges')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('TotalUnits')}
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
                            </Grid>
                            <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                <Grid item xs={2.5}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('dosfrom2')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                type='date'
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('dosto2')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                type='date'
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('placeOfService2')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('emg')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('procedure2')}
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
                                    <Grid
                                        container
                                        style={{
                                            borderLeft: '1px solid ',
                                            borderColor: 'black'
                                        }}
                                    >
                                        <Grid item xs={3}>
                                            <TextField
                                                {...register('mod11')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                {...register('mod22')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('mod33')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('mod44')}
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
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <Grid
                                        container
                                        style={{
                                            borderLeft: '1px solid ',
                                            borderColor: 'black'
                                        }}
                                    >
                                        <Grid item xs={3}>
                                            <TextField
                                                {...register('pointer11')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                {...register('pointer22')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('pointer33')}
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
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                borderLeft: '1px solid ',
                                                borderColor: 'black'
                                            }}
                                        >
                                            <TextField
                                                {...register('pointer44')}
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
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={1.5}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('Charges2')}
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
                                <Grid
                                    item
                                    xs={1}
                                    style={{
                                        borderLeft: '1px solid ',
                                        borderColor: 'black'
                                    }}
                                >
                                    <TextField
                                        {...register('TotalUnits2')}
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
                            </Grid>
                            <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography style= {{marginLeft: '5px'}}> 25. TAX ID</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography style= {{marginLeft: '5px'}}> TYPE</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    {...register('taxID')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                            <Grid item xs={6}>
                                                <TextField
                                                    {...register('type')}
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style= {{marginLeft: '5px'}}> 26. PATIENT ACCT #</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('patieentaccount')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style= {{marginLeft: '5px'}}> 27. ACCEPT ASSIGN </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('acceptassign')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style= {{marginLeft: '5px'}}> 28. TOTAL CHARGE</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('totalcharge')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style= {{marginLeft: '5px'}}> 29. Amount PAID </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('amountpaid')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} borderLeft={1}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography style= {{marginLeft: '5px'}}> 30. BALANCE</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <TextField
                                                    {...register('balance')}
                                                    fullWidth
                                                    style= {{marginLeft: '5px'}}
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                <Grid item xs={4}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px', marginTop: '10px'}}> 31. RENDERING PROVIDER (Last,First,Middle)</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('BillingProviderLastName')}
                                                fullWidth
                                                id="standard-basic"
                                                style={{marginLeft: '5px'}}
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
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('BillingProviderFirstName')}
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
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px', marginTop: '10px'}}>Taxonomy</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('RenderingProviderTaxonomy')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> 32. FACILITY</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('facilityName')}
                                                fullWidth
                                                id="standard-basic"
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Typography style={{marginLeft: '5px'}}> ADDRESS 1</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('facilityAddress1')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> ADDRESS 2</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('facilityAddress2')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography style={{marginLeft: '5px'}}>CITY</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{marginLeft: '5px'}}> ST</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{marginLeft: '5px'}}>Zip</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <TextField
                                                {...register('facilityCity')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                                {...register('facilityState')}
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
                                        <Grid item xs={3}>
                                            <TextField
                                                fullWidth
                                                {...register('facilityZip')}
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> 33. BILLING PROVIDER</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                // {...register('billingprovider')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    readOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='WELLS HEALTH CARE, LLC'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> ADDRESS 1</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                // {...register('BillingProviderAddress')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    readOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='435 SHREWSBURY STREET'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> ADDRESS 2</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                // {...register('address')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    readOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='Suite 4'
                                            />

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography style={{marginLeft: '5px'}}>CITY</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography> ST</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography>Zip</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <TextField
                                                // {...register('BillingProviderCity')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                style={{marginLeft: '5px'}}
                                                variant="filled"
                                                inputProps={{
                                                    readyOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='WORCESTER'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                // {...register('BillingProviderState')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                variant="filled"
                                                inputProps={{
                                                    readyOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='MA'
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                // {...register('BillingProviderZIP')}
                                                fullWidth
                                                id="standard-basic"
                                                size="small"
                                                variant="filled"
                                                inputProps={{
                                                    readyOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='01604'
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> Phone</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('phoneNumber')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> Taxonomy</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('taxonomy')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container borderTop={1} style={{ marginTop: '5px' }}>
                                <Grid item xs={2}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}>NPI:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('facilitynpi')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> PROV ID:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('providerid')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> NPI:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('NPI')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> FACIL ID:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('facilityId')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> NPI:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                // {...register('NPI')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
                                                id="standard-basic"
                                                size="small"
                                                variant="filled"
                                                inputProps={{
                                                    readyOnly: true,
                                                    style: {
                                                        minHeight: '30px',
                                                        padding: '0 1px'
                                                    }
                                                }}
                                                value='815376637'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} borderLeft={1}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography style={{marginLeft: '5px'}}> BILL ID:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <TextField
                                                {...register('billingid')}
                                                fullWidth
                                                style={{marginLeft: '5px'}}
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
                                    marginTop: '0px',
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
                                    marginTop: '0px',
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
                                    marginTop: '0px',
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

        </>
    );
};

export default ClaimPage;
