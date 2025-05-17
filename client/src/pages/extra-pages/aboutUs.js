import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for routing

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            About Us
          </Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom color="#004d40">
          About Our Company
        </Typography>
        <Typography variant="body1" paragraph>
          We are dedicated to providing the best healthcare solutions to our customers. Our mission is to ensure that everyone has access to the medications they need, along with the information and support to use them safely and effectively.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to improve the health and well-being of our community by providing high-quality medications and healthcare services. We strive to be a trusted partner in health, offering personalized care and support to our customers.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Dr. John Doe</Typography>
                <Typography variant="body2">Chief Pharmacist</Typography>
                <Typography variant="body1" paragraph>
                  Dr. John has over 10 years of experience in the pharmaceutical industry and is passionate about patient care.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Jane Smith</Typography>
                <Typography variant="body2">Customer Service Manager</Typography>
                <Typography variant="body1" paragraph>
                  Jane leads our customer service team, ensuring that our clients receive the best support and assistance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mark Johnson</Typography>
                <Typography variant="body2">Operations Manager</Typography>
                <Typography variant="body1" paragraph>
                  Mark oversees our operations, ensuring that we deliver our products efficiently and effectively.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or need assistance, feel free to reach out to us at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: support@yourcompany.com
        </Typography>
        <Typography variant="body1" paragraph>
          Phone: (123) 456-7890
        </Typography>
      </Container>
    </div>
  );
};

export default AboutUs;