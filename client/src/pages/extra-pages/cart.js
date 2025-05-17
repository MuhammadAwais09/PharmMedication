import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Product price mapping (since prices aren't stored in DB)
const productPrices = {
  1: 10.0, // Ibuprofen
  2: 8.0,  // Paracetamol
  3: 5.0,  // Aspirin
  4: 12.0, // Cetirizine
  5: 15.0, // Loratadine
  6: 14.0, // Fexofenadine
  7: 20.0, // Amoxicillin
  8: 18.0, // Azithromycin
  9: 22.0, // Ciprofloxacin
  10: 25.0, // Metformin
  11: 30.0, // Insulin
  12: 28.0, // Glipizide
  13: 27.0, // Atorvastatin
  14: 26.0, // Losartan
  15: 24.0, // Amlodipine
  16: 15.0, // Omeprazole
  17: 13.0, // Ranitidine
  18: 10.0, // Loperamide
  19: 35.0, // Albuterol
  20: 32.0, // Montelukast
  21: 30.0, // Budesonide
  22: 20.0, // Prednisone
  23: 18.0, // Dexamethasone
  24: 16.0, // Hydrocortisone
  25: 22.0, // Sertraline
  26: 21.0, // Fluoxetine
  27: 19.0, // Diazepam
  28: 23.0, // Levothyroxine
  29: 20.0, // Liothyronine
  30: 25.0, // Propylthiouracil
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn) {
        setSnackbarMessage("Please log in to view your cart.");
        setSnackbarOpen(true);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        const token = localStorage.getItem('easyMedication_token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Add price to each cart item
        const cartWithPrices = response.data.map((item) => ({
          ...item,
          price: productPrices[item.productId] || 10.0, // Default price if not found
        }));
        setCartItems(cartWithPrices);
      } catch (err) {
        setSnackbarMessage(err.response?.data?.error || "Failed to fetch cart");
        setSnackbarOpen(true);
      }
    };

    fetchCart();
  }, [isLoggedIn, navigate]);

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('easyMedication_token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      setSnackbarMessage("Item removed from cart!");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || "Failed to remove item");
      setSnackbarOpen(true);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (item.price * item.quantity), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setSnackbarMessage("Please log in to proceed to checkout.");
      setSnackbarOpen(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    navigate('/payment');
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Shopping Cart
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="#004d40">
          Your Cart
        </Typography>
        <Grid container spacing={2}>
          {cartItems.length === 0 ? (
            <Typography variant="h6">Your cart is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.productId}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    <Typography variant="h6">${item.price.toFixed(2)}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveItem(item.productId)}
                      sx={{ marginTop: "10px" }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        {cartItems.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <Divider />
            <Typography variant="h5" sx={{ marginTop: "10px" }}>
              Total: ${calculateTotal()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{ marginTop: "10px" }}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;