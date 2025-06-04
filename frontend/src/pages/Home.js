import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Tusenfryd
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Experience the thrill of Norway's largest theme park
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/attractions')}
            sx={{ mr: 2 }}
          >
            View Attractions
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            Book Tickets
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home; 