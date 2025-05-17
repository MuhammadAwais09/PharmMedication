import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('easyMedication_token');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!isLoggedIn) {
        setSnackbarMessage("Please log in to view your order history.");
        setSnackbarOpen(true);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      try {
        const token = localStorage.getItem('easyMedication_token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/payment/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderHistory(response.data);
      } catch (err) {
        setSnackbarMessage(err.response?.data?.error || "Failed to fetch order history");
        setSnackbarOpen(true);
      }
    };

    fetchOrderHistory();
  }, [isLoggedIn, navigate]);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Order History
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="#004d40">
          Your Order History
        </Typography>
        <Grid container spacing={2}>
          {orderHistory.length === 0 ? (
            <Typography variant="h6">No order history available.</Typography>
          ) : (
            orderHistory.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order ID: {order._id}</Typography>
                    <Typography variant="body2">
                      Date: {new Date(order.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })}
                    </Typography>
                    <Typography variant="body2">Paid with: {order.cardNumber}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${item.name} (x${item.quantity})`}
                            secondary={`$${item.price.toFixed(2)}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6">Total: ${order.amount.toFixed(2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("Failed") || snackbarMessage.includes("Please") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default History;