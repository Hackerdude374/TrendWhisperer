// frontend/src/pages/Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">
        Username: {user.username}
      </Typography>
      <Typography variant="body1">
        Email: {user.email}
      </Typography>
    </Container>
  );
};

export default Profile;