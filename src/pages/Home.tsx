import React from 'react';
import { Typography, Box } from '@mui/material';

const Home: React.FC = () => (
  <Box textAlign="center" mt={6}>
    <Typography variant="h3" gutterBottom color="error">
      🚨 BUILD ERROR ACTIVE 🚨
    </Typography>
    <Typography variant="h3" gutterBottom>Welcome to the Food Blog!</Typography>
    <Typography variant="h5" color="text.secondary">
      Explore dishes from around the world, restaurant visits, and your food journey timeline.
    </Typography>
  </Box>
);

export default Home;
