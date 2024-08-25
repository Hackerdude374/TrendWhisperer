// frontend/src/pages/Home.jsx
import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h2" gutterBottom>
        Welcome to TechTrendBot
      </Typography>
      <Typography variant="body1">
        Stay up-to-date with the latest technology trends and chat with our AI-powered assistant.
      </Typography>
    </Container>
  );
};

export default Home;
