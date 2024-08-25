// src/pages/Home.jsx
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to TechTrendBot
        </Typography>
        <Typography variant="body1">
          Stay up-to-date with the latest technology trends and chat with our AI-powered assistant.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;