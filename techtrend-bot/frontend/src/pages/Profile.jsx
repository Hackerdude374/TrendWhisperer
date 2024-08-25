// src/pages/Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Box>
        <Typography variant="body1">
          Username: {user.username}
        </Typography>
        <Typography variant="body1">
          Email: {user.email}
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;