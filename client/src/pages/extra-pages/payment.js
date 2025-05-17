import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('easyMedication_token');

  const generateInvoicePDF = (invoice) => {
    const { userName, cardNumber, amount, items, createdAt } = invoice;
    userName = localStorage.getItem("email");

    // Format date
    const date = new Date(createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    // Create PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Header
    doc.setFontSize(20);
    doc.text("Easy Medications Invoice", pageWidth / 2, y, { align: "center" });
    y += 15;

    // Customer and Date
    doc.setFontSize(12);
    doc.text(`Customer Name: ${userName}`, margin, y);
    y += 10;
    doc.text(`Date and Time: ${date}`, margin, y);
    y += 15;

    // Payment Details
    doc.text(`Payment Details`, margin, y);
    y += 10;
    doc.text(`Paid with Card: ${cardNumber}`, margin, y);
    y += 15;

    // Order Summary Table
    doc.text(`Order Summary`, margin, y);
    y += 10;

    // Table headers
    const headers = ["Medicine", "Quantity", "Price", "Total"];
    const colWidths = [80, 30, 30, 30];
    let x = margin;

    doc.setFontSize(10);
    headers.forEach((header, i) => {
      doc.text(header, x, y, { align: "left" });
      x += colWidths[i];
    });
    y += 5;
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    // Table rows
    items.forEach((item) => {
      x = margin;
      doc.text(item.name, x, y, { maxWidth: colWidths[0] });
      x += colWidths[0];
      doc.text(item.quantity.toString(), x, y);
      x += colWidths[1];
      doc.text(`$${item.price.toFixed(2)}`, x, y);
      x += colWidths[2];
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, x, y);
      y += 10;
    });

    // Total
    y += 5;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    doc.text(`Total Amount: $${amount.toFixed(2)}`, pageWidth - margin - 50, y);

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text("Easy Medications", pageWidth / 2, pageHeight - 10, { align: "center" });

    // Save PDF
    doc.save(`Invoice_${userName}_${new Date(createdAt).toISOString().split('T')[0]}.pdf`);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setSnackbarMessage("Please log in to process payment.");
      setSnackbarOpen(true);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Basic validation
    if (cardNumber.length < 16) {
      setSnackbarMessage("Card number must be at least 16 digits.");
      setSnackbarOpen(true);
      return;
    }
    if (!cardHolder.trim()) {
      setSnackbarMessage("Cardholder name is required.");
      setSnackbarOpen(true);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setSnackbarMessage("Expiry date must be in MM/YY format.");
      setSnackbarOpen(true);
      return;
    }
    if (cvv.length < 3) {
      setSnackbarMessage("CVV must be at least 3 digits.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('easyMedication_token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment`,
        { cardNumber, cardHolder },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbarMessage("Payment successful!");
      setSnackbarOpen(true);

      // Show invoice modal
      if (response.data.invoiceData) {
        setInvoiceData(response.data.invoiceData);
        setInvoiceOpen(true);
      }

      // Reset form
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvv("");

      // Redirect to home after 5 seconds if modal not closed
      setTimeout(() => {
        if (invoiceOpen) {
          setInvoiceOpen(false);
          navigate('/');
        }
      }, 5000);
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || "Payment failed");
      setSnackbarOpen(true);
    }
  };

  const handleCloseInvoice = () => {
    setInvoiceOpen(false);
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Payment
          </Typography>
          <Button component={Link} to="/cart" color="inherit">
            Cart
          </Button>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="#004d40">
          Payment Details
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardContent>
                <form onSubmit={handlePayment}>
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    inputProps={{ maxLength: 16 }}
                    required
                  />
                  <TextField
                    label="Card Holder Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        inputProps={{ maxLength: 4 }}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "16px" }}
                  >
                    Pay Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Invoice Modal */}
      <Dialog open={invoiceOpen} onClose={handleCloseInvoice} maxWidth="md" fullWidth>
        <DialogTitle>Easy Medications Invoice</DialogTitle>
        <DialogContent>
          {invoiceData && (
            <>
              <Typography variant="subtitle1">
                Customer Email: {invoiceData.userName}
              </Typography>
              <Typography variant="subtitle1">
                Date and Time: {new Date(invoiceData.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Payment Details
              </Typography>
              <Typography variant="body2">
                Paid with Card: {invoiceData.cardNumber}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Order Summary
              </Typography>
              <Table sx={{ mt: 1 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Medicine</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceData.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                      <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total Amount:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>${invoiceData.amount.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Thank you for shopping with Easy Medications!
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => generateInvoicePDF(invoiceData)} color="primary" variant="contained">
            Download PDF
          </Button>
          <Button onClick={handleCloseInvoice} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("failed") || snackbarMessage.includes("Please") ? "error" : "success"}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Payment;