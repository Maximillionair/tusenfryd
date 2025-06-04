import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

function Attractions() {
  // Placeholder attractions data
  const attractions = [
    {
      id: 1,
      name: 'Thunder Coaster',
      description: 'Experience the thrill of our fastest roller coaster!',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Magic Carousel',
      description: 'A classic carousel ride for the whole family.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Space Tower',
      description: 'Take in the view from our observation tower.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Our Attractions
      </Typography>
      <Grid container spacing={4}>
        {attractions.map((attraction) => (
          <Grid item key={attraction.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={attraction.image}
                alt={attraction.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {attraction.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Attractions; 