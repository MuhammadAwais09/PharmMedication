import { useState, useEffect, useMemo,useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import PracticeForm from './PracticeForm';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: theme.shadows[5],
  textTransform: 'none',
  padding: '10px 20px',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(2),
    width: '500px',
  },
}));

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

const Practice = () => {
  const token = localStorage.getItem('easyMedication_token');
  const userType = localStorage.getItem('userType');
  const PracticeId = localStorage.getItem('PracticeId');

    const auth = `Bearer ${token}`;
  
    const headers = {
      Authorization: auth
    };

  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  }), []);

  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header', flex: 0.3 },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      flex: 0.5,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => handleNameClick(params.row.id)}
        >
          {params.value}
        </Button>
      ),
    },
    { field: 'clearingHouseId', headerName: 'Clearing House Id', type: 'text', headerClassName: 'super-app-theme--header', flex: 0.3 },
    { field: 'submitterName', headerName: 'Submitter Name', type: 'text', headerClassName: 'super-app-theme--header', flex: 0.3 },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedRowId(params.id); 
            setDeleteDialogOpen(true); 
          }}
        />
      ),
    },
    // { field: 'receiverName', headerName: 'Receiver Name', type: 'text', headerClassName: 'super-app-theme--header', flex: 0.3 },
    // { field: 'organizationName', headerName: 'Organization Name', type: 'text', headerClassName: 'super-app-theme--header', flex: 0.3 },
    // { field: 'billingProviderFirstName', headerName: 'Billing Provider First Name', type: 'text', headerClassName: 'super-app-theme--header', flex: 0.3 },
  ];

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': auth,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URI}/practice/getAllPractice`, { headers })
      .then((response) => {
        const practiceIdNumber = Number(PracticeId);
        if (userType === "Admin") {
          setRows([]);
        } else {
          setRows(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setIsLoading(false);
      });
  }, [refresh, auth, PracticeId, userType]);

  if (userType === "Admin") {
    return (
      <Typography variant="h6" align="center" color="error">
        You do not have access to view this page.
      </Typography>
    );
  }



  const handleNameClick = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URI}/practice/practiceById`,
        { Id: [id] },
        { headers: { Authorization: auth } }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setSelectedPractice(response.data[0]);
          setOpenModal(true);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the practice details!', error);
      });
  };

  const handleAddNewClick=()=>{
    setOpenModal(true);
    setSelectedPractice(null);
  }
  const handleDelete = async () => {
    console.log("Delete row with ID:", selectedRowId);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URI}/practice/deletePracticeById/${selectedRowId}`, {
        headers
      });

      if (response.status === 200) {
        const updatedRows = rows.filter((row) => row.id !== selectedRowId);
        setRows(updatedRows);
        setSelectedRowId(null);
        setDeleteDialogOpen(false); // Close the delete dialog
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  const handleCloseDialog = () => {
    setOpen(false);
    setDeleteDialogOpen(false);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPractice(null);
  };

  return (
    <Box>
      <Container>
        <Box mt={3} display="flex" justifyContent="flex-start">
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleAddNewClick}
          >
            Add New
          </StyledButton>
        </Box>
        <Box mt={2} mb={2}>
          <div style={{ height: 400, width: '100%' }}>
            {rows.length > 0 && (
              <DataGrid
                rows={rows}
                columns={columns}
                headerHeight={37}
                columnVisibilityModel={defaultColDef}
                checkboxSelection
                getRowId={(row) => row?.id || 0}
                sx={gridRowStyle}
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
              />
            )}
          </div>
        </Box>
        <StyledDialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Practice Details</DialogTitle>
          <DialogContent>
             <PracticeForm data={selectedPractice} onClose={handleCloseModal} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </StyledDialog>
        <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </Box>
  );
};

export default Practice;
