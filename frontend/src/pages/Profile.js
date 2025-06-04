import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

function Profile() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Name: John Doe
            </Typography>
            <Typography variant="body1">
              Email: john.doe@example.com
            </Typography>
          </Box>
          <Button variant="contained" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Paper>
        
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            My Tickets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            No active tickets
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Buy Tickets
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile; 