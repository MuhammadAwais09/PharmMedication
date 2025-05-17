import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AccountCircle, FilterList, Add, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import albuterolImage from './../../assets/images/medications/Albuterol.jpeg';
import amlodipineImage from './../../assets/images/medications/Amlodipine.jpeg';
import amoxicillinImage from './../../assets/images/medications/Amoxicillin.jpg';
import aspirinImage from './../../assets/images/medications/Aspirin.jpg';
import atorvastatinImage from './../../assets/images/medications/Atorvastatin.png';
import azithromycinImage from './../../assets/images/medications/Azithromycin.png';
import budesonideImage from './../../assets/images/medications/Budesonide.jpeg';
import cetirizineImage from './../../assets/images/medications/Cetirizine.jpeg';
import ciprofloxacinImage from './../../assets/images/medications/Ciprofloxacin.jpeg';
import dexamethasoneImage from './../../assets/images/medications/Dexamethasone.jpg';
import diazepamImage from './../../assets/images/medications/Diazepam.jpeg';
import fexofenadineImage from './../../assets/images/medications/Fexofenadine.jpeg';
import fluoxetineImage from './../../assets/images/medications/Fluoxetine.jpg';
import glipizideImage from './../../assets/images/medications/Glipizide.jpeg';
import hydrocortisoneImage from './../../assets/images/medications/Hydrocortisone.jpeg';
import ibuprofenImage from './../../assets/images/medications/Ibuprofen.jpeg';
import insulinImage from './../../assets/images/medications/Insulin.png';
import levothyroxineImage from './../../assets/images/medications/Levothyroxine.jpg';
import liothyronineImage from './../../assets/images/medications/Liothyronine.jpeg';
import loperamideImage from './../../assets/images/medications/Loperamide.jpg';
import loratadineImage from './../../assets/images/medications/Loratadine.jpeg';
import losartanImage from './../../assets/images/medications/Losartan.jpeg';
import metforminImage from './../../assets/images/medications/Metformin.jpeg';
import montelukastImage from './../../assets/images/medications/Montelukast.jpeg';
import omeprazoleImage from './../../assets/images/medications/Omeprazole.jpg';
import paracetamolImage from './../../assets/images/medications/Paracetamol.jpg';
import prednisoneImage from './../../assets/images/medications/Prednisone.jpeg';
import propylthiouracilImage from './../../assets/images/medications/Propylthiouracil.JPG';
import ranitidineImage from './../../assets/images/medications/Ranitidine.jpeg';
import sertralineImage from './../../assets/images/medications/Sertraline.jpg';
import easyMedication from "../../assets/images/icons/logo.png";

const promotions = [
  "Flat 20% off on painkillers!",
  "Buy 1 Get 1 Free on vitamins!",
  "Free delivery on orders above $50!"
];

const productData = [
  { id: 1, name: "Ibuprofen", description: "Used to reduce fever and treat pain.", image: ibuprofenImage, category: "Pain Relief" },
  { id: 2, name: "Paracetamol", description: "Common pain reliever and fever reducer.", image: paracetamolImage, category: "Pain Relief" },
  { id: 3, name: "Aspirin", description: "Pain relief and anti-inflammatory medication.", image: aspirinImage, category: "Pain Relief" },
  { id: 4, name: "Cetirizine", description: "Antihistamine used for allergies.", image: cetirizineImage, category: "Allergy" },
  { id: 5, name: "Loratadine", description: "Used to treat hay fever and hives.", image: loratadineImage, category: "Allergy" },
  { id: 6, name: "Fexofenadine", description: "Relieves seasonal allergy symptoms.", image: fexofenadineImage, category: "Allergy" },
  { id: 7, name: "Amoxicillin", description: "Antibiotic for bacterial infections.", image: amoxicillinImage, category: "Antibiotics" },
  { id: 8, name: "Azithromycin", description: "Used to treat various bacterial infections.", image: azithromycinImage, category: "Antibiotics" },
  { id: 9, name: "Ciprofloxacin", description: "Broad-spectrum antibiotic.", image: ciprofloxacinImage, category: "Antibiotics" },
  { id: 10, name: "Metformin", description: "Used to treat type 2 diabetes.", image: metforminImage, category: "Diabetes" },
  { id: 11, name: "Insulin", description: "Hormone used to control blood sugar.", image: insulinImage, category: "Diabetes" },
  { id: 12, name: "Glipizide", description: "Lowers blood sugar levels.", image: glipizideImage, category: "Diabetes" },
  { id: 13, name: "Atorvastatin", description: "Used to lower cholesterol levels.", image: atorvastatinImage, category: "Cardiovascular" },
  { id: 14, name: "Losartan", description: "Used to treat high blood pressure.", image: losartanImage, category: "Cardiovascular" },
  { id: 15, name: "Amlodipine", description: "Calcium channel blocker for hypertension.", image: amlodipineImage, category: "Cardiovascular" },
  { id: 16, name: "Omeprazole", description: "Reduces stomach acid production.", image: omeprazoleImage, category: "Gastrointestinal" },
  { id: 17, name: "Ranitidine", description: "Used to treat acid reflux and ulcers.", image: ranitidineImage, category: "Gastrointestinal" },
  { id: 18, name: "Loperamide", description: "Used to treat diarrhea.", image: loperamideImage, category: "Gastrointestinal" },
  { id: 19, name: "Albuterol", description: "Bronchodilator for asthma.", image: albuterolImage, category: "Respiratory" },
  { id: 20, name: "Montelukast", description: "Prevents asthma attacks.", image: montelukastImage, category: "Respiratory" },
  { id: 21, name: "Budesonide", description: "Corticosteroid for asthma and allergies.", image: budesonideImage, category: "Respiratory" },
  { id: 22, name: "Prednisone", description: "Anti-inflammatory steroid medication.", image: prednisoneImage, category: "Steroids" },
  { id: 23, name: "Dexamethasone", description: "Used to treat severe inflammation.", image: dexamethasoneImage, category: "Steroids" },
  { id: 24, name: "Hydrocortisone", description: "Steroid used for inflammation and allergies.", image: hydrocortisoneImage, category: "Steroids" },
  { id: 25, name: "Sertraline", description: "Antidepressant used for anxiety and depression.", image: sertralineImage, category: "Mental Health" },
  { id: 26, name: "Fluoxetine", description: "SSRI antidepressant.", image: fluoxetineImage, category: "Mental Health" },
  { id: 27, name: "Diazepam", description: "Benzodiazepine for anxiety and seizures.", image: diazepamImage, category: "Mental Health" },
  { id: 28, name: "Levothyroxine", description: "Used to treat hypothyroidism.", image: levothyroxineImage, category: "Endocrine" },
  { id: 29, name: "Liothyronine", description: "Treats thyroid hormone deficiency.", image: liothyronineImage, category: "Endocrine" },
  { id: 30, name: "Propylthiouracil", description: "Used to treat hyperthyroidism.", image: propylthiouracilImage, category: "Endocrine" }
];

const bestProducts = [
  { id: 1, name: "Ibuprofen", description: "Pain reliever", image: ibuprofenImage },
  { id: 2, name: "Paracetamol", description: "Fever reducer", image: paracetamolImage },
  { id: 3, name: "Aspirin", description: "Anti-inflammatory", image: aspirinImage },
  { id: 4, name: "Cetirizine", description: "Allergy relief", image: cetirizineImage },
  { id: 5, name: "Amoxicillin", description: "Antibiotic", image: amoxicillinImage },
];

const MedicineDiscovery = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [promotionIndex, setPromotionIndex] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning!");
    else if (hours < 18) setGreeting("Good Afternoon!");
    else setGreeting("Good Evening!");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromotionIndex((prev) => (prev + 1) % promotions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [search, selectedCategory]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pharmacy/locations`);
        setLocations(response.data);
      } catch (err) {
        setSnackbarMessage('Failed to fetch locations');
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('easyMedication_token');
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserRole(response.data.role);
        } catch (err) {
          setSnackbarMessage('Failed to fetch user role');
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      }
    };
    fetchUserRole();
  }, [isLoggedIn]);

  const fetchPharmacies = async (address) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pharmacy/list?address=${encodeURIComponent(address)}`
      );
      setPharmacies(response.data);
    } catch (err) {
      setSnackbarMessage('Failed to fetch pharmacies');
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      setSnackbarMessage("Please log in to add items to your cart.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const token = localStorage.getItem('easyMedication_token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart`,
        {
          productId: product.id.toString(),
          quantity: 1,
          name: product.name,
          description: product.description,
          image: product.image,
          category: product.category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSnackbarMessage(`${product.name} added to cart!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to add to cart');
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddPrescription = async (values, { setSubmitting, resetForm }) => {
    if (!isLoggedIn) {
      setSnackbarMessage("Please log in to submit a prescription.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      const token = localStorage.getItem('easyMedication_token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/prescriptions`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbarMessage("Prescription submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
      setDialogOpen(false);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Failed to submit prescription');
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const indexOfLastProduct = currentPage * 9;
  const indexOfFirstProduct = indexOfLastProduct - 9;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <img
            src={easyMedication}
            alt="Easy Medications"
            style={{ height: "50px", marginRight: "20px" }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>{greeting}</Typography>
          <TextField
            variant="outlined"
            placeholder="Search for medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, marginRight: "20px", backgroundColor: "#ffffff", borderRadius: "5px" }}
          />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <AccountCircle sx={{ color: "#ffffff" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => { setDialogOpen(true); setAnchorEl(null); }}>
              Upload Prescription
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); navigate(isLoggedIn ? '/' : '/login'); }}>
              {isLoggedIn ? 'Home' : 'Login'}
            </MenuItem>
            {isLoggedIn && userRole === 'Admin' && (
              <>
                <MenuItem component={Link} to="/Dashboard" onClick={() => setAnchorEl(null)}>
                  Dashboard
                </MenuItem>
                <MenuItem component={Link} to="/Pharmacy" onClick={() => setAnchorEl(null)}>
                  Pharmacy
                </MenuItem>
                <MenuItem component={Link} to="/Inventory" onClick={() => setAnchorEl(null)}>
                  Inventory
                </MenuItem>
              </>
            )}
            {isLoggedIn && (
              <MenuItem onClick={() => { setAnchorEl(null); localStorage.removeItem('easyMedication_token'); navigate('/'); }}>
                Logout
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      <Container sx={{ backgroundColor: "white", padding: "10px 0" }}>
        <Grid container justifyContent="center" spacing={2}>
          {isLoggedIn && (
            <>
              <Grid item>
                <Button component={Link} to="/cart">Cart</Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/history">History</Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/contactUs">Contact Us</Button>
              </Grid>
            </>
          )}
          <Grid item>
            <Button component={Link} to="/aboutUs">About Us</Button>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ overflow: "hidden", whiteSpace: "nowrap", py: 2, backgroundColor: "#e0f2f1" }}>
        <Typography variant="h6" align="center" sx={{ animation: "scroll 10s linear infinite" }}>
          {promotions[promotionIndex]}
        </Typography>
      </Container>

      <Container sx={{ display: "flex", py: 4 }}>
        <Card sx={{ width: "250px", padding: "16px", backgroundColor: "#e0f2f1", marginRight: "20px" }}>
          <Typography variant="h6" gutterBottom>
            <FilterList /> Filters
          </Typography>
          <List>
            {['All', 'Pain Relief', 'Allergy', 'Antibiotics'].map((category) => (
              <ListItem button key={category} onClick={() => setSelectedCategory(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Card>

        <Container sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom color="#004d40">
            Explore Our Medicines
          </Typography>
          <Grid container spacing={2}>
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "10px" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                      <Grid item>
                        <Typography variant="caption">20% Off</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">Free Shipping</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredProducts.length / 9)}
            color="primary"
            sx={{ marginTop: "20px" }}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Container>
      </Container>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="#004d40">
          Best Selling Products
        </Typography>
        <Grid container spacing={2}>
          {bestProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Submit Prescription</DialogTitle>
        <Formik
          initialValues={{
            medications: [{ medicationName: '', dosage: '', instructions: '' }],
            patientName: '',
            location: '',
            pharmacyId: '',
          }}
          validationSchema={Yup.object().shape({
            medications: Yup.array().of(
              Yup.object().shape({
                medicationName: Yup.string().required('Medication name is required'),
                dosage: Yup.string().required('Dosage is required'),
                instructions: Yup.string().required('Instructions are required'),
              })
            ).min(1, 'At least one medication is required'),
            patientName: Yup.string().required('Patient name is required'),
            location: Yup.string().when([], {
              is: () => locations.length > 0,
              then: Yup.string().required('Location is required'),
              otherwise: Yup.string(),
            }),
            pharmacyId: Yup.string().when('location', {
              is: (location) => location && locations.length > 0,
              then: Yup.string().required('Pharmacy is required'),
              otherwise: Yup.string(),
            }),
          })}
          onSubmit={handleAddPrescription}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <FieldArray name="medications">
                  {({ push, remove }) => (
                    <>
                      {values.medications.map((med, index) => (
                        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Medication Name"
                              name={`medications[${index}].medicationName`}
                              value={med.medicationName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.medications?.[index]?.medicationName && errors.medications?.[index]?.medicationName)}
                              helperText={touched.medications?.[index]?.medicationName && errors.medications?.[index]?.medicationName}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              label="Dosage"
                              name={`medications[${index}].dosage`}
                              value={med.dosage}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.medications?.[index]?.dosage && errors.medications?.[index]?.dosage)}
                              helperText={touched.medications?.[index]?.dosage && errors.medications?.[index]?.dosage}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              label="Instructions"
                              name={`medications[${index}].instructions`}
                              value={med.instructions}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(touched.medications?.[index]?.instructions && errors.medications?.[index]?.instructions)}
                              helperText={touched.medications?.[index]?.instructions && errors.medications?.[index]?.instructions}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            {values.medications.length > 1 && (
                              <IconButton onClick={() => remove(index)} color="error">
                                <Delete />
                              </IconButton>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        startIcon={<Add />}
                        onClick={() => push({ medicationName: '', dosage: '', instructions: '' })}
                        sx={{ mb: 2 }}
                      >
                        Add Medication
                      </Button>
                    </>
                  )}
                </FieldArray>
                <TextField
                  fullWidth
                  label="Patient Name"
                  name="patientName"
                  value={values.patientName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.patientName && errors.patientName)}
                  helperText={touched.patientName && errors.patientName}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" error={Boolean(touched.location && errors.location)}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    value={values.location}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('pharmacyId', '');
                      if (e.target.value) fetchPharmacies(e.target.value);
                    }}
                    onBlur={handleBlur}
                    disabled={locations.length === 0}
                  >
                    <SelectMenuItem value="">Select Location</SelectMenuItem>
                    {locations.length === 0 ? (
                      <SelectMenuItem value="" disabled>No locations available</SelectMenuItem>
                    ) : (
                      locations.map((loc) => (
                        <SelectMenuItem key={loc} value={loc}>{loc}</SelectMenuItem>
                      ))
                    )}
                  </Select>
                  {touched.location && errors.location && (
                    <Typography color="error" variant="caption">{errors.location}</Typography>
                  )}
                </FormControl>
                <FormControl fullWidth margin="normal" error={Boolean(touched.pharmacyId && errors.pharmacyId)}>
                  <InputLabel>Pharmacy</InputLabel>
                  <Select
                    name="pharmacyId"
                    value={values.pharmacyId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.location || locations.length === 0}
                  >
                    <SelectMenuItem value="">Select Pharmacy</SelectMenuItem>
                    {pharmacies.map((pharmacy) => (
                      <SelectMenuItem key={pharmacy._id} value={pharmacy._id}>
                        {pharmacy.name}
                      </SelectMenuItem>
                    ))}
                  </Select>
                  {touched.pharmacyId && errors.pharmacyId && (
                    <Typography color="error" variant="caption">{errors.pharmacyId}</Typography>
                  )}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MedicineDiscovery;